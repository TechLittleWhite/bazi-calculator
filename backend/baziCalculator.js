import { Solar } from 'lunar-javascript'

// 天干
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// 地支
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 五行对应
const WUXING_MAP = {
  '甲': 'wood', '乙': 'wood',
  '丙': 'fire', '丁': 'fire',
  '戊': 'earth', '己': 'earth',
  '庚': 'metal', '辛': 'metal',
  '壬': 'water', '癸': 'water',
  '子': 'water', '丑': 'earth', '寅': 'wood', '卯': 'wood',
  '辰': 'earth', '巳': 'fire', '午': 'fire', '未': 'earth',
  '申': 'metal', '酉': 'metal', '戌': 'earth', '亥': 'water'
}

// 时辰对应
const HOUR_BRANCHES = {
  '23-1': '子', '1-3': '丑', '3-5': '寅', '5-7': '卯',
  '7-9': '辰', '9-11': '巳', '11-13': '午', '13-15': '未',
  '15-17': '申', '17-19': '酉', '19-21': '戌', '21-23': '亥'
}

// 节气时间（简化版，用于判断月份）
// 实际应用中需要更精确的节气数据
const SOLAR_TERMS = {
  spring: { month: 2, day: 4 },      // 立春
  awakening: { month: 3, day: 6 },   // 惊蛰
  clear: { month: 4, day: 5 },       // 清明
  summer: { month: 5, day: 6 },      // 立夏
  grain: { month: 6, day: 6 },       // 芒种
  minorHeat: { month: 7, day: 7 },   // 小暑
  autumn: { month: 8, day: 8 },      // 立秋
  whiteDew: { month: 9, day: 8 },    // 白露
  coldDew: { month: 10, day: 8 },    // 寒露
  frost: { month: 11, day: 7 },      // 立冬
  snow: { month: 12, day: 7 },       // 大雪
  cold: { month: 1, day: 6 }         // 小寒
}

// 获取农历月支（基于节气）
function getMonthBranch(year, month, day) {
  // 基于节气计算月支
  // 立春(2/4)→寅, 惊蛰(3/6)→卯, 清明(4/5)→辰, 立夏(5/6)→巳
  // 芒种(6/6)→午, 小暑(7/7)→未, 立秋(8/8)→申, 白露(9/8)→酉
  // 寒露(10/8)→戌, 立冬(11/7)→亥, 大雪(12/7)→子, 小寒(1/6)→丑

  const date = new Date(year, month - 1, day)

  // 每个月的节气日期
  const solarTerms = [
    { month: 2, day: 4, branch: 2 },   // 立春 - 寅月
    { month: 3, day: 6, branch: 3 },   // 惊蛰 - 卯月
    { month: 4, day: 5, branch: 4 },   // 清明 - 辰月
    { month: 5, day: 6, branch: 5 },   // 立夏 - 巳月
    { month: 6, day: 6, branch: 6 },   // 芒种 - 午月
    { month: 7, day: 7, branch: 7 },   // 小暑 - 未月
    { month: 8, day: 8, branch: 8 },   // 立秋 - 申月
    { month: 9, day: 8, branch: 9 },   // 白露 - 酉月
    { month: 10, day: 8, branch: 10 }, // 寒露 - 戌月
    { month: 11, day: 7, branch: 11 }, // 立冬 - 亥月
    { month: 12, day: 7, branch: 0 },  // 大雪 - 子月
    { month: 1, day: 6, branch: 1 }    // 小寒 - 丑月
  ]

  // 找到当前日期所在的月份（节气到下一个节气之间）
  for (let i = 0; i < solarTerms.length; i++) {
    const term = solarTerms[i]
    const termDate = new Date(year, term.month - 1, term.day)

    // 处理跨年的小寒（1月6日）
    let nextTerm = solarTerms[(i + 1) % 12]
    let nextTermDate = new Date(year, nextTerm.month - 1, nextTerm.day)

    // 如果当前日期在这个节气之后，下一个节气之前
    if (date >= termDate && date < nextTermDate) {
      return term.branch
    }
  }

  // 默认返回丑月（12月-1月）
  return 1
}

