'use client';

import React from 'react';
import HeapVisualizer from '@/components/visualizations/HeapVisualizer';
import { ArrowLeft, BookOpen, Code, Brain, Zap, Mountain } from 'lucide-react';
import Link from 'next/link';

export default function HeapPage() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Heaps
          </h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-bold text-white">What are Heaps?</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                A heap is a specialized tree-based data structure that satisfies the heap property. In a max heap, 
                the parent node is always greater than or equal to its children. In a min heap, the parent is 
                always less than or equal to its children. Heaps are commonly implemented as complete binary trees.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✓ Advantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Fast priority operations O(log n)</li>
                    <li>• Memory efficient (array-based)</li>
                    <li>• Guaranteed structure (complete)</li>
                    <li>• Cache-friendly access pattern</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">✗ Disadvantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• No efficient search O(n)</li>
                    <li>• Limited ordering (partial)</li>
                    <li>• No direct access to arbitrary elements</li>
                    <li>• Complex deletion of arbitrary nodes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Heap Operations</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Heaps support efficient insertion, deletion of root (min/max), and peeking at the root element. 
                The heapify operations (bubble up and bubble down) maintain the heap property after modifications. 
                Building a heap from an array can be done in O(n) time.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Insert (Heapify Up)</h4>
                  <p className="text-sm text-gray-300">
                    Add element at end, then bubble up to maintain heap property.
                  </p>
                </div>
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">Extract (Heapify Down)</h4>
                  <p className="text-sm text-gray-300">
                    Remove root, replace with last element, bubble down.
                  </p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">Peek</h4>
                  <p className="text-sm text-gray-300">
                    Access min/max element without removal. O(1) operation.
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Build Heap</h4>
                  <p className="text-sm text-gray-300">
                    Convert array to heap using bottom-up heapify. O(n) time.
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
                  <span className="text-gray-400">Insert</span>
                  <span className="text-yellow-400 font-mono">O(log n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Extract Min/Max</span>
                  <span className="text-yellow-400 font-mono">O(log n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Peek</span>
                  <span className="text-green-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Build Heap</span>
                  <span className="text-blue-400 font-mono">O(n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Space</span>
                  <span className="text-blue-400 font-mono">O(n)</span>
                </div>
              </div>
            </div>

            {/* Heap Types */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Heap Types</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Min Heap</h4>
                  <p className="text-sm text-gray-300">Parent ≤ children (smallest at root)</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Max Heap</h4>
                  <p className="text-sm text-gray-300">Parent ≥ children (largest at root)</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Binary Heap</h4>
                  <p className="text-sm text-gray-300">Most common, 2 children per node</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Fibonacci Heap</h4>
                  <p className="text-sm text-gray-300">Advanced, better amortized bounds</p>
                </div>
              </div>
            </div>

            {/* Real-world Applications */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Mountain className="w-5 h-5" />
                Real-world Uses
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Priority Queues</h4>
                  <p className="text-sm text-gray-300">Task scheduling, event simulation</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Heap Sort</h4>
                  <p className="text-sm text-gray-300">In-place sorting algorithm</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Graph Algorithms</h4>
                  <p className="text-sm text-gray-300">Dijkstra&apos;s, Prim&apos;s MST</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Memory Management</h4>
                  <p className="text-sm text-gray-300">Heap allocation in OS</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Visualizer */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🏔️</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Interactive Heap Visualizer</h2>
          </div>
          <HeapVisualizer />
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
{`import heapq

class MinHeap:
    def __init__(self):
        self.heap = []
    
    def insert(self, val):
        """Insert value into heap - O(log n)"""
        heapq.heappush(self.heap, val)
    
    def extract_min(self):
        """Remove and return minimum - O(log n)"""
        if not self.heap:
            raise IndexError("Heap is empty")
        return heapq.heappop(self.heap)
    
    def peek(self):
        """Get minimum without removing - O(1)"""
        if not self.heap:
            raise IndexError("Heap is empty")
        return self.heap[0]
    
    def size(self):
        """Get heap size - O(1)"""
        return len(self.heap)
    
    def is_empty(self):
        """Check if heap is empty - O(1)"""
        return len(self.heap) == 0

class MaxHeap:
    def __init__(self):
        self.heap = []
    
    def insert(self, val):
        """Insert value into max heap - O(log n)"""
        heapq.heappush(self.heap, -val)
    
    def extract_max(self):
        """Remove and return maximum - O(log n)"""
        if not self.heap:
            raise IndexError("Heap is empty")
        return -heapq.heappop(self.heap)
    
    def peek(self):
        """Get maximum without removing - O(1)"""
        if not self.heap:
            raise IndexError("Heap is empty")
        return -self.heap[0]

# Manual implementation for learning
class BinaryMinHeap:
    def __init__(self):
        self.heap = []
    
    def _parent(self, i):
        return (i - 1) // 2
    
    def _left_child(self, i):
        return 2 * i + 1
    
    def _right_child(self, i):
        return 2 * i + 2
    
    def _heapify_up(self, i):
        """Bubble up to maintain heap property"""
        while i > 0 and self.heap[i] < self.heap[self._parent(i)]:
            parent = self._parent(i)
            self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
            i = parent`}
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
{`class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }
    
    getRightChildIndex(index) {
        return 2 * index + 2;
    }
    
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = 
        [this.heap[index2], this.heap[index1]];
    }
    
    insert(value) {
        // Insert value into heap - O(log n)
        this.heap.push(value);
        this.heapifyUp();
    }
    
    heapifyUp() {
        let index = this.heap.length - 1;
        
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            
            if (this.heap[parentIndex] <= this.heap[index]) {
                break;
            }
            
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }
    
    extractMin() {
        // Remove and return minimum - O(log n)
        if (this.heap.length === 0) {
            throw new Error("Heap is empty");
        }
        
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        
        return min;
    }
    
    heapifyDown() {
        let index = 0;
        
        while (this.getLeftChildIndex(index) < this.heap.length) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            let smallestIndex = leftChildIndex;
            
            if (rightChildIndex < this.heap.length && 
                this.heap[rightChildIndex] < this.heap[leftChildIndex]) {
                smallestIndex = rightChildIndex;
            }
            
            if (this.heap[index] <= this.heap[smallestIndex]) {
                break;
            }
            
            this.swap(index, smallestIndex);
            index = smallestIndex;
        }
    }
    
    peek() {
        // Get minimum without removing - O(1)
        if (this.heap.length === 0) {
            throw new Error("Heap is empty");
        }
        return this.heap[0];
    }
    
    size() {
        return this.heap.length;
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Link 
            href="/data-structures/hash-table" 
            className="flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Hash Tables
          </Link>
          
          <Link 
            href="/data-structures" 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
          >
            Back to Data Structures
            <span className="ml-2">🏠</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
