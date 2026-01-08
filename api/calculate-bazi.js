import { calculateBazi } from '../backend/baziCalculator.js'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { birthDate, birthTime, gender } = req.body

    if (!birthDate || !birthTime) {
      return res.status(400).json({ error: '请提供完整的出生日期和时间' })
    }

    const result = calculateBazi(birthDate, birthTime, gender)
    res.json(result)
  } catch (error) {
    console.error('Error calculating bazi:', error)
    res.status(500).json({ error: '计算失败' })
  }
}
