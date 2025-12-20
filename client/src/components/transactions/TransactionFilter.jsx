import React from 'react';
import { Search, Filter } from 'lucide-react';

const TransactionFilter = ({ searchTerm, setSearchTerm, filterType, setFilterType }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all" className="bg-gray-800">All Types</option>
          <option value="income" className="bg-gray-800">Income Only</option>
          <option value="expense" className="bg-gray-800">Expense Only</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionFilter;