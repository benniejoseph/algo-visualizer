'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  BarChart3,
  Clock,
  Database
} from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const complexityData = [
  { n: 1, 'O(1)': 1, 'O(log n)': 1, 'O(n)': 1, 'O(n log n)': 1, 'O(n²)': 1, 'O(2^n)': 2 },
  { n: 2, 'O(1)': 1, 'O(log n)': 1, 'O(n)': 2, 'O(n log n)': 2, 'O(n²)': 4, 'O(2^n)': 4 },
  { n: 4, 'O(1)': 1, 'O(log n)': 2, 'O(n)': 4, 'O(n log n)': 8, 'O(n²)': 16, 'O(2^n)': 16 },
  { n: 8, 'O(1)': 1, 'O(log n)': 3, 'O(n)': 8, 'O(n log n)': 24, 'O(n²)': 64, 'O(2^n)': 256 },
  { n: 16, 'O(1)': 1, 'O(log n)': 4, 'O(n)': 16, 'O(n log n)': 64, 'O(n²)': 256, 'O(2^n)': 65536 },
  { n: 32, 'O(1)': 1, 'O(log n)': 5, 'O(n)': 32, 'O(n log n)': 160, 'O(n²)': 1024, 'O(2^n)': 4294967296 },
];

const complexityTypes = [
  {
    notation: 'O(1)',
    name: 'Constant',
    description: 'Execution time remains constant regardless of input size',
    examples: ['Array access', 'Hash table lookup', 'Stack push/pop'],
    color: '#10b981',
    efficiency: 'Excellent'
  },
  {
    notation: 'O(log n)',
    name: 'Logarithmic',
    description: 'Execution time grows logarithmically with input size',
    examples: ['Binary search', 'Binary tree operations', 'Priority queue'],
    color: '#06d6a0',
    efficiency: 'Very Good'
  },
  {
    notation: 'O(n)',
    name: 'Linear',
    description: 'Execution time grows linearly with input size',
    examples: ['Linear search', 'Array traversal', 'Single loop'],
    color: '#ffd166',
    efficiency: 'Good'
  },
  {
    notation: 'O(n log n)',
    name: 'Linearithmic',
    description: 'Common in efficient sorting algorithms',
    examples: ['Merge sort', 'Quick sort', 'Heap sort'],
    color: '#f77f00',
    efficiency: 'Fair'
  },
  {
    notation: 'O(n²)',
    name: 'Quadratic',
    description: 'Execution time grows quadratically with input size',
    examples: ['Bubble sort', 'Selection sort', 'Nested loops'],
    color: '#d62828',
    efficiency: 'Poor'
  },
  {
    notation: 'O(2^n)',
    name: 'Exponential',
    description: 'Execution time doubles with each additional input',
    examples: ['Recursive fibonacci', 'Subset generation', 'Tower of Hanoi'],
    color: '#6f1e51',
    efficiency: 'Very Poor'
  }
];

const spaceComplexityExamples = [
  {
    algorithm: 'Bubble Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'In-place sorting with constant extra space'
  },
  {
    algorithm: 'Merge Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Efficient sorting but requires additional space'
  },
  {
    algorithm: 'Quick Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'In-place with logarithmic stack space'
  },
  {
    algorithm: 'Binary Search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Iterative version uses constant space'
  }
];

export default function ComplexityPage() {
  const [selectedComplexity, setSelectedComplexity] = useState<string | null>(null);
  const [inputSize, setInputSize] = useState(16);

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <motion.header 
        className="relative z-10 p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <motion.button 
                className="p-2 glass-dark rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-6 h-6 text-purple-300" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Complexity Analysis</h1>
              <p className="text-gray-400">Understanding time and space complexity</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Input Size: <span className="text-purple-300 font-semibold">{inputSize}</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        className="max-w-7xl mx-auto px-6 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Complexity Visualization Chart */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12 p-6 glass-dark rounded-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Growth Rate Comparison</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-gray-300 text-sm">Input Size (n):</label>
              <input
                type="range"
                min="1"
                max="32"
                value={inputSize}
                onChange={(e) => setInputSize(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-purple-300 font-mono">{inputSize}</span>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complexityData.filter(d => d.n <= inputSize)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="n" 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af' }}
                  scale="log"
                  domain={['dataMin', 'dataMax']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f3f4f6'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="O(1)" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="O(log n)" stroke="#06d6a0" strokeWidth={2} />
                <Line type="monotone" dataKey="O(n)" stroke="#ffd166" strokeWidth={2} />
                <Line type="monotone" dataKey="O(n log n)" stroke="#f77f00" strokeWidth={2} />
                <Line type="monotone" dataKey="O(n²)" stroke="#d62828" strokeWidth={2} />
                <Line type="monotone" dataKey="O(2^n)" stroke="#6f1e51" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Complexity Types Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Complexity Types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complexityTypes.map((type, index) => (
              <motion.div
                key={type.notation}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`p-4 glass-dark rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedComplexity === type.notation ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setSelectedComplexity(selectedComplexity === type.notation ? null : type.notation)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{type.notation}</h3>
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: type.color }}
                  ></div>
                </div>
                
                <h4 className="text-purple-300 font-semibold mb-2">{type.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{type.description}</p>
                
                <div className="mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    type.efficiency === 'Excellent' ? 'bg-green-500/20 text-green-300' :
                    type.efficiency === 'Very Good' ? 'bg-emerald-500/20 text-emerald-300' :
                    type.efficiency === 'Good' ? 'bg-yellow-500/20 text-yellow-300' :
                    type.efficiency === 'Fair' ? 'bg-orange-500/20 text-orange-300' :
                    type.efficiency === 'Poor' ? 'bg-red-500/20 text-red-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {type.efficiency}
                  </span>
                </div>
                
                {selectedComplexity === type.notation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-white/10 pt-3"
                  >
                    <h5 className="text-sm font-semibold text-white mb-2">Examples:</h5>
                    <div className="space-y-1">
                      {type.examples.map((example) => (
                        <div key={example} className="text-xs text-gray-300">
                          • {example}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Time vs Space Complexity */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Database className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Time vs Space Complexity</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Time Complexity</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Measures how the execution time of an algorithm changes with the size of the input data.
              </p>
              <div className="space-y-2">
                <div className="text-xs text-gray-400">• Best Case: Minimum time required</div>
                <div className="text-xs text-gray-400">• Average Case: Expected time</div>
                <div className="text-xs text-gray-400">• Worst Case: Maximum time required</div>
              </div>
            </div>
            
            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Space Complexity</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Measures how much additional memory space an algorithm needs relative to the input size.
              </p>
              <div className="space-y-2">
                <div className="text-xs text-gray-400">• Auxiliary Space: Extra space used</div>
                <div className="text-xs text-gray-400">• Input Space: Space for input data</div>
                <div className="text-xs text-gray-400">• Total Space: Auxiliary + Input</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Algorithm Examples */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Algorithm Complexity Examples</h2>
          <div className="space-y-4">
            {spaceComplexityExamples.map((example, index) => (
              <motion.div
                key={example.algorithm}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="p-4 glass-dark rounded-xl"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-2 md:mb-0">
                    <h3 className="text-lg font-semibold text-white">{example.algorithm}</h3>
                    <p className="text-gray-400 text-sm">{example.description}</p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Time</div>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded font-mono text-sm">
                        {example.timeComplexity}
                      </span>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Space</div>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded font-mono text-sm">
                        {example.spaceComplexity}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
} 