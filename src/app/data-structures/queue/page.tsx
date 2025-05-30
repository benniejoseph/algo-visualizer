'use client';

import React from 'react';
import QueueVisualizer from '@/components/visualizations/QueueVisualizer';
import { ArrowLeft, BookOpen, Code, Brain, Zap, Users } from 'lucide-react';
import Link from 'next/link';

export default function QueuePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/data-structures" 
            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Queues
          </h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">What are Queues?</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                A queue is a linear data structure that follows the First In First Out (FIFO) principle. 
                Elements are added at one end (rear/back) and removed from the other end (front). 
                Think of it like a line of people waiting - the first person to join the line is the first one to be served.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✓ Advantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Fair ordering (FIFO)</li>
                    <li>• Efficient enqueue/dequeue</li>
                    <li>• Perfect for scheduling</li>
                    <li>• Breadth-first algorithms</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">✗ Disadvantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• No random access</li>
                    <li>• Linear search required</li>
                    <li>• Memory overhead (pointers)</li>
                    <li>• Cache misses (linked lists)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Queue Operations</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Queues support two primary operations: enqueue (add element to rear) and dequeue (remove element from front). 
                Additional operations include peek/front (view front element without removing) and isEmpty (check if queue is empty).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Enqueue</h4>
                  <p className="text-sm text-gray-300">
                    Add element to the rear of the queue. O(1) operation.
                  </p>
                </div>
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">Dequeue</h4>
                  <p className="text-sm text-gray-300">
                    Remove element from the front of the queue. O(1) operation.
                  </p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">Peek/Front</h4>
                  <p className="text-sm text-gray-300">
                    View the front element without removing it. O(1) operation.
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">IsEmpty</h4>
                  <p className="text-sm text-gray-300">
                    Check if the queue contains any elements. O(1) operation.
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
                  <span className="text-gray-400">Enqueue</span>
                  <span className="text-green-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dequeue</span>
                  <span className="text-green-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Peek/Front</span>
                  <span className="text-green-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Search</span>
                  <span className="text-yellow-400 font-mono">O(n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Space</span>
                  <span className="text-blue-400 font-mono">O(n)</span>
                </div>
              </div>
            </div>

            {/* Queue Types */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Queue Types</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Simple Queue</h4>
                  <p className="text-sm text-gray-300">Basic FIFO implementation</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Circular Queue</h4>
                  <p className="text-sm text-gray-300">Fixed size with wraparound</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Priority Queue</h4>
                  <p className="text-sm text-gray-300">Elements have priorities</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Double-ended</h4>
                  <p className="text-sm text-gray-300">Insert/remove from both ends</p>
                </div>
              </div>
            </div>

            {/* Real-world Applications */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Real-world Uses
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">CPU Scheduling</h4>
                  <p className="text-sm text-gray-300">Process scheduling in OS</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">BFS Traversal</h4>
                  <p className="text-sm text-gray-300">Graph and tree algorithms</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Print Spooling</h4>
                  <p className="text-sm text-gray-300">Managing print jobs</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Buffer Systems</h4>
                  <p className="text-sm text-gray-300">IO operations buffering</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Visualizer */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📥</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Interactive Queue Visualizer</h2>
          </div>
          <QueueVisualizer />
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
{`from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        """Add item to rear - O(1)"""
        self.items.append(item)
    
    def dequeue(self):
        """Remove item from front - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.popleft()
    
    def front(self):
        """Get front item without removing - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items[0]
    
    def is_empty(self):
        """Check if queue is empty - O(1)"""
        return len(self.items) == 0
    
    def size(self):
        """Get queue size - O(1)"""
        return len(self.items)

# Usage example
queue = Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

print(queue.front())    # Output: 1
print(queue.dequeue())  # Output: 1
print(queue.dequeue())  # Output: 2
print(queue.size())     # Output: 1`}
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
{`class Queue {
    constructor() {
        this.items = [];
        this.frontIndex = 0;
    }
    
    enqueue(item) {
        // Add item to rear - O(1)
        this.items.push(item);
    }
    
    dequeue() {
        // Remove item from front - O(1) amortized
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        
        const item = this.items[this.frontIndex];
        this.frontIndex++;
        
        // Reset array when front index gets large
        if (this.frontIndex > this.items.length / 2) {
            this.items = this.items.slice(this.frontIndex);
            this.frontIndex = 0;
        }
        
        return item;
    }
    
    front() {
        // Get front item without removing - O(1)
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items[this.frontIndex];
    }
    
    isEmpty() {
        // Check if queue is empty - O(1)
        return this.frontIndex >= this.items.length;
    }
    
    size() {
        // Get queue size - O(1)
        return this.items.length - this.frontIndex;
    }
}

// Usage example
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.front());    // Output: 1
console.log(queue.dequeue());  // Output: 1
console.log(queue.dequeue());  // Output: 2
console.log(queue.size());     // Output: 1`}
              </code>
            </pre>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Link 
            href="/data-structures/stack" 
            className="flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Stacks
          </Link>
          
          <Link 
            href="/data-structures/binary-tree" 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
          >
            Next: Binary Trees
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 