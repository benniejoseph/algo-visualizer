'use client';

import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Box,
  List,
  TreePine,
  Network,
  Hash,
  Layers3,
  Play
} from 'lucide-react';
import Link from 'next/link';

const dataStructures = [
  {
    id: 'array',
    title: 'Arrays',
    icon: <Box className="w-8 h-8" />,
    description: 'Linear collection of elements stored at contiguous memory locations',
    complexity: {
      access: 'O(1)',
      search: 'O(n)',
      insertion: 'O(n)',
      deletion: 'O(n)'
    },
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Beginner',
    operations: ['Access', 'Traverse', 'Insert', 'Delete', 'Sort']
  },
  {
    id: 'linked-list',
    title: 'Linked Lists',
    icon: <List className="w-8 h-8" />,
    description: 'Linear data structure where elements are stored in nodes with pointers',
    complexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Beginner',
    operations: ['Traverse', 'Insert', 'Delete', 'Reverse', 'Merge']
  },
  {
    id: 'stack',
    title: 'Stacks',
    icon: <Layers3 className="w-8 h-8" />,
    description: 'LIFO (Last In First Out) data structure with push and pop operations',
    complexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Beginner',
    operations: ['Push', 'Pop', 'Peek', 'IsEmpty', 'Size']
  },
  {
    id: 'queue',
    title: 'Queues',
    icon: <List className="w-8 h-8 rotate-90" />,
    description: 'FIFO (First In First Out) data structure with enqueue and dequeue operations',
    complexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    color: 'from-orange-500 to-red-500',
    difficulty: 'Beginner',
    operations: ['Enqueue', 'Dequeue', 'Front', 'Rear', 'IsEmpty']
  },
  {
    id: 'binary-tree',
    title: 'Binary Trees',
    icon: <TreePine className="w-8 h-8" />,
    description: 'Hierarchical data structure with nodes having at most two children',
    complexity: {
      access: 'O(log n)',
      search: 'O(log n)',
      insertion: 'O(log n)',
      deletion: 'O(log n)'
    },
    color: 'from-teal-500 to-cyan-500',
    difficulty: 'Intermediate',
    operations: ['Insert', 'Delete', 'Search', 'Traverse', 'Balance']
  },
  {
    id: 'graph',
    title: 'Graphs',
    icon: <Network className="w-8 h-8" />,
    description: 'Non-linear data structure consisting of vertices and edges',
    complexity: {
      access: 'O(V + E)',
      search: 'O(V + E)',
      insertion: 'O(1)',
      deletion: 'O(V + E)'
    },
    color: 'from-violet-500 to-purple-500',
    difficulty: 'Advanced',
    operations: ['BFS', 'DFS', 'Add Vertex', 'Add Edge', 'Find Path']
  },
  {
    id: 'hash-table',
    title: 'Hash Tables',
    icon: <Hash className="w-8 h-8" />,
    description: 'Data structure that implements associative array using hash function',
    complexity: {
      access: 'O(1)',
      search: 'O(1)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    color: 'from-amber-500 to-orange-500',
    difficulty: 'Intermediate',
    operations: ['Insert', 'Delete', 'Search', 'Hash', 'Resize']
  },
  {
    id: 'heap',
    title: 'Heaps',
    icon: <TreePine className="w-8 h-8 scale-x-[-1]" />,
    description: 'Complete binary tree that satisfies the heap property',
    complexity: {
      access: 'O(1)',
      search: 'O(n)',
      insertion: 'O(log n)',
      deletion: 'O(log n)'
    },
    color: 'from-rose-500 to-pink-500',
    difficulty: 'Intermediate',
    operations: ['Insert', 'Extract', 'Peek', 'Heapify', 'Build']
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'text-green-400 bg-green-400/10';
    case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
    case 'Advanced': return 'text-red-400 bg-red-400/10';
    default: return 'text-gray-400 bg-gray-400/10';
  }
};

export default function DataStructuresPage() {
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
              <h1 className="text-3xl font-bold text-white">Data Structures</h1>
              <p className="text-gray-400">Interactive visualizations and learning</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              <span className="text-purple-300 font-semibold">{dataStructures.length}</span> structures available
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
        {/* Grid of Data Structures */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dataStructures.map((structure, index) => (
            <motion.div
              key={structure.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <Link href={`/data-structures/${structure.id}`}>
                <motion.div
                  className="group relative p-6 glass-dark rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden border border-white/10 hover:border-white/20"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${structure.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(structure.difficulty)}`}>
                      {structure.difficulty}
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${structure.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {structure.icon}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {structure.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                      {structure.description}
                    </p>
                    
                    {/* Complexity Overview */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Access</span>
                        <span className="font-mono text-purple-300">{structure.complexity.access}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Search</span>
                        <span className="font-mono text-purple-300">{structure.complexity.search}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Insert</span>
                        <span className="font-mono text-green-300">{structure.complexity.insertion}</span>
                      </div>
                    </div>
                    
                    {/* Operations */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {structure.operations.slice(0, 3).map((op) => (
                        <span key={op} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">
                          {op}
                        </span>
                      ))}
                      {structure.operations.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">
                          +{structure.operations.length - 3}
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
                      <span>Visualize</span>
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
      </motion.main>
    </div>
  );
} 