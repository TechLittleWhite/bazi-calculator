import { useState } from 'react'
import './App.css'
import BaziForm from './components/BaziForm'
import BaziResult from './components/BaziResult'
import KLineChart from './components/KLineChart'

export interface BaziData {
  yearPillar: { heavenly: string; earthly: string }
  monthPillar: { heavenly: string; earthly: string }
  dayPillar: { heavenly: string; earthly: string }
  hourPillar: { heavenly: string; earthly: string }
  wuxing: { [key: string]: number }
  dayMaster: string
  daYun: {
    startAge: number
    startYear: number
    startMonth: number
    startDay: number
    startHour: number
    isForward: boolean
    list: Array<{
      index: number
      heavenly: string
      earthly: string
      startAge: number
      endAge: number
      startYear: number
      endYear: number
    }>
  }
  liuNian: Array<{
    year: number
    heavenly: string
    earthly: string
  }>
  yearlyFortune?: Array<{
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
  }>
  analysis: string
  fortune: string
}

function App() {
  const [baziData, setBaziData] = useState<BaziData | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCalculate = async (birthDate: string, birthTime: string, gender: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/calculate-bazi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate, birthTime, gender })
      })
      const data = await response.json()
      setBaziData(data)
    } catch (error) {
      console.error('Error calculating bazi:', error)
      alert('计算失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>八字排盘系统</h1>
        <p>专业命理分析 · 五行解读 · 运势预测</p>
      </header>

      <main className="app-main">
        <BaziForm onCalculate={handleCalculate} loading={loading} />
        {baziData && <BaziResult data={baziData} />}
        {baziData && baziData.yearlyFortune && <KLineChart data={baziData.yearlyFortune} />}
      </main>

      <footer className="app-footer">
        <p>仅供娱乐参考，请相信科学</p>
      </footer>
    </div>
  )
}

export default App
