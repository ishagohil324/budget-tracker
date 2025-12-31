import React from 'react';

const getColor = (value, max) => {
  if (value === 0) return 'bg-slate-800';

  const intensity = value / max;

  if (intensity > 0.75) return 'bg-pink-500';
  if (intensity > 0.5) return 'bg-orange-400';
  if (intensity > 0.25) return 'bg-yellow-400';
  return 'bg-emerald-400';
};

const SpendingHeatmap = ({ data }) => {
  const categories = [...new Set(data.map(d => d.category))];
  const months = [...new Set(data.map(d => d.month))];

  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `120px repeat(${months.length}, 1fr)`,
        }}
      >
        {/* Header */}
        <div></div>
        {months.map(m => (
          <div key={m} className="text-center text-sm text-gray-300">
            {m}
          </div>
        ))}

        {/* Rows */}
        {categories.map(cat => (
          <React.Fragment key={cat}>
            <div className="text-sm text-gray-200">{cat}</div>

            {months.map(month => {
              const cell =
                data.find(d => d.category === cat && d.month === month)
                  ?.value || 0;

              return (
                <div
                  key={month}
                  className={`h-10 rounded-lg flex items-center justify-center text-xs font-bold text-black ${getColor(
                    cell,
                    maxValue
                  )}`}
                >
                  {cell ? `₹${cell}` : ''}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SpendingHeatmap;
