import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import './BaziResult.css'

interface BaziData {
  yearPillar: { heavenly: string; earthly: string }
  monthPillar: { heavenly: string; earthly: string }
  dayPillar: { heavenly: string; earthly: string }
  hourPillar: { heavenly: string; earthly: string }
  wuxing: { [key: string]: number }
  dayMaster: string
  analysis: string
  fortune: string
}

interface BaziResultProps {
  data: BaziData
}

const COLORS = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0']

const WX_NAMES: { [key: string]: string } = {
  metal: '金',
  wood: '木',
  water: '水',
  fire: '火',
  earth: '土'
}

const BaziResult = ({ data }: BaziResultProps) => {
  const chartData = Object.entries(data.wuxing)
    .filter(([_, count]) => count > 0)
    .map(([name, count]) => ({
      name: WX_NAMES[name] || name,
      value: count
    }))

  return (
    <div className="result-container">
      <div className="bazi-chart">
        <h3>八字排盘</h3>
        <div className="pillars">
          <div className="pillar">
            <div className="pillar-label">年柱</div>
            <div className="pillar-content">
              <span className="gan">{data.yearPillar.heavenly}</span>
              <span className="zhi">{data.yearPillar.earthly}</span>
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-label">月柱</div>
            <div className="pillar-content">
              <span className="gan">{data.monthPillar.heavenly}</span>
              <span className="zhi">{data.monthPillar.earthly}</span>
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-label">日柱</div>
            <div className="pillar-content day-master">
              <span className="gan">{data.dayPillar.heavenly}</span>
              <span className="zhi">{data.dayPillar.earthly}</span>
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-label">时柱</div>
            <div className="pillar-content">
              <span className="gan">{data.hourPillar.heavenly}</span>
              <span className="zhi">{data.hourPillar.earthly}</span>
            </div>
          </div>
        </div>
        <p className="day-master-info">日主：{data.dayMaster}</p>
      </div>

      <div className="wuxing-chart">
        <h3>五行分析</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="wuxing-details">
          {Object.entries(data.wuxing).map(([key, count]) => {
            if (count > 0) {
              return (
                <span key={key} className="wuxing-tag">
                  {WX_NAMES[key]}: {count}个
                </span>
              )
            }
            return null
          })}
        </div>
      </div>

      <div className="analysis-section">
        <h3>命理分析</h3>
        <div
          className="analysis-content"
          dangerouslySetInnerHTML={{ __html: data.analysis }}
        />
      </div>

      <div className="fortune-section">
        <h3>运势解读</h3>
        <div
          className="fortune-content"
          dangerouslySetInnerHTML={{ __html: data.fortune }}
        />
      </div>
    </div>
  )
}

export default BaziResult
