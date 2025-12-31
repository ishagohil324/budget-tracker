import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const RadarSpending = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={360}>
      <RadarChart data={data}>
        {/* Grid */}
        <PolarGrid
          stroke="rgba(255,255,255,0.15)"
          radialLines
        />

        {/* Category labels */}
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: '#e5e7eb', fontSize: 13, fontWeight: 600 }}
        />

        {/* Value scale */}
        <PolarRadiusAxis
          tick={{ fill: '#9ca3af', fontSize: 11 }}
          axisLine={false}
        />

        {/* Tooltip */}
        <Tooltip
          formatter={(value) => `₹ ${value.toLocaleString()}`}
          contentStyle={{
            backgroundColor: '#0f172a',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          }}
        />

        {/* Gradient */}
        <defs>
          <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Radar */}
        <Radar
          dataKey="value"
          stroke="url(#radarGradient)"
          strokeWidth={3}
          fill="url(#radarGradient)"
          fillOpacity={0.45}
          dot={{ r: 4, fill: '#fff' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarSpending;
