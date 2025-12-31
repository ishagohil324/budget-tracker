import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';

const RadarSpending = ({ data }) => (
  <ResponsiveContainer width="100%" height={350}>
    <RadarChart data={data}>
      <PolarGrid stroke="rgba(255,255,255,0.2)" />
      <PolarAngleAxis dataKey="name" stroke="#fff" />
      <Radar
        dataKey="value"
        stroke="#8B5CF6"
        fill="#8B5CF6"
        fillOpacity={0.6}
      />
    </RadarChart>
  </ResponsiveContainer>
);

export default RadarSpending;