// 获取年柱
function getYearPillar(year, month, day) {
  // 判断是否在立春前
  const springDate = new Date(year, 1, 4) // 2月4日
  const currentDate = new Date(year, month - 1, day)

  let actualYear = year
  if (currentDate < springDate) {
    actualYear = year - 1
  }

  // 年干支计算：以1984年甲子年为基准
  // (actualYear - 4) % 60 得到干支索引
  const offset = ((actualYear - 4) % 60 + 60) % 60
  const stemIndex = offset % 10
  const branchIndex = offset % 12

  return {
    heavenly: HEAVENLY_STEMS[stemIndex],
    earthly: EARTHLY_BRANCHES[branchIndex]
  }
}

// 获取月柱
function getMonthPillar(year, month, day) {
  const yearPillar = getYearPillar(year, month, day)
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearPillar.heavenly)

  // 获取月支
  const branchIndex = getMonthBranch(year, month, day)

  // 月干计算：根据年干和月支计算
  // 口诀：甲己之年丙作首，乙庚之岁戊为头，
  //      丙辛之岁寻庚上，丁壬壬寅顺水流，
  //      若问戊癸何处起，甲寅之上好追求。
  const monthStart = {
    '甲': 2, // 丙
    '乙': 4, // 戊
    '丙': 6, // 庚
    '丁': 8, // 壬
    '戊': 0, // 甲
    '己': 2, // 丙
    '庚': 4, // 戊
    '辛': 6, // 庚
    '壬': 8, // 壬
    '癸': 0  // 甲
  }

  const startStem = monthStart[yearPillar.heavenly]
  const monthOrder = (branchIndex - 2 + 12) % 12 // 从寅月开始是第几个月
  const stemIndex = (startStem + monthOrder) % 10

  return {
    heavenly: HEAVENLY_STEMS[stemIndex],
    earthly: EARTHLY_BRANCHES[branchIndex]
  }
}

// 获取日柱（使用基准日期法）
function getDayPillar(date) {
  // 基准日期：1990年9月1日是己巳日
  // 验证通过：己=5, 巳=5
  const baseDate = new Date(1990, 8, 1) // 1990年9月1日
  const baseStem = 5  // 己
  const baseBranch = 5 // 巳

  const targetDate = new Date(date)

  // 使用UTC时间计算天数差，避免时区问题
  const daysDiff = Math.floor((Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()) -
                              Date.UTC(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate())) /
                             (1000 * 60 * 60 * 24))

  const dayOffset = ((daysDiff % 60) + 60) % 60
  const stemIndex = (baseStem + dayOffset) % 10
  const branchIndex = (baseBranch + dayOffset) % 12

  return {
    heavenly: HEAVENLY_STEMS[stemIndex],
    earthly: EARTHLY_BRANCHES[branchIndex]
  }
}

// 获取时柱
function getHourPillar(dayPillar, hour) {
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayPillar.heavenly)

  // 获取时支
  const hourKey = Object.keys(HOUR_BRANCHES).find(key => {
    const [start, end] = key.split('-').map(Number)
    return hour >= start && hour < end
  }) || '23-1'

  const hourBranch = HOUR_BRANCHES[hourKey]
  const branchIndex = EARTHLY_BRANCHES.indexOf(hourBranch)

  // 时干计算（五鼠遁日）
  // 口诀：甲己还加甲，乙庚丙作初，丙辛从戊起，
  //      丁壬庚子居，戊癸何方发，壬子是真途。
  const hourStart = {
    '甲': 0, // 甲
    '乙': 2, // 丙
    '丙': 4, // 戊
    '丁': 6, // 庚
    '戊': 8, // 壬
    '己': 0, // 甲
    '庚': 2, // 丙
    '辛': 4, // 戊
    '壬': 6, // 庚
    '癸': 8  // 壬
  }

  const startStem = hourStart[dayPillar.heavenly]
  const hourOrder = branchIndex // 子时是0，丑时是1...
  const stemIndex = (startStem + hourOrder) % 10

  return {
    heavenly: HEAVENLY_STEMS[stemIndex],
    earthly: hourBranch
  }
}

