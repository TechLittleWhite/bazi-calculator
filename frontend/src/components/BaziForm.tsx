import { useState } from 'react'
import './BaziForm.css'

interface BaziFormProps {
  onCalculate: (date: string, time: string, gender: string) => void
  loading: boolean
}

const BaziForm = ({ onCalculate, loading }: BaziFormProps) => {
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [gender, setGender] = useState('male')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (birthDate && birthTime) {
      onCalculate(birthDate, birthTime, gender)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="bazi-form">
        <h2>请输入出生信息</h2>

        <div className="form-group">
          <label htmlFor="birthDate">出生日期</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthTime">出生时间</label>
          <input
            type="time"
            id="birthTime"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>性别</label>
          <div className="gender-options">
            <label className="gender-option">
              <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
              />
              <span>男</span>
            </label>
            <label className="gender-option">
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
              />
              <span>女</span>
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? '计算中...' : '开始排盘'}
        </button>
      </form>
    </div>
  )
}

export default BaziForm
