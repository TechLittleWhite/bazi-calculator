# 八字排盘系统 🎯

专业的八字命理分析系统，提供完整的八字排盘、五行分析、运势预测和人生K线图展示。

## ✨ 功能特点

- **八字排盘**：精确计算年、月、日、时四柱八字
- **五行分析**：统计金木水火土五行数量和强弱
- **大运推算**：准确计算起运时间和大运序列
- **流年运势**：1-100岁完整运势预测
- **K线图展示**：股票K线风格的人生运势图
  - 绿涨红跌（吉凶直观）
  - ⭐️标记人生巅峰年份
  - 鼠标悬停查看详细信息
  - 点击查看事业、婚姻、健康详情
- **移动端适配**：完美适配手机、平板、电脑

## 🚀 快速开始

### 本地开发

```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install

# 启动后端（在backend目录）
node server.js

# 启动前端（在frontend目录）
npm run dev
```

访问 `http://localhost:3000`

### Vercel 部署（推荐）

详见 [DEPLOY.md](./DEPLOY.md)

## 📊 技术栈

- **前端**：React + TypeScript + Vite + Recharts
- **后端**：Node.js + Express（本地）/ Vercel Serverless（部署）
- **算法库**：lunar-javascript（精确节气计算）
- **部署**：Vercel（全球CDN）

## 📱 移动端访问

部署到Vercel后，会得到公网地址，如：
```
https://bazi-calculator.vercel.app
```

任何人都可以通过手机或电脑访问，无需同一WiFi！

## ⚖️ 免责声明

本系统仅供娱乐参考，请相信科学。

## 📄 许可证

MIT License
