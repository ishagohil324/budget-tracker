// import React from 'react';
// import { motion } from 'framer-motion';
// import { Brain, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
// import GlassCard from '../common/GlassCard';
// import { generateInsights, predictNextMonthSpending, suggestBudgets } from '../../utils/aiPredictions';
// import { formatCurrency } from '../../utils/formatters';

// const AIInsights = ({ transactions, budgets, stats }) => {
//   const insights = generateInsights(transactions, budgets, stats);
//   const prediction = predictNextMonthSpending(transactions);
//   const budgetSuggestions = suggestBudgets(transactions, budgets);

//   const getInsightColor = (type) => {
//     switch (type) {
//       case 'success':
//         return 'border-green-500 bg-green-500 bg-opacity-10';
//       case 'warning':
//         return 'border-yellow-500 bg-yellow-500 bg-opacity-10';
//       case 'info':
//         return 'border-blue-500 bg-blue-500 bg-opacity-10';
//       default:
//         return 'border-gray-500 bg-gray-500 bg-opacity-10';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* AI Header */}
//       <GlassCard className="border-purple-500">
//         <div className="flex items-center gap-3 mb-4">
//           <Brain size={32} className="text-purple-400" />
//           <div>
//             <h2 className="text-2xl font-bold text-white">AI Financial Assistant</h2>
//             <p className="text-gray-300 text-sm">Powered by smart analytics</p>
//           </div>
//         </div>

//         {/* Prediction */}
//         {prediction.confidence !== 'low' && (
//           <div className="p-4 bg-purple-500 bg-opacity-20 rounded-lg border border-purple-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-300 text-sm mb-1">Next Month Prediction</p>
//                 <p className="text-3xl font-bold text-purple-400">
//                   {formatCurrency(prediction.prediction)}
//                 </p>
//                 <p className="text-sm text-gray-400 mt-1">
//                   Confidence: <span className="capitalize">{prediction.confidence}</span>
//                 </p>
//               </div>
//               <div className="text-right">
//                 <TrendingUp size={48} className={`${prediction.trend === 'increasing' ? 'text-red-400' : 'text-green-400'}`} />
//                 <p className={`text-sm font-semibold mt-2 ${prediction.trend === 'increasing' ? 'text-red-400' : 'text-green-400'}`}>
//                   {prediction.trend === 'increasing' ? '↑' : '↓'} {prediction.trendPercentage}%
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </GlassCard>

//       {/* Insights */}
//       {insights.length > 0 && (
//         <GlassCard>
//           <div className="flex items-center gap-2 mb-4">
//             <Lightbulb size={24} className="text-yellow-400" />
//             <h3 className="text-xl font-bold text-white">Smart Insights</h3>
//           </div>
//           <div className="space-y-3">
//             {insights.map((insight, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className={`p-4 rounded-lg border-l-4 ${getInsightColor(insight.type)}`}
//               >
//                 <div className="flex items-start gap-3">
//                   <span className="text-2xl">{insight.icon}</span>
//                   <div className="flex-1">
//                     <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
//                     <p className="text-gray-300 text-sm">{insight.message}</p>
//                     {insight.action && (
//                       <p className="text-blue-400 text-sm mt-2 font-medium">→ {insight.action}</p>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </GlassCard>
//       )}

//       {/* Budget Suggestions */}
//       {budgetSuggestions.length > 0 && (
//         <GlassCard>
//           <div className="flex items-center gap-2 mb-4">
//             <AlertCircle size={24} className="text-blue-400" />
//             <h3 className="text-xl font-bold text-white">Budget Suggestions</h3>
//           </div>
//           <div className="space-y-3">
//             {budgetSuggestions.slice(0, 3).map((suggestion, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="p-3 bg-white bg-opacity-5 rounded-lg"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="font-medium text-white">{suggestion.category}</p>
//                     <p className="text-sm text-gray-400">
//                       Average spending: {formatCurrency(suggestion.averageSpending)}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-green-400 font-semibold">
//                       {formatCurrency(suggestion.suggested)}
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       {suggestion.hasExisting ? 'Update budget' : 'Create budget'}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </GlassCard>
//       )}
//     </div>
//   );
// };

// export default AIInsights;

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS
import GlassCard from '../common/GlassCard';
import { generateInsights, predictNextMonthSpending, suggestBudgets } from '../../utils/aiPredictions';
import { formatCurrency } from '../../utils/formatters';

const AIInsights = ({ transactions, budgets, stats }) => {
  const navigate = useNavigate(); // ✅ ADD THIS
  const insights = generateInsights(transactions, budgets, stats);
  const prediction = predictNextMonthSpending(transactions);
  const budgetSuggestions = suggestBudgets(transactions, budgets);

  const getInsightColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-green-500 bg-opacity-10';
      case 'warning':
        return 'border-yellow-500 bg-yellow-500 bg-opacity-10';
      case 'info':
        return 'border-blue-500 bg-blue-500 bg-opacity-10';
      default:
        return 'border-gray-500 bg-gray-500 bg-opacity-10';
    }
  };

  // ✅ ADD THIS FUNCTION
  const handleActionClick = (action) => {
    if (action === '→ Review transactions') {
      navigate('/transactions');
    } else if (action?.includes('budget')) {
      navigate('/budgets');
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <GlassCard className="border-purple-500">
        <div className="flex items-center gap-3 mb-4">
          <Brain size={32} className="text-purple-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">AI Financial Assistant</h2>
            <p className="text-gray-300 text-sm">Powered by smart analytics</p>
          </div>
        </div>

        {/* Prediction */}
        {prediction.confidence !== 'low' && (
          <div className="p-4 bg-purple-500 bg-opacity-20 rounded-lg border border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Next Month Prediction</p>
                <p className="text-3xl font-bold text-purple-400">
                  {formatCurrency(prediction.prediction)}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Confidence: <span className="capitalize">{prediction.confidence}</span>
                </p>
              </div>
              <div className="text-right">
                <TrendingUp size={48} className={`${prediction.trend === 'increasing' ? 'text-red-400' : 'text-green-400'}`} />
                <p className={`text-sm font-semibold mt-2 ${prediction.trend === 'increasing' ? 'text-red-400' : 'text-green-400'}`}>
                  {prediction.trend === 'increasing' ? '↑' : '↓'} {prediction.trendPercentage}%
                </p>
              </div>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Insights */}
      {insights.length > 0 && (
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={24} className="text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Smart Insights</h3>
          </div>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
                    <p className="text-gray-300 text-sm">{insight.message}</p>
                    {insight.action && (
                      <button
                        onClick={() => handleActionClick(insight.action)} // ✅ CHANGED FROM <p> TO <button>
                        className="text-blue-400 text-sm mt-2 font-medium hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        {insight.action}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Budget Suggestions */}
      {budgetSuggestions.length > 0 && (
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={24} className="text-blue-400" />
            <h3 className="text-xl font-bold text-white">Budget Suggestions</h3>
          </div>
          <div className="space-y-3">
            {budgetSuggestions.slice(0, 3).map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-white bg-opacity-5 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-white">{suggestion.category}</p>
                    <p className="text-sm text-gray-400">
                      Average spending: {formatCurrency(suggestion.averageSpending)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">
                      {formatCurrency(suggestion.suggested)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {suggestion.hasExisting ? 'Update budget' : 'Create budget'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default AIInsights;