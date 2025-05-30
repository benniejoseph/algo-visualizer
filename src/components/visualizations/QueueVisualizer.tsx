'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MemoryVisualizer from './MemoryVisualizer';

interface QueueItem {
  id: string;
  value: number;
  timestamp: number;
}

interface MemoryBlock {
  address: string;
  value: string | number | null;
  type: 'data' | 'pointer' | 'free';
  isActive?: boolean;
  isHighlighted?: boolean;
  pointsTo?: string;
  label?: string;
}

export default function QueueVisualizer() {
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: '0x2000', value: 10, timestamp: Date.now() - 3000 },
    { id: '0x2004', value: 20, timestamp: Date.now() - 2000 },
    { id: '0x2008', value: 30, timestamp: Date.now() - 1000 }
  ]);
  
  const [inputValue, setInputValue] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Generate memory blocks for queue visualization
  const generateMemoryBlocks = (): MemoryBlock[] => {
    const blocks: MemoryBlock[] = [];
    const usedAddresses = new Set<string>();
    
    // Helper function to generate unique address
    const generateUniqueAddress = (baseAddr: number): string => {
      let addr = `0x${baseAddr.toString(16).toUpperCase()}`;
      while (usedAddresses.has(addr)) {
        baseAddr += 4;
        addr = `0x${baseAddr.toString(16).toUpperCase()}`;
      }
      usedAddresses.add(addr);
      return addr;
    };
    
    // Add queue items to memory
    queue.forEach((item, index) => {
      usedAddresses.add(item.id);
      blocks.push({
        address: item.id,
        value: item.value,
        type: 'data',
        isActive: index === 0, // Front of queue is active for dequeue
        isHighlighted: index === queue.length - 1, // Rear highlighted for enqueue
        label: index === 0 ? 'FRONT' : index === queue.length - 1 ? 'REAR' : `Item ${index + 1}`
      });
    });

    // Generate free memory blocks
    const freeAddresses = [];
    const baseAddr = 0x2100;
    for (let i = 0; i < 6; i++) {
      const addr = generateUniqueAddress(baseAddr + i * 8);
      freeAddresses.push(addr);
    }
    
    freeAddresses.forEach(addr => {
      blocks.push({
        address: addr,
        value: null,
        type: 'free'
      });
    });

    return blocks.sort((a, b) => parseInt(a.address, 16) - parseInt(b.address, 16));
  };

  const [memoryBlocks, setMemoryBlocks] = useState<MemoryBlock[]>(generateMemoryBlocks());

  useEffect(() => {
    setMemoryBlocks(generateMemoryBlocks());
  }, [queue]);

  // Helper function to generate unique queue item address
  const generateUniqueQueueAddress = (): string => {
    const existingAddresses = new Set(queue.map(item => item.id));
    let baseAddr = parseInt(queue[queue.length - 1]?.id || '0x2000', 16) + 4;
    
    while (existingAddresses.has(`0x${baseAddr.toString(16).toUpperCase()}`)) {
      baseAddr += 4;
    }
    
    return `0x${baseAddr.toString(16).toUpperCase()}`;
  };

  const enqueue = async () => {
    if (!inputValue || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStep('Allocating memory for new element...');
    
    const newItem: QueueItem = {
      id: generateUniqueQueueAddress(),
      value: parseInt(inputValue),
      timestamp: Date.now()
    };

    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Adding element to rear of queue...');
    setQueue(prev => [...prev, newItem]);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Enqueue complete!');
    setInputValue('');
    setIsAnimating(false);
    
    setTimeout(() => setCurrentStep(''), 1000);
  };

  const dequeue = async () => {
    if (queue.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStep('Accessing front element...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Removing front element...');
    setQueue(prev => prev.slice(1));
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Freeing memory...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Dequeue complete!');
    setIsAnimating(false);
    
    setTimeout(() => setCurrentStep(''), 1000);
  };

  const front = async () => {
    if (queue.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    const frontValue = queue[0].value;
    
    setCurrentStep(`Front element: ${frontValue}`);
    
    setTimeout(() => {
      setCurrentStep('');
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Enqueue Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-green-400">→</span> Enqueue
          </h3>
          <div className="flex gap-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isAnimating}
            />
            <motion.button
              onClick={enqueue}
              disabled={isAnimating || !inputValue}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enqueue
            </motion.button>
          </div>
        </div>

        {/* Dequeue Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-400">←</span> Dequeue
          </h3>
          <motion.button
            onClick={dequeue}
            disabled={isAnimating || queue.length === 0}
            className="w-full px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dequeue
          </motion.button>
        </div>

        {/* Front Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400">👁</span> Front
          </h3>
          <motion.button
            onClick={front}
            disabled={isAnimating || queue.length === 0}
            className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Front
          </motion.button>
        </div>
      </div>

      {/* Status */}
      {currentStep && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 glass-dark rounded-xl border-l-4 border-purple-500"
        >
          <div className="text-white font-medium">{currentStep}</div>
        </motion.div>
      )}

      {/* Queue Visualization */}
      <div className="p-8 glass-dark rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📥</span>
            </div>
            Queue Structure (FIFO)
          </h3>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-300">Front (Dequeue)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-300">Rear (Enqueue)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[300px] py-8">
          {/* Front Pointer */}
          <div className="flex flex-col items-center gap-2 mr-6">
            <div className="text-sm text-gray-400">FRONT</div>
            <motion.div 
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              PTR
            </motion.div>
          </div>

          {/* Queue Items */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <AnimatePresence>
              {queue.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, x: -50 }}
                  animate={{ scale: 1, x: 0 }}
                  exit={{ scale: 0, x: -50 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    delay: index * 0.1 
                  }}
                  className={`
                    relative w-24 h-24 rounded-lg border-2 cursor-pointer
                    ${index === 0 
                      ? 'border-green-400 bg-gradient-to-r from-green-400/30 to-emerald-400/30' 
                      : index === queue.length - 1
                      ? 'border-blue-400 bg-gradient-to-r from-blue-400/30 to-indigo-400/30'
                      : 'border-gray-400 bg-gradient-to-r from-gray-400/30 to-gray-500/30'}
                  `}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Memory Address */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 font-mono">
                    {item.id}
                  </div>
                  
                  {/* Value */}
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{item.value}</div>
                      {index === 0 && (
                        <div className="text-xs text-green-400 mt-1">FRONT</div>
                      )}
                      {index === queue.length - 1 && (
                        <div className="text-xs text-blue-400 mt-1">REAR</div>
                      )}
                    </div>
                  </div>

                  {/* Position indicator */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                    Pos {index + 1}
                  </div>

                  {/* Glow effect for front/rear */}
                  {(index === 0 || index === queue.length - 1) && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: index === 0 ? 
                          'linear-gradient(45deg, #10b981, #059669)' :
                          'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                        filter: 'blur(15px)',
                        opacity: 0.3,
                        zIndex: -1,
                      }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty queue indicator */}
            {queue.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2 py-8"
              >
                <div className="text-gray-400 text-lg">Empty Queue</div>
                <div className="text-gray-500 text-sm">Enqueue elements to see them here</div>
              </motion.div>
            )}
          </div>

          {/* Rear Pointer */}
          <div className="flex flex-col items-center gap-2 ml-6">
            <div className="text-sm text-gray-400">REAR</div>
            <motion.div 
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            >
              PTR
            </motion.div>
          </div>
        </div>

        {/* Flow indicators */}
        <div className="flex justify-between items-center mt-8 px-4">
          <motion.div 
            className="flex items-center gap-2 text-red-400"
            animate={{ x: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-2xl">←</span>
            <span className="font-semibold">Dequeue (Remove)</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 text-green-400"
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="font-semibold">Enqueue (Add)</span>
            <span className="text-2xl">→</span>
          </motion.div>
        </div>
      </div>

      {/* Memory Visualization */}
      <MemoryVisualizer 
        memoryBlocks={memoryBlocks} 
        title="Memory Layout - Queue"
      />

      {/* Complexity Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Enqueue</h4>
          <div className="text-3xl font-bold text-green-400 mb-2">O(1)</div>
          <div className="text-sm text-gray-400">Constant time addition</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Dequeue</h4>
          <div className="text-3xl font-bold text-red-400 mb-2">O(1)</div>
          <div className="text-sm text-gray-400">Constant time removal</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Front</h4>
          <div className="text-3xl font-bold text-blue-400 mb-2">O(1)</div>
          <div className="text-sm text-gray-400">Constant time access</div>
        </div>
      </div>
    </div>
  );
} 