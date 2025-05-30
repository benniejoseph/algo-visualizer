'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface MemoryBlock {
  address: string;
  value: string | number | null;
  type: 'data' | 'pointer' | 'free';
  isActive?: boolean;
  isHighlighted?: boolean;
  pointsTo?: string;
  label?: string;
}

interface MemoryVisualizerProps {
  memoryBlocks: MemoryBlock[];
  title?: string;
  className?: string;
}

export default function MemoryVisualizer({ memoryBlocks, title = "Memory Layout", className = "" }: MemoryVisualizerProps) {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  const getBlockColor = (block: MemoryBlock) => {
    if (block.isHighlighted) return 'from-yellow-400 to-orange-400';
    if (block.isActive) return 'from-green-400 to-emerald-400';
    if (block.type === 'data') return 'from-blue-400 to-indigo-400';
    if (block.type === 'pointer') return 'from-purple-400 to-pink-400';
    return 'from-gray-600 to-gray-700';
  };

  const getTextColor = (block: MemoryBlock) => {
    if (block.type === 'free') return 'text-gray-400';
    return 'text-white';
  };

  return (
    <div className={`p-6 glass-dark rounded-xl ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🧠</span>
          </div>
          {title}
        </h3>
        
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded"></div>
            <span className="text-gray-300">Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded"></div>
            <span className="text-gray-300">Pointer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded"></div>
            <span className="text-gray-300">Free</span>
          </div>
        </div>
      </div>

      {/* Memory Grid */}
      <div className="grid grid-cols-8 gap-2 mb-6">
        <AnimatePresence>
          {memoryBlocks.map((block, index) => (
            <motion.div
              key={block.address}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="relative"
              onMouseEnter={() => setHoveredBlock(block.address)}
              onMouseLeave={() => setHoveredBlock(null)}
            >
              <motion.div
                className={`
                  relative p-3 rounded-lg border border-white/20 cursor-pointer
                  bg-gradient-to-br ${getBlockColor(block)}
                  transition-all duration-300 hover:scale-105 hover:shadow-lg
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Address */}
                <div className="text-xs font-mono text-white/80 mb-1">
                  {block.address}
                </div>
                
                {/* Value */}
                <div className={`text-sm font-bold ${getTextColor(block)} text-center`}>
                  {block.type === 'free' ? '---' : 
                   block.type === 'pointer' ? '→' : 
                   block.value}
                </div>

                {/* Label */}
                {block.label && (
                  <div className="text-xs text-white/60 mt-1 text-center">
                    {block.label}
                  </div>
                )}

                {/* Pointer Arrow */}
                {block.type === 'pointer' && block.pointsTo && (
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="text-white text-xs">→</span>
                  </motion.div>
                )}

                {/* Glow effect for active blocks */}
                {(block.isActive || block.isHighlighted) && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `linear-gradient(45deg, ${
                        block.isHighlighted ? '#fbbf24, #f59e0b' : '#10b981, #059669'
                      })`,
                      filter: 'blur(8px)',
                      opacity: 0.3,
                      zIndex: -1,
                    }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredBlock === block.address && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-50 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-2 rounded-lg text-xs whitespace-nowrap border border-white/20"
                  >
                    <div>Address: {block.address}</div>
                    <div>Type: {block.type}</div>
                    <div>Value: {block.type === 'free' ? 'Unallocated' : block.value}</div>
                    {block.pointsTo && <div>Points to: {block.pointsTo}</div>}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Memory Statistics */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 glass rounded-lg">
          <div className="text-sm text-gray-400">Used Memory</div>
          <div className="text-lg font-bold text-blue-400">
            {memoryBlocks.filter(b => b.type !== 'free').length} blocks
          </div>
        </div>
        
        <div className="text-center p-3 glass rounded-lg">
          <div className="text-sm text-gray-400">Free Memory</div>
          <div className="text-lg font-bold text-gray-400">
            {memoryBlocks.filter(b => b.type === 'free').length} blocks
          </div>
        </div>
        
        <div className="text-center p-3 glass rounded-lg">
          <div className="text-sm text-gray-400">Fragmentation</div>
          <div className="text-lg font-bold text-purple-400">
            {Math.round((memoryBlocks.filter(b => b.type === 'free').length / memoryBlocks.length) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
} 