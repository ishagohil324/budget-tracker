import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const RadarSpending = ({ data }) => (
  <ResponsiveContainer width="100%" height={350}>
    <RadarChart
      data={data}
      outerRadius="80%"
    >
      <PolarGrid stroke="rgba(255,255,255,0.25)" />

      <PolarAngleAxis
        dataKey="name"
        stroke="#fff"
        tick={{ fill: '#e5e7eb', fontSize: 12 }}
      />

      {/* 🔥 THIS IS THE MISSING PIECE */}
      <PolarRadiusAxis
        stroke="rgba(255,255,255,0.3)"
        tick={{ fill: '#9ca3af', fontSize: 10 }}
        angle={90}
      />

      <Radar
        name="Spending"
        dataKey="value"
        stroke="#8B5CF6"
        fill="url(#radarGradient)"
        fillOpacity={0.7}
      />

      {/* Sexy gradient */}
      <defs>
        <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </RadarChart>
  </ResponsiveContainer>
);

export default RadarSpending;