// 分析五行
function analyzeWuxing(bazi) {
  const wuxing = {
    metal: 0,
    wood: 0,
    water: 0,
    fire: 0,
    earth: 0
  }

  // 统计八字中的五行
  const allStemsBranches = [
    bazi.yearPillar.heavenly, bazi.yearPillar.earthly,
    bazi.monthPillar.heavenly, bazi.monthPillar.earthly,
    bazi.dayPillar.heavenly, bazi.dayPillar.earthly,
    bazi.hourPillar.heavenly, bazi.hourPillar.earthly
  ]

  allStemsBranches.forEach(char => {
    const wx = WUXING_MAP[char]
    if (wx) {
      wuxing[wx]++
    }
  })

  return wuxing
}

// 生成命理分析
function generateAnalysis(bazi, wuxing, dayMaster) {
  const wuxingEntries = Object.entries(wuxing).sort((a, b) => b[1] - a[1])
  const strongest = wuxingEntries[0]
  const weakest = wuxingEntries.filter(([_, count]) => count === 0).map(([name]) => name)

  const wxNames = { metal: '金', wood: '木', water: '水', fire: '火', earth: '土' }
  const wxTraits = {
    metal: '刚毅果断，为人讲义气，有责任心',
    wood: '仁慈正直，积极向上，富有爱心',
    water: '智慧灵活，适应力强，善于思考',
    fire: '热情主动，彬彬有礼，富有活力',
    earth: '诚实稳重，包容心强，值得信赖'
  }

  const dayMasterWuxing = WUXING_MAP[dayMaster]

  let analysis = `📊 **日主分析**\n\n`
  analysis += `您的日主为【<strong>${dayMaster}</strong>】，五行属<strong>${wxNames[dayMasterWuxing]}</strong>。\n\n`
  analysis += `整体命格${wuxing[dayMasterWuxing] >= 2 ? '较为强健' : '偏弱'}，${wuxing[dayMasterWuxing] >= 2 ? '能量充足，适合主动出击' : '需要补充能量，宜稳扎稳打'}。\n\n`

  if (strongest[1] >= 3) {
    analysis += `🎯 **性格特点**\n\n`
    analysis += `八字中<strong>${wxNames[strongest[0]]}</strong>较旺（${strongest[1]}个），性格特点：${wxTraits[strongest[0]]}。\n\n`
  }

  if (weakest.length > 0) {
    analysis += `⚖️ **五行平衡**\n\n`
    analysis += `八字中缺少<strong>${weakest.map(w => wxNames[w]).join('、')}</strong>，建议在生活中多接触相应属性的事物来平衡，例如：\n\n`
    weakest.forEach(w => {
      const supplements = {
        metal: '佩戴金属饰品、多穿白色系衣物',
        wood: '多接触绿色植物、养花种草',
        water: '多喝水、居住在水边、从事流动性行业',
        fire: '多晒太阳、使用暖色调、从事能源行业',
        earth: '登山踏青、使用黄色系、从事房地产行业'
      }
      analysis += `• ${wxNames[w]}：${supplements[w]}\n`
    })
    analysis += `\n`
  }

  analysis += `💼 **事业建议**\n\n`
  if (wuxing[dayMasterWuxing] >= 2) {
    analysis += `日主身强，宜泄耗，适合从事消耗自身能量、具有挑战性的职业，如：管理、销售、创业等。`
  } else {
    analysis += `日主身弱，宜生扶，适合从事能补充自身能量、稳定性强的职业，如：公务员、教育、大型企业等。`
  }

  return analysis
}

