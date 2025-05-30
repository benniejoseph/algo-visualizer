'use client';

import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Shuffle,
  Search,
  Route,
  Layers,
  Zap,
  ArrowUpDown,
  Play
} from 'lucide-react';
import Link from 'next/link';

const algorithmCategories = [
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    icon: <ArrowUpDown className="w-8 h-8" />,
    description: 'Arrange data in ascending or descending order',
    algorithms: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort'],
    complexity: 'O(n log n)',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Beginner to Advanced'
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    icon: <Search className="w-8 h-8" />,
    description: 'Find specific elements in data structures',
    algorithms: ['Linear Search', 'Binary Search', 'Hash Search', 'DFS'],
    complexity: 'O(log n)',
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Beginner to Intermediate'
  },
  {
    id: 'graph',
    title: 'Graph Algorithms',
    icon: <Route className="w-8 h-8" />,
    description: 'Traverse and analyze graph structures',
    algorithms: ['BFS', 'DFS', 'Dijkstra', "Kruskal&#39;s"],
    complexity: 'O(V + E)',
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Intermediate to Advanced'
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    icon: <Layers className="w-8 h-8" />,
    description: 'Solve complex problems by breaking them down',
    algorithms: ['Fibonacci', 'Knapsack', 'LCS', 'Coin Change'],
    complexity: 'O(n²)',
    color: 'from-orange-500 to-red-500',
    difficulty: 'Advanced'
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithms',
    icon: <Zap className="w-8 h-8" />,
    description: 'Make locally optimal choices at each step',
    algorithms: ['Activity Selection', 'Fractional Knapsack', 'Huffman'],
    complexity: 'O(n log n)',
    color: 'from-teal-500 to-cyan-500',
    difficulty: 'Intermediate'
  },
  {
    id: 'divide-conquer',
    title: 'Divide & Conquer',
    icon: <Shuffle className="w-8 h-8" />,
    description: 'Break problems into smaller subproblems',
    algorithms: ['Merge Sort', 'Quick Sort', 'Binary Search', 'Strassen'],
    complexity: 'O(n log n)',
    color: 'from-violet-500 to-purple-500',
    difficulty: 'Intermediate to Advanced'
  }
];

const getDifficultyColor = (difficulty: string) => {
  if (difficulty.includes('Beginner')) return 'text-green-400 bg-green-400/10';
  if (difficulty.includes('Advanced')) return 'text-red-400 bg-red-400/10';
  return 'text-yellow-400 bg-yellow-400/10';
};

export default function AlgorithmsPage() {
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
              <h1 className="text-3xl font-bold text-white">Algorithms</h1>
              <p className="text-gray-400">Step-by-step problem-solving procedures</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              <span className="text-purple-300 font-semibold">{algorithmCategories.length}</span> categories available
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
        {/* Algorithm Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithmCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <Link href={`/algorithms/${category.id}`}>
                <motion.div
                  className="group relative p-6 glass-dark rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden border border-white/10 hover:border-white/20 h-full"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(category.difficulty)}`}>
                      {category.difficulty}
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {category.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                      {category.description}
                    </p>
                    
                    {/* Average Complexity */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-gray-500">Average Complexity</span>
                        <span className="font-mono text-purple-300">{category.complexity}</span>
                      </div>
                    </div>
                    
                    {/* Algorithm Examples */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {category.algorithms.slice(0, 3).map((algo) => (
                        <span key={algo} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">
                          {algo}
                        </span>
                      ))}
                      {category.algorithms.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">
                          +{category.algorithms.length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Action Button */}
                    <motion.button
                      className="w-full flex items-center justify-center space-x-2 py-2 bg-white/5 rounded-lg text-sm font-medium text-purple-300 group-hover:bg-white/10 group-hover:text-purple-200 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-4 h-4" />
                      <span>Explore</span>
                    </motion.button>
                  </div>

                  {/* Hover Animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-8 glass-dark rounded-2xl text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">More Algorithms Coming Soon!</h2>
          <p className="text-gray-400 mb-6">
            We're constantly adding new algorithm visualizations and interactive learning experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Backtracking', 'String Algorithms', 'Number Theory', 'Computational Geometry'].map((algo) => (
              <span key={algo} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                {algo}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
} 