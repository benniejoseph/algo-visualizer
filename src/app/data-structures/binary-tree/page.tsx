'use client';

import React from 'react';
import BinaryTreeVisualizer from '@/components/visualizations/BinaryTreeVisualizer';
import { ArrowLeft, BookOpen, Code, Brain, Zap, TreePine } from 'lucide-react';
import Link from 'next/link';

export default function BinaryTreePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/data-structures" 
            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Binary Trees
          </h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">What are Binary Trees?</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                A binary tree is a hierarchical data structure where each node has at most two children, 
                referred to as the left child and right child. Binary trees are the foundation for many 
                advanced data structures like Binary Search Trees, AVL trees, and heaps.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✓ Advantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Hierarchical organization</li>
                    <li>• Efficient searching (BST)</li>
                    <li>• Natural recursion</li>
                    <li>• Flexible structure</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">✗ Disadvantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• No guaranteed balance</li>
                    <li>• Memory overhead (pointers)</li>
                    <li>• Complex implementation</li>
                    <li>• Cache-unfriendly traversal</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Tree Traversals</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Tree traversals are algorithms for visiting all nodes in a tree. The three main depth-first 
                traversals differ in when they visit the root node relative to its children. Breadth-first 
                traversal visits nodes level by level.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">In-order (LNR)</h4>
                  <p className="text-sm text-gray-300">
                    Left - Node - Right. Gives sorted order in BST.
                  </p>
                </div>
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">Pre-order (NLR)</h4>
                  <p className="text-sm text-gray-300">
                    Node - Left - Right. Good for copying trees.
                  </p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">Post-order (LRN)</h4>
                  <p className="text-sm text-gray-300">
                    Left - Right - Node. Good for deleting trees.
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Level-order (BFS)</h4>
                  <p className="text-sm text-gray-300">
                    Level by level traversal using queue.
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
                  <span className="text-gray-400">Search</span>
                  <span className="text-yellow-400 font-mono">O(h)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Insert</span>
                  <span className="text-yellow-400 font-mono">O(h)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Delete</span>
                  <span className="text-yellow-400 font-mono">O(h)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Traversal</span>
                  <span className="text-blue-400 font-mono">O(n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Space</span>
                  <span className="text-blue-400 font-mono">O(n)</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  * h = height of tree
                </div>
              </div>
            </div>

            {/* Tree Types */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Tree Types</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Binary Search Tree</h4>
                  <p className="text-sm text-gray-300">Left &lt; Root &lt; Right ordering</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">AVL Tree</h4>
                  <p className="text-sm text-gray-300">Self-balancing BST</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Red-Black Tree</h4>
                  <p className="text-sm text-gray-300">Balanced with color properties</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Heap</h4>
                  <p className="text-sm text-gray-300">Complete binary tree</p>
                </div>
              </div>
            </div>

            {/* Real-world Applications */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TreePine className="w-5 h-5" />
                Real-world Uses
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">File Systems</h4>
                  <p className="text-sm text-gray-300">Directory structures</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Databases</h4>
                  <p className="text-sm text-gray-300">B-trees for indexing</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Compilers</h4>
                  <p className="text-sm text-gray-300">Abstract syntax trees</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Machine Learning</h4>
                  <p className="text-sm text-gray-300">Decision trees</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Visualizer */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🌳</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Interactive Binary Tree Visualizer</h2>
          </div>
          <BinaryTreeVisualizer />
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
{`class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        """Insert value into BST - O(h)"""
        if not self.root:
            self.root = TreeNode(val)
        else:
            self._insert_recursive(self.root, val)
    
    def _insert_recursive(self, node, val):
        if val < node.val:
            if node.left is None:
                node.left = TreeNode(val)
            else:
                self._insert_recursive(node.left, val)
        else:
            if node.right is None:
                node.right = TreeNode(val)
            else:
                self._insert_recursive(node.right, val)
    
    def search(self, val):
        """Search for value - O(h)"""
        return self._search_recursive(self.root, val)
    
    def _search_recursive(self, node, val):
        if node is None or node.val == val:
            return node
        
        if val < node.val:
            return self._search_recursive(node.left, val)
        else:
            return self._search_recursive(node.right, val)
    
    def inorder(self):
        """In-order traversal: Left - Root - Right"""
        result = []
        self._inorder_recursive(self.root, result)
        return result
    
    def _inorder_recursive(self, node, result):
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.val)
            self._inorder_recursive(node.right, result)
    
    def preorder(self):
        """Pre-order traversal: Root - Left - Right"""
        result = []
        self._preorder_recursive(self.root, result)
        return result
    
    def _preorder_recursive(self, node, result):
        if node:
            result.append(node.val)
            self._preorder_recursive(node.left, result)
            self._preorder_recursive(node.right, result)`}
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
{`class TreeNode {
    constructor(val = 0) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    insert(val) {
        // Insert value into BST - O(h)
        if (!this.root) {
            this.root = new TreeNode(val);
        } else {
            this.insertRecursive(this.root, val);
        }
    }
    
    insertRecursive(node, val) {
        if (val < node.val) {
            if (node.left === null) {
                node.left = new TreeNode(val);
            } else {
                this.insertRecursive(node.left, val);
            }
        } else {
            if (node.right === null) {
                node.right = new TreeNode(val);
            } else {
                this.insertRecursive(node.right, val);
            }
        }
    }
    
    search(val) {
        // Search for value - O(h)
        return this.searchRecursive(this.root, val);
    }
    
    searchRecursive(node, val) {
        if (node === null || node.val === val) {
            return node;
        }
        
        if (val < node.val) {
            return this.searchRecursive(node.left, val);
        } else {
            return this.searchRecursive(node.right, val);
        }
    }
    
    inorder() {
        // In-order traversal: Left - Root - Right
        const result = [];
        this.inorderRecursive(this.root, result);
        return result;
    }
    
    inorderRecursive(node, result) {
        if (node) {
            this.inorderRecursive(node.left, result);
            result.push(node.val);
            this.inorderRecursive(node.right, result);
        }
    }
    
    levelOrder() {
        // Level-order traversal (BFS)
        if (!this.root) return [];
        
        const result = [];
        const queue = [this.root];
        
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
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
            href="/data-structures/queue" 
            className="flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Queues
          </Link>
          
          <Link 
            href="/data-structures/graph" 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Next: Graphs
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
