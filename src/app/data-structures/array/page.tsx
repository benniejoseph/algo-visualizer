'use client';

import React from 'react';
import ArrayVisualizer from '@/components/visualizations/ArrayVisualizer';
import { ArrowLeft, BookOpen, Code, Brain, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ArrayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/data-structures" 
            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Arrays
          </h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">What are Arrays?</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Arrays are fundamental data structures that store elements of the same type in contiguous memory locations. 
                Each element can be accessed directly using its index, making arrays incredibly efficient for random access operations. 
                Think of arrays as a row of boxes, each numbered, where you can instantly jump to any box by its number.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✓ Advantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Constant time random access</li>
                    <li>• Excellent cache locality</li>
                    <li>• Memory efficient storage</li>
                    <li>• Simple implementation</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">✗ Disadvantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Fixed size (static arrays)</li>
                    <li>• Expensive insertion/deletion</li>
                    <li>• Memory waste if underutilized</li>
                    <li>• No built-in bounds checking</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Memory Layout</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Arrays store elements in contiguous memory locations, meaning each element is placed right next to the previous one. 
                This contiguous storage enables O(1) access time and excellent cache performance, as accessing nearby elements 
                is extremely fast due to spatial locality.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Base Address</h4>
                  <p className="text-sm text-gray-300">
                    Starting memory location where the first element is stored.
                  </p>
                </div>
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">Index Calculation</h4>
                  <p className="text-sm text-gray-300">
                    Address = Base + (Index × Element_Size)
                  </p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">Cache Locality</h4>
                  <p className="text-sm text-gray-300">
                    Sequential access benefits from CPU cache prefetching.
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
                  <span className="text-gray-400">Access</span>
                  <span className="text-green-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Search</span>
                  <span className="text-yellow-400 font-mono">O(n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Insertion</span>
                  <span className="text-red-400 font-mono">O(n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Deletion</span>
                  <span className="text-red-400 font-mono">O(n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Space</span>
                  <span className="text-blue-400 font-mono">O(n)</span>
                </div>
              </div>
            </div>

            {/* Real-world Applications */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Real-world Uses</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Image Processing</h4>
                  <p className="text-sm text-gray-300">Pixel data stored in 2D arrays</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Database Tables</h4>
                  <p className="text-sm text-gray-300">Rows and columns of data</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Game Development</h4>
                  <p className="text-sm text-gray-300">Game boards, inventories, maps</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Scientific Computing</h4>
                  <p className="text-sm text-gray-300">Matrices, vectors, simulations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Visualizer */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🔢</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Interactive Array Visualizer</h2>
          </div>
          <ArrayVisualizer />
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
{`class Array:
    def __init__(self, capacity):
        self.data = [None] * capacity
        self.size = 0
        self.capacity = capacity
    
    def get(self, index):
        """Access element at index - O(1)"""
        if 0 <= index < self.size:
            return self.data[index]
        raise IndexError("Index out of bounds")
    
    def set(self, index, value):
        """Update element at index - O(1)"""
        if 0 <= index < self.size:
            self.data[index] = value
        else:
            raise IndexError("Index out of bounds")
    
    def append(self, value):
        """Add element at end - O(1) amortized"""
        if self.size < self.capacity:
            self.data[self.size] = value
            self.size += 1
        else:
            raise OverflowError("Array is full")
    
    def insert(self, index, value):
        """Insert element at index - O(n)"""
        if self.size >= self.capacity:
            raise OverflowError("Array is full")
        
        # Shift elements to the right
        for i in range(self.size, index, -1):
            self.data[i] = self.data[i - 1]
        
        self.data[index] = value
        self.size += 1
    
    def delete(self, index):
        """Delete element at index - O(n)"""
        if index >= self.size:
            raise IndexError("Index out of bounds")
        
        # Shift elements to the left
        for i in range(index, self.size - 1):
            self.data[i] = self.data[i + 1]
        
        self.size -= 1
    
    def search(self, value):
        """Linear search - O(n)"""
        for i in range(self.size):
            if self.data[i] == value:
                return i
        return -1`}
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
{`class Array {
    constructor(capacity) {
        this.data = new Array(capacity);
        this.size = 0;
        this.capacity = capacity;
    }
    
    get(index) {
        // Access element at index - O(1)
        if (index >= 0 && index < this.size) {
            return this.data[index];
        }
        throw new Error("Index out of bounds");
    }
    
    set(index, value) {
        // Update element at index - O(1)
        if (index >= 0 && index < this.size) {
            this.data[index] = value;
        } else {
            throw new Error("Index out of bounds");
        }
    }
    
    append(value) {
        // Add element at end - O(1) amortized
        if (this.size < this.capacity) {
            this.data[this.size] = value;
            this.size++;
        } else {
            throw new Error("Array is full");
        }
    }
    
    insert(index, value) {
        // Insert element at index - O(n)
        if (this.size >= this.capacity) {
            throw new Error("Array is full");
        }
        
        // Shift elements to the right
        for (let i = this.size; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }
        
        this.data[index] = value;
        this.size++;
    }
    
    delete(index) {
        // Delete element at index - O(n)
        if (index >= this.size) {
            throw new Error("Index out of bounds");
        }
        
        // Shift elements to the left
        for (let i = index; i < this.size - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        
        this.size--;
    }
    
    search(value) {
        // Linear search - O(n)
        for (let i = 0; i < this.size; i++) {
            if (this.data[i] === value) {
                return i;
            }
        }
        return -1;
    }
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Link 
            href="/data-structures" 
            className="flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Data Structures
          </Link>
          
          <Link 
            href="/data-structures/linked-list" 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Next: Linked Lists
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 