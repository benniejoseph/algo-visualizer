'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Code2, 
  Zap, 
  Brain, 
  Trophy, 
  Target, 
  Layers,
  Clock,
  BarChart3,
  PlayCircle,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Data Structures",
    description: "Interactive visualization of arrays, linked lists, trees, graphs, and more",
    path: "/data-structures",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Algorithms",
    description: "Step-by-step visualization of sorting, searching, and graph algorithms",
    path: "/algorithms",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Complexity Analysis",
    description: "Visual time and space complexity analysis with real-time graphs",
    path: "/complexity",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Interactive Learning",
    description: "Hands-on coding challenges with immediate visual feedback",
    path: "/learn",
    color: "from-orange-500 to-red-500"
  }
];

const stats = [
  { icon: <Trophy className="w-6 h-6" />, label: "Achievements", value: "0" },
  { icon: <Target className="w-6 h-6" />, label: "Problems Solved", value: "0" },
  { icon: <Clock className="w-6 h-6" />, label: "Study Time", value: "0h" },
];

interface Particle {
  id: number;
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  duration: number;
}

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Generate particles only on client side
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      duration: Math.random() * 10 + 10,
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20"
            initial={{ 
              x: particle.initialX, 
              y: particle.initialY
            }}
            animate={{
              x: particle.targetX,
              y: particle.targetY,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 p-6 glass-dark rounded-b-3xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AlgoViz
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-center justify-center space-x-1 text-purple-300">
                  {stat.icon}
                  <span className="font-bold">{stat.value}</span>
                </div>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">Gamified Learning Experience</span>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Master Algorithms
            <br />
            <span className="text-5xl md:text-6xl">Visually</span>
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Dive into the world of data structures and algorithms through interactive visualizations, 
            real-time complexity analysis, and gamified challenges that make learning both fun and effective.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/data-structures">
              <motion.button 
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <PlayCircle className="w-5 h-5" />
                  <span>Start Learning</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity -z-10"></div>
              </motion.button>
            </Link>

            <Link href="/complexity">
              <motion.button 
                className="px-8 py-4 glass border border-purple-500/30 rounded-xl font-semibold text-purple-300 hover:bg-purple-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Complexity
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {features.map((feature, index) => (
            <Link key={feature.title} href={feature.path}>
              <motion.div
                className="group relative p-6 glass-dark rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
}
