'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Trophy,
  Star,
  Lock,
  CheckCircle,
  PlayCircle,
  Target,
  Zap,
  Brain
} from 'lucide-react';
import Link from 'next/link';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  completed: boolean;
  locked: boolean;
  category: string;
  estimatedTime: string;
}

const challenges: Challenge[] = [
  {
    id: 'array-basics',
    title: 'Array Fundamentals',
    description: 'Learn the basics of array operations and indexing',
    difficulty: 'Easy',
    points: 100,
    completed: true,
    locked: false,
    category: 'Data Structures',
    estimatedTime: '15 min'
  },
  {
    id: 'linear-search',
    title: 'Linear Search Challenge',
    description: 'Implement and optimize linear search algorithm',
    difficulty: 'Easy',
    points: 150,
    completed: true,
    locked: false,
    category: 'Algorithms',
    estimatedTime: '20 min'
  },
  {
    id: 'binary-search',
    title: 'Binary Search Mastery',
    description: 'Master the binary search algorithm and its variants',
    difficulty: 'Medium',
    points: 250,
    completed: false,
    locked: false,
    category: 'Algorithms',
    estimatedTime: '30 min'
  },
  {
    id: 'sorting-basics',
    title: 'Sorting Fundamentals',
    description: 'Compare and implement basic sorting algorithms',
    difficulty: 'Medium',
    points: 300,
    completed: false,
    locked: false,
    category: 'Algorithms',
    estimatedTime: '45 min'
  },
  {
    id: 'linked-lists',
    title: 'Linked List Adventures',
    description: 'Build and manipulate linked list data structures',
    difficulty: 'Medium',
    points: 200,
    completed: false,
    locked: true,
    category: 'Data Structures',
    estimatedTime: '35 min'
  },
  {
    id: 'tree-traversal',
    title: 'Tree Traversal Quest',
    description: 'Navigate through tree structures using different methods',
    difficulty: 'Hard',
    points: 400,
    completed: false,
    locked: true,
    category: 'Data Structures',
    estimatedTime: '60 min'
  },
  {
    id: 'graph-algorithms',
    title: 'Graph Algorithm Challenge',
    description: 'Implement BFS, DFS and pathfinding algorithms',
    difficulty: 'Hard',
    points: 500,
    completed: false,
    locked: true,
    category: 'Algorithms',
    estimatedTime: '90 min'
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming Master',
    description: 'Solve complex problems using dynamic programming',
    difficulty: 'Hard',
    points: 600,
    completed: false,
    locked: true,
    category: 'Advanced',
    estimatedTime: '120 min'
  }
];

const achievements = [
  { name: 'First Steps', description: 'Complete your first challenge', icon: '🎯' },
  { name: 'Array Expert', description: 'Master all array challenges', icon: '📊' },
  { name: 'Algorithm Ninja', description: 'Complete 5 algorithm challenges', icon: '⚡' },
  { name: 'Speed Demon', description: 'Complete a challenge in under 10 minutes', icon: '🚀' },
  { name: 'Perfectionist', description: 'Get 100% on all easy challenges', icon: '💯' }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'text-green-400 bg-green-400/10';
    case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
    case 'Hard': return 'text-red-400 bg-red-400/10';
    default: return 'text-gray-400 bg-gray-400/10';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Data Structures': return 'bg-blue-500/20 text-blue-300';
    case 'Algorithms': return 'bg-purple-500/20 text-purple-300';
    case 'Advanced': return 'bg-red-500/20 text-red-300';
    default: return 'bg-gray-500/20 text-gray-300';
  }
};

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const totalPoints = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);
  const completedChallenges = challenges.filter(c => c.completed).length;
  const categories = ['All', 'Data Structures', 'Algorithms', 'Advanced'];

  const filteredChallenges = selectedCategory === 'All' 
    ? challenges 
    : challenges.filter(c => c.category === selectedCategory);

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
              <h1 className="text-3xl font-bold text-white">Interactive Learning</h1>
              <p className="text-gray-400">Gamified challenges and tutorials</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center space-x-1 text-yellow-400">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">{totalPoints}</span>
              </div>
              <p className="text-xs text-gray-400">Points</p>
            </div>
            <div className="text-center">
              <div className="flex items-center space-x-1 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">{completedChallenges}</span>
              </div>
              <p className="text-xs text-gray-400">Completed</p>
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
        {/* Progress Overview */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 p-6 glass-dark rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Learning Progress</h2>
            <div className="text-sm text-gray-400">
              {completedChallenges} of {challenges.length} challenges completed
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedChallenges / challenges.length) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 glass rounded-xl">
              <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{completedChallenges}</div>
              <div className="text-sm text-gray-400">Challenges Complete</div>
            </div>
            <div className="text-center p-4 glass rounded-xl">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalPoints}</div>
              <div className="text-sm text-gray-400">Total Points</div>
            </div>
            <div className="text-center p-4 glass rounded-xl">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {Math.round((completedChallenges / challenges.length) * 100)}%
              </div>
              <div className="text-sm text-gray-400">Completion Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'glass-dark text-gray-300 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`relative p-6 glass-dark rounded-xl border transition-all duration-300 ${
                challenge.locked
                  ? 'border-gray-600 opacity-60'
                  : challenge.completed
                  ? 'border-green-500/50 hover:border-green-500'
                  : 'border-white/10 hover:border-purple-500/50'
              }`}
            >
              {challenge.locked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
              )}
              
              {challenge.completed && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              )}

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(challenge.category)}`}>
                    {challenge.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{challenge.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="w-4 h-4" />
                    <span>{challenge.points} pts</span>
                  </div>
                  <div className="text-gray-500">
                    {challenge.estimatedTime}
                  </div>
                </div>
              </div>

              <button
                disabled={challenge.locked}
                className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg font-medium transition-all duration-300 ${
                  challenge.locked
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : challenge.completed
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {challenge.locked ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Locked</span>
                  </>
                ) : challenge.completed ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    <span>Start Challenge</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-6 glass-dark rounded-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Achievements</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 glass rounded-lg"
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h3 className="font-semibold text-white">{achievement.name}</h3>
                  <p className="text-xs text-gray-400">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
} 