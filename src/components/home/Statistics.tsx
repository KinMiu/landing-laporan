import React from 'react';
import { motion } from 'framer-motion';

interface StatisticsProps {
  statistics: Array<{
    id: number;
    name: string;
    value: string;
  }>;
}

const Statistics = ({ statistics }: StatisticsProps) => {
  return (
    <div className="mt-- sm:mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 px-4 md:px-20 lg:px-32">
      {statistics.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          {/* Mobile: Menggunakan Card */}
          <div className="block lg:hidden bg-white shadow-md rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
            <div className="mt-1 text-sm text-gray-600">{stat.name}</div>
          </div>

          {/* Desktop: Tanpa Card */}
          <div className="hidden lg:flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-900">{stat.value}</div>
            <div className="mt-1 text-base text-gray-600">{stat.name}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Statistics;
