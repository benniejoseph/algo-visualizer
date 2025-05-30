'use client';

import React from 'react';
import HashTableVisualizer from '@/components/visualizations/HashTableVisualizer';
import { ArrowLeft, BookOpen, Code, Brain, Zap, Hash } from 'lucide-react';
import Link from 'next/link';

export default function HashTablePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/data-structures" 
            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Hash Tables
          </h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">What are Hash Tables?</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                A hash table (hash map) is a data structure that implements an associative array, mapping keys to values. 
                It uses a hash function to compute an index into an array of buckets, from which the desired value can be found. 
                Hash tables provide average O(1) time complexity for basic operations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✓ Advantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Fast average O(1) operations</li>
                    <li>• Flexible key types</li>
                    <li>• Dynamic sizing (modern)</li>
                    <li>• Cache-friendly access</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">✗ Disadvantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Hash collisions possible</li>
                    <li>• No guaranteed ordering</li>
                    <li>• Worst case O(n) operations</li>
                    <li>• Extra memory for hash function</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Hash Functions &amp; Collisions</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                A good hash function distributes keys uniformly across the hash table to minimize collisions. 
                When collisions occur (two keys hash to the same index), we need resolution strategies like 
                chaining (linked lists) or open addressing (probing).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Chaining</h4>
                  <p className="text-sm text-gray-300">
                    Each bucket contains a linked list of key-value pairs.
                  </p>
                </div>
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">Linear Probing</h4>
                  <p className="text-sm text-gray-300">
                    Find next available slot sequentially from collision point.
                  </p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">Quadratic Probing</h4>
                  <p className="text-sm text-gray-300">
                    Probe positions using quadratic sequence (1, 4, 9, 16...).
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Double Hashing</h4>
                  <p className="text-sm text-gray-300">
                    Use second hash function to determine probe sequence.
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
                  <span className="text-green-400 font-mono">O(1)*</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Search</span>
                  <span className="text-green-400 font-mono">O(1)*</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Delete</span>
                  <span className="text-green-400 font-mono">O(1)*</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Worst Case</span>
                  <span className="text-red-400 font-mono">O(n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Space</span>
                  <span className="text-blue-400 font-mono">O(n)</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  * Average case with good hash function
                </div>
              </div>
            </div>

            {/* Hash Function Types */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Hash Functions</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Division Method</h4>
                  <p className="text-sm text-gray-300">h(k) = k mod m</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Multiplication</h4>
                  <p className="text-sm text-gray-300">h(k) = floor(m * (k*A mod 1))</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Universal Hashing</h4>
                  <p className="text-sm text-gray-300">Randomly chosen hash family</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Cryptographic</h4>
                  <p className="text-sm text-gray-300">SHA, MD5 for security</p>
                </div>
              </div>
            </div>

            {/* Real-world Applications */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Real-world Uses
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Database Indexing</h4>
                  <p className="text-sm text-gray-300">Fast record lookup by key</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Caching</h4>
                  <p className="text-sm text-gray-300">Web caches, CPU caches</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Symbol Tables</h4>
                  <p className="text-sm text-gray-300">Compiler variable lookup</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Sets &amp; Maps</h4>
                  <p className="text-sm text-gray-300">JavaScript objects, Python dicts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Visualizer */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">#️⃣</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Interactive Hash Table Visualizer</h2>
          </div>
          <HashTableVisualizer />
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
{`class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def _hash(self, key):
        """Simple hash function - O(1)"""
        if isinstance(key, str):
            return sum(ord(c) for c in key) % self.size
        return hash(key) % self.size
    
    def put(self, key, value):
        """Insert key-value pair - O(1) average"""
        index = self._hash(key)
        bucket = self.table[index]
        
        # Check if key already exists
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        # Add new key-value pair
        bucket.append((key, value))
    
    def get(self, key):
        """Retrieve value by key - O(1) average"""
        index = self._hash(key)
        bucket = self.table[index]
        
        for k, v in bucket:
            if k == key:
                return v
        
        raise KeyError(f"Key '{key}' not found")
    
    def remove(self, key):
        """Remove key-value pair - O(1) average"""
        index = self._hash(key)
        bucket = self.table[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                return v
        
        raise KeyError(f"Key '{key}' not found")
    
    def contains(self, key):
        """Check if key exists - O(1) average"""
        try:
            self.get(key)
            return True
        except KeyError:
            return False
    
    def keys(self):
        """Get all keys - O(n)"""
        result = []
        for bucket in self.table:
            for k, v in bucket:
                result.append(k)
        return result`}
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
{`class HashTable {
    constructor(size = 10) {
        this.size = size;
        this.table = new Array(size).fill(null).map(() => []);
    }
    
    hash(key) {
        // Simple hash function - O(1)
        if (typeof key === 'string') {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }
            return hash % this.size;
        }
        return Math.abs(key) % this.size;
    }
    
    put(key, value) {
        // Insert key-value pair - O(1) average
        const index = this.hash(key);
        const bucket = this.table[index];
        
        // Check if key already exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        
        // Add new key-value pair
        bucket.push([key, value]);
    }
    
    get(key) {
        // Retrieve value by key - O(1) average
        const index = this.hash(key);
        const bucket = this.table[index];
        
        for (const [k, v] of bucket) {
            if (k === key) {
                return v;
            }
        }
        
        throw new Error('Key not found');
    }
    
    remove(key) {
        // Remove key-value pair - O(1) average
        const index = this.hash(key);
        const bucket = this.table[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                const value = bucket[i][1];
                bucket.splice(i, 1);
                return value;
            }
        }
        
        throw new Error('Key not found');
    }
    
    has(key) {
        // Check if key exists - O(1) average
        try {
            this.get(key);
            return true;
        } catch {
            return false;
        }
    }
    
    keys() {
        // Get all keys - O(n)
        const result = [];
        for (const bucket of this.table) {
            for (const [key] of bucket) {
                result.push(key);
            }
        }
        return result;
    }
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Link 
            href="/data-structures/graph" 
            className="flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Graphs
          </Link>
          
          <Link 
            href="/data-structures/heap" 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Next: Heaps
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
