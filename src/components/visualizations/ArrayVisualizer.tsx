'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCcw, 
  Plus, 
  Minus, 
  Search,
  Shuffle,
  ArrowUp
} from 'lucide-react';

interface ArrayElement {
  value: number;
  id: string;
  isActive?: boolean;
  isComparing?: boolean;
  isFound?: boolean;
  isSwapping?: boolean;
}

interface Operation {
  name: string;
  complexity: string;
  description: string;
}

const operations: Operation[] = [
  { name: 'Access', complexity: 'O(1)', description: 'Direct access by index' },
  { name: 'Search', complexity: 'O(n)', description: 'Linear search through elements' },
  { name: 'Insert', complexity: 'O(n)', description: 'Insert at specific position' },
  { name: 'Delete', complexity: 'O(n)', description: 'Remove element and shift' },
  { name: 'Sort', complexity: 'O(n log n)', description: 'Sort using efficient algorithm' }
];

export default function ArrayVisualizer() {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [operationSteps, setOperationSteps] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [insertValue, setInsertValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [animationSpeed, setAnimationSpeed] = useState(1000);

  // Initialize array
  const initializeArray = useCallback(() => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < 8; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) + 1,
        id: `element-${i}`,
      });
    }
    setArray(newArray);
    setCurrentOperation('');
    setOperationSteps(0);
  }, []);

  useEffect(() => {
    initializeArray();
  }, [initializeArray]);

  // Access operation
  const accessElement = async (index: number) => {
    if (index < 0 || index >= array.length) return;
    
    setCurrentOperation('Access');
    setOperationSteps(0);
    
    // Highlight the accessed element
    const newArray = array.map((el, i) => ({
      ...el,
      isActive: i === index,
      isComparing: false,
      isFound: false
    }));
    
    setArray(newArray);
    setOperationSteps(1);
    
    setTimeout(() => {
      setArray(prev => prev.map(el => ({ ...el, isActive: false })));
      setCurrentOperation('');
    }, 2000);
  };

  // Linear search
  const searchElement = async () => {
    if (!searchValue) return;
    
    const target = parseInt(searchValue);
    setCurrentOperation('Search');
    setIsPlaying(true);
    setOperationSteps(0);
    
    for (let i = 0; i < array.length; i++) {
      setOperationSteps(i + 1);
      
      // Highlight current element being checked
      const newArray = array.map((el, index) => ({
        ...el,
        isActive: index === i,
        isComparing: index === i,
        isFound: index === i && el.value === target
      }));
      
      setArray(newArray);
      
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      
      if (array[i].value === target) {
        setArray(prev => prev.map((el, index) => ({
          ...el,
          isActive: false,
          isComparing: false,
          isFound: index === i
        })));
        break;
      }
    }
    
    setIsPlaying(false);
    setTimeout(() => {
      setArray(prev => prev.map(el => ({ 
        ...el, 
        isActive: false, 
        isComparing: false, 
        isFound: false 
      })));
      setCurrentOperation('');
    }, 2000);
  };

  // Insert element
  const insertElement = () => {
    if (!insertValue || !insertIndex) return;
    
    const value = parseInt(insertValue);
    const index = parseInt(insertIndex);
    
    if (index < 0 || index > array.length) return;
    
    setCurrentOperation('Insert');
    setOperationSteps(array.length - index);
    
    const newElement: ArrayElement = {
      value,
      id: `element-${Date.now()}`,
      isActive: true
    };
    
    const newArray = [...array];
    newArray.splice(index, 0, newElement);
    
    setArray(newArray);
    
    setTimeout(() => {
      setArray(prev => prev.map(el => ({ ...el, isActive: false })));
      setCurrentOperation('');
      setInsertValue('');
      setInsertIndex('');
    }, 2000);
  };

  // Delete element
  const deleteElement = (index: number) => {
    if (index < 0 || index >= array.length) return;
    
    setCurrentOperation('Delete');
    setOperationSteps(array.length - index - 1);
    
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
    
    setTimeout(() => {
      setCurrentOperation('');
    }, 1000);
  };

  // Bubble sort with visualization
  const sortArray = async () => {
    setCurrentOperation('Sort (Bubble Sort)');
    setIsPlaying(true);
    setOperationSteps(0);
    
    const arr = [...array];
    let steps = 0;
    
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        steps++;
        setOperationSteps(steps);
        
        // Highlight elements being compared
        setArray(prev => prev.map((el, index) => ({
          ...el,
          isComparing: index === j || index === j + 1,
          isActive: false
        })));
        
        await new Promise(resolve => setTimeout(resolve, animationSpeed / 2));
        
        if (arr[j].value > arr[j + 1].value) {
          // Swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          
          setArray([...arr].map((el, index) => ({
            ...el,
            isSwapping: index === j || index === j + 1,
            isComparing: false
          })));
          
          await new Promise(resolve => setTimeout(resolve, animationSpeed / 2));
        }
      }
    }
    
    setArray(arr.map(el => ({ ...el, isComparing: false, isSwapping: false })));
    setIsPlaying(false);
  };

  // Shuffle array
  const shuffleArray = () => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setArray(shuffled);
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 p-6 glass-dark rounded-xl">
        <div className="flex items-center space-x-2">
          <button
            onClick={initializeArray}
            disabled={isPlaying}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          
          <button
            onClick={shuffleArray}
            disabled={isPlaying}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span>Shuffle</span>
          </button>
          
          <button
            onClick={sortArray}
            disabled={isPlaying}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Sort</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Search value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 w-32"
          />
          <button
            onClick={searchElement}
            disabled={isPlaying || !searchValue}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Value"
            value={insertValue}
            onChange={(e) => setInsertValue(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 w-20"
          />
          <input
            type="number"
            placeholder="Index"
            value={insertIndex}
            onChange={(e) => setInsertIndex(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 w-20"
          />
          <button
            onClick={insertElement}
            disabled={isPlaying || !insertValue || !insertIndex}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Insert</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-gray-300 text-sm">Speed:</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            className="w-20"
          />
          <span className="text-gray-300 text-sm">{animationSpeed}ms</span>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="p-6 glass-dark rounded-xl">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <AnimatePresence>
            {array.map((element, index) => (
              <motion.div
                key={element.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  backgroundColor: element.isActive 
                    ? '#10b981' 
                    : element.isComparing 
                    ? '#f59e0b' 
                    : element.isFound 
                    ? '#06d6a0' 
                    : element.isSwapping 
                    ? '#ef4444' 
                    : '#6366f1'
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col items-center cursor-pointer"
                onClick={() => accessElement(index)}
              >
                <motion.div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {element.value}
                </motion.div>
                
                <div className="mt-2 text-xs text-gray-400">
                  [{index}]
                </div>
                
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(index);
                  }}
                  disabled={isPlaying}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white text-xs transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Operation Status */}
        {currentOperation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <div className="text-purple-300 font-semibold">
              Current Operation: {currentOperation}
            </div>
            <div className="text-gray-400 text-sm">
              Steps: {operationSteps}
            </div>
            {isPlaying && (
              <div className="flex items-center justify-center space-x-2 text-yellow-400">
                <div className="animate-spin w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
                <span>Processing...</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Complexity Information */}
      <div className="grid md:grid-cols-5 gap-4">
        {operations.map((op) => (
          <motion.div
            key={op.name}
            className="p-4 glass rounded-xl text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-semibold text-white mb-1">{op.name}</h3>
            <div className="text-2xl font-bold text-purple-300 mb-2">
              {op.complexity}
            </div>
            <p className="text-xs text-gray-400">{op.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 