'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MemoryVisualizer from './MemoryVisualizer';

interface StackItem {
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

export default function StackVisualizer() {
  const [stack, setStack] = useState<StackItem[]>([
    { id: '0x1000', value: 10, timestamp: Date.now() - 3000 },
    { id: '0x1004', value: 20, timestamp: Date.now() - 2000 },
    { id: '0x1008', value: 30, timestamp: Date.now() - 1000 }
  ]);
  
  const [inputValue, setInputValue] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Generate memory blocks for stack visualization
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
    
    // Add stack items to memory
    stack.forEach((item, index) => {
      usedAddresses.add(item.id);
      blocks.push({
        address: item.id,
        value: item.value,
        type: 'data',
        isActive: index === stack.length - 1, // Top of stack is active
        label: index === stack.length - 1 ? 'TOP' : `Item ${index + 1}`
      });
    });

    // Generate free memory blocks that don't conflict with stack addresses
    const freeAddresses = [];
    
    // Start from a safe base address that won't conflict
    const baseAddr = 0x1100; // Start well above potential stack addresses
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
  }, [stack]);

  // Helper function to generate unique stack item address
  const generateUniqueStackAddress = (): string => {
    const existingAddresses = new Set(stack.map(item => item.id));
    let baseAddr = parseInt(stack[stack.length - 1]?.id || '0x1000', 16) + 4;
    
    while (existingAddresses.has(`0x${baseAddr.toString(16).toUpperCase()}`)) {
      baseAddr += 4;
    }
    
    return `0x${baseAddr.toString(16).toUpperCase()}`;
  };

  const push = async () => {
    if (!inputValue || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStep('Allocating memory for new element...');
    
    const newItem: StackItem = {
      id: generateUniqueStackAddress(),
      value: parseInt(inputValue),
      timestamp: Date.now()
    };

    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Pushing element to top of stack...');
    setStack(prev => [...prev, newItem]);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Push complete!');
    setInputValue('');
    setIsAnimating(false);
    
    setTimeout(() => setCurrentStep(''), 1000);
  };

  const pop = async () => {
    if (stack.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStep('Accessing top element...');
    
    // Highlight the top element
    setStack(prev => prev.map((item, index) => 
      index === prev.length - 1 ? { ...item } : item
    ));
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Removing top element...');
    setStack(prev => prev.slice(0, -1));
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Freeing memory...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Pop complete!');
    setIsAnimating(false);
    
    setTimeout(() => setCurrentStep(''), 1000);
  };

  const peek = async () => {
    if (stack.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    const topValue = stack[stack.length - 1].value;
    
    setCurrentStep(`Top element: ${topValue}`);
    
    // Briefly highlight the top element
    setTimeout(() => {
      setCurrentStep('');
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Push Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-green-400">↑</span> Push
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
              onClick={push}
              disabled={isAnimating || !inputValue}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Push
            </motion.button>
          </div>
        </div>

        {/* Pop Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-400">↓</span> Pop
          </h3>
          <motion.button
            onClick={pop}
            disabled={isAnimating || stack.length === 0}
            className="w-full px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pop
          </motion.button>
        </div>

        {/* Peek Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400">👁</span> Peek
          </h3>
          <motion.button
            onClick={peek}
            disabled={isAnimating || stack.length === 0}
            className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Peek
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

      {/* Stack Visualization */}
      <div className="p-8 glass-dark rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📚</span>
            </div>
            Stack Structure (LIFO)
          </h3>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-300">Stack Item</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-300">Top (Active)</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-center gap-4 min-h-[400px]">
          {/* Stack Base */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm text-gray-400 mb-4">Stack Pointer (SP)</div>
            
            {/* Stack Items */}
            <div className="flex flex-col-reverse gap-2 min-h-[300px] justify-end">
              <AnimatePresence>
                {stack.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: -50 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      delay: index * 0.1 
                    }}
                    className={`
                      relative w-32 h-16 rounded-lg border-2 cursor-pointer
                      ${index === stack.length - 1 
                        ? 'border-yellow-400 bg-gradient-to-r from-yellow-400/30 to-orange-400/30' 
                        : 'border-red-400 bg-gradient-to-r from-red-400/30 to-pink-400/30'}
                    `}
                    whileHover={{ scale: 1.05, rotateX: 10 }}
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: `0 ${(stack.length - index) * 4}px ${(stack.length - index) * 8}px rgba(0,0,0,0.3)`
                    }}
                  >
                    {/* Memory Address */}
                    <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-mono">
                      {item.id}
                    </div>
                    
                    {/* Value */}
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold text-white">{item.value}</div>
                        {index === stack.length - 1 && (
                          <div className="text-xs text-yellow-400 mt-1">TOP</div>
                        )}
                      </div>
                    </div>

                    {/* Stack level indicator */}
                    <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      Level {index + 1}
                    </div>

                    {/* Glow effect for top element */}
                    {index === stack.length - 1 && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                          filter: 'blur(20px)',
                          opacity: 0.4,
                          zIndex: -1,
                        }}
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Stack base */}
              <div className="relative">
                {/* Simple, elegant base platform */}
                <div className="w-40 h-6 bg-gradient-to-b from-slate-600 to-slate-800 rounded-lg border border-slate-500 relative">
                  {/* Subtle top highlight */}
                  <div className="absolute top-0.5 left-2 right-2 h-0.5 bg-slate-400/40 rounded-full"></div>
                  
                  {/* Simple label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs font-medium text-slate-300 tracking-wide">Stack Base</div>
                  </div>
                  
                  {/* Subtle bottom shadow */}
                  <div className="absolute -bottom-1 left-1 right-1 h-1 bg-black/20 rounded-lg blur-sm"></div>
                </div>
              </div>
            </div>

            {/* Stack Pointer Arrow */}
            {stack.length > 0 && (
              <motion.div
                className="flex items-center gap-2 mt-4"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <div className="text-yellow-400 text-2xl">↑</div>
                <div className="text-yellow-400 font-semibold">SP</div>
              </motion.div>
            )}

            {/* Empty stack indicator */}
            {stack.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2 mt-8"
              >
                <div className="text-gray-400 text-lg">Empty Stack</div>
                <div className="text-gray-500 text-sm">Push elements to see them here</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Memory Visualization */}
      <MemoryVisualizer 
        memoryBlocks={memoryBlocks} 
        title="Memory Layout - Stack"
      />

      {/* Complexity Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Push</h4>
          <div className="text-3xl font-bold text-green-400 mb-2">O(1)</div>
          <div className="text-sm text-gray-400">Constant time insertion</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Pop</h4>
          <div className="text-3xl font-bold text-red-400 mb-2">O(1)</div>
          <div className="text-sm text-gray-400">Constant time removal</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Peek</h4>
          <div className="text-3xl font-bold text-blue-400 mb-2">O(1)</div>
          <div className="text-sm text-gray-400">Constant time access</div>
        </div>
      </div>
    </div>
  );
} 