// 生成运势解读
function generateFortune(bazi, wuxing) {
  const wxNames = { metal: '金', wood: '木', water: '水', fire: '火', earth: '土' }

  const fortuneAnalysis = []

  // 事业运势
  const strongestWx = Object.entries(wuxing).sort((a, b) => b[1] - a[1])[0][0]
  const careerAdvice = {
    metal: '金融、法律、机械、珠宝、会计、精密制造',
    wood: '教育、文化、艺术、医疗、出版、林业、设计',
    water: '贸易、物流、旅游、餐饮、航运、水产、饮品',
    fire: '科技、媒体、营销、能源、电子、娱乐、石油',
    earth: '建筑、房地产、农业、管理、矿业、陶瓷'
  }
  fortuneAnalysis.push(`🏢 **事业运势**\n\n您的八字以<strong>${wxNames[strongestWx]}</strong>为最强五行，适合从事以下行业：\n\n${careerAdvice[strongestWx]}等。\n\n在这些领域发展容易获得成功，建议结合自身兴趣选择方向。`)

  // 财运
  const wealthElements = Object.entries(wuxing)
    .filter(([_, count]) => count > 0)
    .map(([name]) => wxNames[name])
  fortuneAnalysis.push(`\n\n💰 **财运分析**\n\n您的八字五行包含：${wealthElements.join('、')}。\n\n财运${wealthElements.length >= 4 ? '📈 较为旺盛' : '📊 平稳发展'}，`)
  if (wealthElements.length >= 4) {
    fortuneAnalysis.push(`五行齐全，财源广进，建议多元化投资，分散风险。`)
  } else {
    fortuneAnalysis.push(`建议${wealthElements.length <= 2 ? '稳健理财，开源节流' : '适度投资，步步为营'}，避免盲目冲动。`)
  }

  // 感情运
  const complexity = Object.keys(wuxing).filter(k => wuxing[k] >= 2).length
  fortuneAnalysis.push(`\n\n💕 **感情运势**\n\n您的性格${complexity > 2 ? '较为丰富多元' : '沉稳踏实'}，`)
  fortuneAnalysis.push(`在感情中${wuxing.water > 0 ? '浪漫体贴，善解人意，注重情感交流' : '务实直接，行动力强，注重实际付出'}。`)
  fortuneAnalysis.push(`\n\n💡 建议：${complexity > 2 ? '情绪多变，需要学会控制情绪，多换位思考' : '感情专一，但需要增加浪漫元素，多表达情感'}。`)

  // 健康运
  const healthAdvice = []
  if (wuxing.wood === 0) healthAdvice.push('肝胆（注意情绪管理，少熬夜）')
  if (wuxing.fire === 0) healthAdvice.push('心脏（适度运动，避免过度劳累）')
  if (wuxing.earth === 0) healthAdvice.push('脾胃（注意饮食规律，细嚼慢咽）')
  if (wuxing.metal === 0) healthAdvice.push('肺腑（多做有氧运动，保持呼吸通畅）')
  if (wuxing.water === 0) healthAdvice.push('肾水（避免过度劳累，注意休息）')

  fortuneAnalysis.push(`\n\n🏥 **健康建议**\n\n${healthAdvice.length > 0 ? `需特别注意以下部位的保养：\n\n${healthAdvice.map(h => `• ${h}`).join('\n')}` : '五行较为平衡，整体健康状况良好，继续保持良好的生活习惯。'}`)

  // 总体运势
  fortuneAnalysis.push(`\n\n✨ **总体运势**\n\n${wuxing[strongestWx] >= 3 ? `您的${wxNames[strongestWx]}行较旺，整体运势强劲，但也需要注意平衡，避免过于极端。` : '五行分布相对均衡，各方面发展较为平稳，适合稳中求进。'}\n\n记住：命运掌握在自己手中，八字仅供参考，真正决定人生的是自己的努力和选择。`)

  return fortuneAnalysis.join('')
}

