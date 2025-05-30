import React from 'react';
import StackVisualizer from '@/components/visualizations/StackVisualizer';
import { ArrowLeft, BookOpen, Code, Brain, Zap } from 'lucide-react';
import Link from 'next/link';

export default function StackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/data-structures" 
            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Stacks
          </h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-bold text-white">What are Stacks?</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                A stack is a linear data structure that follows the Last In First Out (LIFO) principle. 
                Think of it like a stack of plates - you can only add or remove plates from the top. 
                The last element added is the first one to be removed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✓ Advantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Simple implementation</li>
                    <li>• Constant time operations</li>
                    <li>• Automatic memory management</li>
                    <li>• Perfect for recursive algorithms</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">✗ Disadvantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Limited access pattern</li>
                    <li>• Fixed size (array implementation)</li>
                    <li>• No random access</li>
                    <li>• Stack overflow risk</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">LIFO Principle</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                The LIFO (Last In, First Out) principle means that the most recently added element 
                is the first one to be removed. This is implemented through three main operations:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Push</h4>
                  <p className="text-sm text-gray-300">
                    Add an element to the top of the stack. Always O(1) time complexity.
                  </p>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Pop</h4>
                  <p className="text-sm text-gray-300">
                    Remove and return the top element from the stack. O(1) time complexity.
                  </p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Peek/Top</h4>
                  <p className="text-sm text-gray-300">
                    View the top element without removing it. O(1) time complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Facts
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Push</span>
                  <span className="text-green-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Pop</span>
                  <span className="text-red-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Peek</span>
                  <span className="text-blue-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Search</span>
                  <span className="text-yellow-400 font-mono">O(n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Space</span>
                  <span className="text-purple-400 font-mono">O(n)</span>
                </div>
              </div>
            </div>

            {/* Real-world Applications */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Real-world Uses</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg">
                  <h4 className="font-semibold text-red-400">Function Calls</h4>
                  <p className="text-sm text-gray-300">Call stack in programming languages</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Undo Operations</h4>
                  <p className="text-sm text-gray-300">Text editors, image editing</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Expression Parsing</h4>
                  <p className="text-sm text-gray-300">Parentheses matching, calculators</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Browser History</h4>
                  <p className="text-sm text-gray-300">Back button functionality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Visualizer */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📚</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Interactive Stack Visualizer</h2>
          </div>
          <StackVisualizer />
        </div>

        {/* Implementation Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 glass-dark rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Python Implementation</h3>
            </div>
            <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
              <code className="text-gray-300">
{`class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add item to top of stack"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return top item"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()
    
    def peek(self):
        """Return top item without removing"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[-1]
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of items"""
        return len(self.items)`}
              </code>
            </pre>
          </div>

          <div className="p-6 glass-dark rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">JavaScript Implementation</h3>
            </div>
            <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
              <code className="text-gray-300">
{`class Stack {
    constructor() {
        this.items = [];
    }
    
    push(item) {
        // Add item to top of stack
        this.items.push(item);
    }
    
    pop() {
        // Remove and return top item
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items.pop();
    }
    
    peek() {
        // Return top item without removing
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        // Check if stack is empty
        return this.items.length === 0;
    }
    
    size() {
        // Return number of items
        return this.items.length;
    }
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Link 
            href="/data-structures/linked-list" 
            className="flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Linked Lists
          </Link>
          
          <Link 
            href="/data-structures/queue" 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
          >
            Next: Queues
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 