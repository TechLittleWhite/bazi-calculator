import { useState, useMemo } from 'react'
import { ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, ComposedChart, Bar, Line } from 'recharts'
import './KLineChart.css'

interface KLineData {
  year: number
  ganZhi: string
  daYun: string
  age: number
  kline: {
    open: number
    close: number
    high: number
    low: number
    score: number
  }
  summary: string
  detail: {
    career: string
    marriage: string
    health: string
  }
}

interface KLineChartProps {
  data: KLineData[]
}

const KLineChart = ({ data }: KLineChartProps) => {
  const [selectedYear, setSelectedYear] = useState<KLineData | null>(null)

  // 找到最高点
  const highestPoint = useMemo(() => {
    if (!data || data.length === 0) return null
    return data.reduce((max, current) =>
      current.kline.high > max.kline.high ? current : max
    )
  }, [data])

  // 自定义Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="custom-tooltip">
          <p className="tooltip-year">{data.year}年 ({data.ganZhi})</p>
          <p className="tooltip-age">{data.age}岁</p>
          <p className="tooltip-score">运势评分: {data.kline.score}分</p>
          <p className="tooltip-summary">{data.summary}</p>
          <div className="tooltip-kline">
            <span>开盘: {data.kline.open}</span>
            <span>收盘: {data.kline.close}</span>
            <span>最高: {data.kline.high}</span>
            <span>最低: {data.kline.low}</span>
          </div>
        </div>
      )
    }
    return null
  }

  // 处理K线点击
  const handleBarClick = (data: any) => {
    setSelectedYear(data)
  }

  // 获取K线颜色（绿涨红跌）
  const getBarColor = (data: KLineData) => {
    if (data.kline.close > data.kline.open) return '#22c55e' // 涨 - 绿色（吉）
    if (data.kline.close < data.kline.open) return '#ef4444' // 跌 - 红色（凶）
    return '#f59e0b' // 平 - 橙色
  }

  // 判断是否为最高点
  const isHighestPoint = (data: KLineData) => {
    return highestPoint && data.year === highestPoint.year && data.kline.high === highestPoint.kline.high
  }

  // 计算Y轴坐标
  const getY = (value: number, yMax: number, height: number, top: number) => {
    return top + height - (value / yMax) * height
  }

  return (
    <div className="kline-container">
      {/* 人生巅峰提示栏 */}
      {highestPoint && (
        <div className="peak-info-bar">
          <div className="peak-info-content">
            <span className="peak-label">⭐ 人生巅峰年份:</span>
            <span className="peak-year">{highestPoint.year}年</span>
            <span className="peak-ganzhi">({highestPoint.ganZhi})</span>
            <span className="peak-age">- {highestPoint.age}岁</span>
            <span className="peak-score">评分 {highestPoint.kline.high}</span>
          </div>
        </div>
      )}

      <div className="kline-chart-section">
        <h3>人生运势K线图</h3>
        <p className="kline-subtitle">流年大运走势图 (100年) · 绿色K线代表运势上涨（吉），红色K线代表运势下跌（凶）</p>

        <ResponsiveContainer width="100%" height={450}>
          <ComposedChart
            data={data}
            margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
            onMouseMove={(state: any) => {
              if (state.isTooltipActive && state.activePayload && state.activePayload.length > 0) {
                setSelectedYear(state.activePayload[0].payload)
              }
            }}
            onMouseLeave={() => setSelectedYear(null)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="year"
              tick={{ fill: '#666', fontSize: 11 }}
              tickFormatter={(value) => `${value}`}
              interval={9}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#666', fontSize: 12 }}
              label={{ value: '运势', position: 'insideLeft', angle: -90, fill: '#666' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />

            {/* 自定义K线蜡烛图 */}
            <Bar
              dataKey="kline.score"
              fill="#8884d8"
              onClick={handleBarClick}
              shape={(props: any) => {
                const { x, y, width, height, payload } = props
                const data = payload as KLineData
                const color = getBarColor(data)
                const isHighest = isHighestPoint(data)

                const open = data.kline.open
                const close = data.kline.close
                const high = data.kline.high
                const low = data.kline.low

                // 计算实体和影线的位置
                const bodyTop = getY(Math.max(open, close), 100, 390, 30)
                const bodyBottom = getY(Math.min(open, close), 100, 390, 30)
                const highY = getY(high, 100, 390, 30)
                const lowY = getY(low, 100, 390, 30)

                const centerX = x + width / 2

                return (
                  <g>
                    {/* 上影线（从实体顶部到最高价） */}
                    <line
                      x1={centerX}
                      y1={bodyTop}
                      x2={centerX}
                      y2={highY}
                      stroke={color}
                      strokeWidth={2}
                    />

                    {/* 下影线（从实体底部到最低价） */}
                    <line
                      x1={centerX}
                      y1={bodyBottom}
                      x2={centerX}
                      y2={lowY}
                      stroke={color}
                      strokeWidth={2}
                    />

                    {/* 实体（开盘价到收盘价的矩形） */}
                    <rect
                      x={x + 2}
                      y={bodyTop}
                      width={width - 4}
                      height={Math.max(bodyBottom - bodyTop, 2)}
                      fill={color}
                      opacity={0.85}
                    />

                    {/* 最高点星号标记 */}
                    {isHighest && (
                      <text
                        x={centerX}
                        y={highY - 5}
                        textAnchor="middle"
                        fontSize={20}
                        fill="#ef4444"
                        fontWeight="bold"
                      >
                        ⭐
                      </text>
                    )}
                  </g>
                )
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {selectedYear && (
        <div className="fortune-detail">
          <div className="detail-header">
            <h3>{selectedYear.year}年运势详解</h3>
            <span className="detail-ganzhi">{selectedYear.ganZhi}</span>
            <span className="detail-dayun">{selectedYear.daYun}运</span>
            <span className="detail-age">{selectedYear.age}岁</span>
          </div>

          <div className="detail-summary">
            <h4>核心摘要</h4>
            <p>{selectedYear.summary}</p>
          </div>

          <div className="detail-sections">
            <div className="detail-section career">
              <h4>💼 事业运势</h4>
              <p>{selectedYear.detail.career}</p>
            </div>

            <div className="detail-section marriage">
              <h4>💕 婚姻感情</h4>
              <p>{selectedYear.detail.marriage}</p>
            </div>

            <div className="detail-section health">
              <h4>🏥 健康状况</h4>
              <p>{selectedYear.detail.health}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KLineChart