// 判断天干阴阳
function isYangStem(stem) {
  const yangStems = ['甲', '丙', '戊', '庚', '壬']
  return yangStems.includes(stem)
}

// 计算大运
function calculateDaYun(bazi, birthDate, birthTime, gender) {
  const [year, month, day] = birthDate.split('-').map(Number)
  const [hour, minute] = birthTime.split(':').map(Number)
  const yearStem = bazi.yearPillar.heavenly

  // 判断起运方向
  // 阳年男、阴年女：顺行
  // 阴年男、阳年女：逆行
  const isYangYear = isYangStem(yearStem)
  const isMale = gender === 'male'
  const isForward = (isYangYear && isMale) || (!isYangYear && !isMale)

  // 使用lunar-javascript库获取精确节气
  const birthSolar = Solar.fromYmdHms(year, month, day, hour, minute, 0)
  const birthLunar = birthSolar.getLunar()

  // 获取节气表
  const jieQiTable = birthLunar.getJieQiTable()

  // 月柱起始节气列表（12个节，对应12个月）
  const monthTerms = ['立春', '惊蛰', '清明', '立夏', '芒种', '小暑',
                      '立秋', '白露', '寒露', '立冬', '大雪', '小寒']

  // 找到出生日期所在的月柱起始节气
  let currentMonthTerm = null
  let nextMonthTerm = null

  for (let i = 0; i < 12; i++) {
    const term = monthTerms[i]
    const nextTerm = monthTerms[(i + 1) % 12]

    const termSolar = jieQiTable[term]
    const nextTermSolar = jieQiTable[nextTerm]

    const termDate = new Date(termSolar.getYear(), termSolar.getMonth() - 1, termSolar.getDay())
    const nextTermDate = new Date(nextTermSolar.getYear(), nextTermSolar.getMonth() - 1, nextTermSolar.getDay())

    const birthDate = new Date(year, month - 1, day)

    if (birthDate >= termDate && birthDate < nextTermDate) {
      currentMonthTerm = term
      nextMonthTerm = nextTerm
      break
    }
  }

  // 根据顺逆计算到下一个或上一个月柱起始节气的距离
  let hoursToTerm = 0

  if (isForward) {
    // 顺行：算到下一个月的起始节气
    if (nextMonthTerm && jieQiTable[nextMonthTerm]) {
      const nextTermSolar = jieQiTable[nextMonthTerm]
      const nextDate = new Date(nextTermSolar.getYear(), nextTermSolar.getMonth() - 1, nextTermSolar.getDay(), nextTermSolar.getHour(), nextTermSolar.getMinute(), nextTermSolar.getSecond())
      const birthDate = new Date(year, month - 1, day, hour, minute, 0)
      hoursToTerm = (nextDate - birthDate) / (1000 * 60 * 60)
    }
  } else {
    // 逆行：算到当前月的起始节气
    if (currentMonthTerm && jieQiTable[currentMonthTerm]) {
      const currentTermSolar = jieQiTable[currentMonthTerm]
      const termDate = new Date(currentTermSolar.getYear(), currentTermSolar.getMonth() - 1, currentTermSolar.getDay(), currentTermSolar.getHour(), currentTermSolar.getMinute(), currentTermSolar.getSecond())
      const birthDate = new Date(year, month - 1, day, hour, minute, 0)
      hoursToTerm = (birthDate - termDate) / (1000 * 60 * 60)
    }
  }

  // 起运时间 = 小时数 / 3（3天 = 1年，即72小时=1年）
  const totalDays = hoursToTerm / 24
  const startYears = totalDays / 3  // 总年数

  // 转换为年月日时（更精确的方法）
  const startY = Math.floor(startYears)
  const startM = Math.floor((startYears - startY) * 12)
  const startD = Math.floor(((startYears - startY) * 12 - startM) * 30.44)
  const startH = Math.floor(((((startYears - startY) * 12 - startM) * 30.44 - startD) * 24))

  // 简化的起运年龄（用于显示）
  const startAge = Math.floor(startYears)

  // 计算大运干支
  const daYunList = []
  let currentStem = HEAVENLY_STEMS.indexOf(bazi.monthPillar.heavenly)
  let currentBranch = EARTHLY_BRANCHES.indexOf(bazi.monthPillar.earthly)

  for (let i = 0; i < 8; i++) {
    // 顺行或逆行
    if (isForward) {
      currentStem = (currentStem + 1) % 10
      currentBranch = (currentBranch + 1) % 12
    } else {
      currentStem = (currentStem - 1 + 10) % 10
      currentBranch = (currentBranch - 1 + 12) % 12
    }

    daYunList.push({
      index: i + 1,
      heavenly: HEAVENLY_STEMS[currentStem],
      earthly: EARTHLY_BRANCHES[currentBranch],
      startAge: startAge + i * 10,
      endAge: startAge + (i + 1) * 10 - 1,
      startYear: year + startAge + i * 10,
      endYear: year + startAge + (i + 1) * 10 - 1
    })
  }

  return {
    startAge,
    startYear: startY,
    startMonth: startM,
    startDay: startD,
    startHour: startH,
    isForward,
    list: daYunList
  }
}

