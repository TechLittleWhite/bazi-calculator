import express from 'express'
import cors from 'cors'
import { calculateBazi } from './baziCalculator.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.post('/api/calculate-bazi', (req, res) => {
  try {
    const { birthDate, birthTime, gender } = req.body

    if (!birthDate || !birthTime) {
      return res.status(400).json({ error: '请提供完整的出生日期和时间' })
    }

    const result = calculateBazi(birthDate, birthTime)
    res.json(result)
  } catch (error) {
    console.error('Error calculating bazi:', error)
    res.status(500).json({ error: '计算失败' })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`)
})