// 计算流年干支
function calculateLiuNian(startYear, endYear) {
  const liuNianList = []

  for (let year = startYear; year <= endYear; year++) {
    // 计算年柱
    const offset = ((year - 4) % 60 + 60) % 60
    const stemIndex = offset % 10
    const branchIndex = offset % 12

    liuNianList.push({
      year: year,
      heavenly: HEAVENLY_STEMS[stemIndex],
      earthly: EARTHLY_BRANCHES[branchIndex]
    })
  }

  return liuNianList
}

// 判断五行生克关系
function getWuXingRelation(element1, element2) {
  const relations = {
    'wood-metal': '克', // 木克土
    'wood-earth': '克',
    'wood-water': '生', // 水生木
    'wood-fire': '生', // 木生火
    'wood-wood': '比和',

    'fire-wood': '克',
    'fire-earth': '克',
    'fire-water': '克',
    'fire-metal': '生',
    'fire-fire': '比和',

    'earth-wood': '克',
    'earth-water': '克',
    'earth-fire': '生',
    'earth-metal': '生',
    'earth-earth': '比和',

    'metal-wood': '克',
    'metal-fire': '克',
    'metal-earth': '克',
    'metal-water': '生',
    'metal-metal': '比和',

    'water-fire': '克',
    'water-earth': '克',
    'water-metal': '克',
    'water-wood': '生',
    'water-water': '比和'
  }

  return relations[`${element1}-${element2}`] || '未知'
}

// 计算干支关系得分
function calculatePillarScore(targetPillar, referencePillar) {
  let score = 0

  const targetStemWx = WUXING_MAP[targetPillar.heavenly]
  const targetBranchWx = WUXING_MAP[targetPillar.earthly]
  const refStemWx = WUXING_MAP[referencePillar.heavenly]
  const refBranchWx = WUXING_MAP[referencePillar.earthly]

  // 天干关系
  const stemRelation = getWuXingRelation(targetStemWx, refStemWx)
  if (stemRelation === '生') score += 15
  else if (stemRelation === '比和') score += 10
  else if (stemRelation === '克') score -= 5

  // 地支关系
  const branchRelation = getWuXingRelation(targetBranchWx, refBranchWx)
  if (branchRelation === '生') score += 15
  else if (branchRelation === '比和') score += 10
  else if (branchRelation === '克') score -= 5

  return score
}

// 计算流年运势（生成K线数据）
function calculateYearlyFortune(bazi, daYun, liuNian, birthYear) {
  const yearlyData = []
  const dayMaster = bazi.dayPillar.heavenly
  const dayMasterWx = WUXING_MAP[dayMaster]

  liuNian.forEach((yearData, index) => {
    // 找到该年份对应的大运
    const currentDaYun = daYun.list.find(yun =>
      yearData.year >= yun.startYear && yearData.year <= yun.endYear
    )

    if (!currentDaYun) return

    // 基础分数
    let baseScore = 50

    // 1. 流年对日主的影响（权重55%）
    const liuNianPillar = { heavenly: yearData.heavenly, earthly: yearData.earthly }
    const dayPillar = bazi.dayPillar
    const liuNianScore = calculatePillarScore(liuNianPillar, dayPillar)
    baseScore += liuNianScore * 0.55

    // 2. 大运对日主的影响（权重35%）
    const daYunPillar = { heavenly: currentDaYun.heavenly, earthly: currentDaYun.earthly }
    const daYunScore = calculatePillarScore(daYunPillar, dayPillar)
    baseScore += daYunScore * 0.35

    // 3. 流年与大运的关系（权重10%）
    const liuNianDaYunScore = calculatePillarScore(liuNianPillar, daYunPillar)
    baseScore += liuNianDaYunScore * 0.10

    // 4. 流年干支相生相合加分（流年自身强化）
    const liuNianStemWx = WUXING_MAP[yearData.heavenly]
    const liuNianBranchWx = WUXING_MAP[yearData.earthly]
    if (getWuXingRelation(liuNianStemWx, liuNianBranchWx) === '生') {
      baseScore += 5
    } else if (getWuXingRelation(liuNianStemWx, liuNianBranchWx) === '比和') {
      baseScore += 3
    }

    // 限制分数范围 0-100
    baseScore = Math.max(0, Math.min(100, baseScore))

    // 生成该年的运势解读
    const fortuneAnalysis = generateYearFortuneAnalysis(yearData, currentDaYun, baseScore)

    // 生成K线数据
    const volatility = Math.random() * 20 - 10 // -10 到 +10 的波动
    const open = baseScore
    const close = baseScore + volatility
    const high = Math.max(open, close) + Math.random() * 15
    const low = Math.min(open, close) - Math.random() * 15

    yearlyData.push({
      year: yearData.year,
      ganZhi: yearData.heavenly + yearData.earthly,
      daYun: currentDaYun.heavenly + currentDaYun.earthly,
      age: yearData.year - birthYear,
      kline: {
        open: Math.round(Math.max(0, Math.min(100, open))),
        close: Math.round(Math.max(0, Math.min(100, close))),
        high: Math.round(Math.max(0, Math.min(100, high))),
        low: Math.round(Math.max(0, Math.min(100, low))),
        score: Math.round(baseScore)
      },
      summary: fortuneAnalysis.summary,
      detail: fortuneAnalysis.detail
    })
  })

  return yearlyData
}

// 生成每年的运势分析
function generateYearFortuneAnalysis(yearData, daYun, score) {
  const wxNames = { metal: '金', wood: '木', water: '水', fire: '火', earth: '土' }

  // 根据分数生成核心摘要（20字以内）
  let summary = ''
  if (score >= 80) {
    const summaries = [
      '运势强劲，事半功倍，大展宏图',
      '吉星高照，贵人相助，事业腾飞',
      '鸿运当头，心想事成，收获满满',
      '春风得意，顺顺利利，前程似锦'
    ]
    summary = summaries[Math.floor(Math.random() * summaries.length)]
  } else if (score >= 60) {
    const summaries = [
      '运势平稳，稳中求进，小有收获',
      '平平顺顺，按部就班，渐入佳境',
      '运势尚可，需努力付出，成果可期',
      '平平淡淡，稳步前行，积蓄力量'
    ]
    summary = summaries[Math.floor(Math.random() * summaries.length)]
  } else if (score >= 40) {
    const summaries = [
      '运势起伏，谨慎行事，守成为上',
      '挑战颇多，需保持耐心，等待时机',
      '压力较大，低调行事，韬光养晦',
      '变化较多，审时度势，灵活应对'
    ]
    summary = summaries[Math.floor(Math.random() * summaries.length)]
  } else {
    const summaries = [
      '运势低迷，宜静不宜动，养精蓄锐',
      '困难重重，需要坚强，积极面对',
      '多事之秋，谨言慎行，避免冲动',
      '低调保守，修身养性，积蓄力量'
    ]
    summary = summaries[Math.floor(Math.random() * summaries.length)]
  }

  // 生成详细的运势指导
  const careerAdvice = {
    high: '事业运势旺盛，适合主动出击，大胆创新，拓展业务，提升职位。把握机遇，展现才华，获得领导和同事的认可。',
    mid: '事业运势平稳，按部就班完成工作任务，踏实做事，积累经验。保持专注，稳中求进，等待晋升机会。',
    low: '事业运势一般，需要谨慎行事，避免冒险决策。做好本职工作，提升专业技能，多学习少表现，等待时机。'
  }

  const marriageAdvice = {
    high: '感情运势顺遂，单身者有机会结识良缘，有伴者感情升温。多沟通交流，增进了解，关系更加稳固。',
    mid: '感情运势平淡，需要用心经营。多陪伴关心对方，创造浪漫惊喜，避免因工作忽视感情。',
    low: '感情运势欠佳，需要多包容理解。避免争吵冷战，耐心沟通，保持冷静，给彼此空间。'
  }

  const healthAdvice = {
    high: '身体状况良好，精力充沛。适合运动健身，保持良好作息，均衡饮食，预防胜于治疗。',
    mid: '身体状况一般，需要注意劳逸结合。避免过度劳累，保证睡眠质量，适度锻炼，增强免疫力。',
    low: '健康运势较弱，需要特别关注。注意休息，避免熬夜和过度操劳，定期体检，保持良好生活习惯。'
  }

  let career = '', marriage = '', health = ''
  if (score >= 70) {
    career = careerAdvice.high
    marriage = marriageAdvice.high
    health = healthAdvice.high
  } else if (score >= 50) {
    career = careerAdvice.mid
    marriage = marriageAdvice.mid
    health = healthAdvice.mid
  } else {
    career = careerAdvice.low
    marriage = marriageAdvice.low
    health = healthAdvice.low
  }

  return {
    summary,
    detail: { career, marriage, health }
  }
}

// 计算八字主函数
export function calculateBazi(birthDate, birthTime, gender = 'male') {
  const [year, month, day] = birthDate.split('-').map(Number)
  const [hour, minute] = birthTime.split(':').map(Number)

  const yearPillar = getYearPillar(year, month, day)
  const monthPillar = getMonthPillar(year, month, day)
  const dayPillar = getDayPillar(new Date(year, month - 1, day))
  const hourPillar = getHourPillar(dayPillar, hour)

  const bazi = {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar
  }

  const wuxing = analyzeWuxing(bazi)
  const dayMaster = dayPillar.heavenly

  // 计算大运
  const daYun = calculateDaYun(bazi, birthDate, birthTime, gender)

  // 计算流年（从出生年份到100岁）
  const liuNian = calculateLiuNian(year, year + 100)

  // 计算每年运势（K线数据）
  const yearlyFortune = calculateYearlyFortune(bazi, daYun, liuNian, year)

  return {
    ...bazi,
    wuxing,
    dayMaster,
    daYun,
    liuNian,
    yearlyFortune,
    analysis: generateAnalysis(bazi, wuxing, dayMaster),
    fortune: generateFortune(bazi, wuxing)
  }
}
