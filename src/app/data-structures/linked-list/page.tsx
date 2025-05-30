import React from 'react';
import LinkedListVisualizer from '@/components/visualizations/LinkedListVisualizer';
import { ArrowLeft, BookOpen, Code, Brain, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LinkedListPage() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Linked Lists
          </h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">What are Linked Lists?</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                A linked list is a linear data structure where elements are stored in nodes, and each node 
                contains data and a reference (or link) to the next node in the sequence. Unlike arrays, 
                linked list elements are not stored in contiguous memory locations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✓ Advantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Dynamic size allocation</li>
                    <li>• Efficient insertion/deletion</li>
                    <li>• Memory efficient for sparse data</li>
                    <li>• Easy to implement stacks/queues</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">✗ Disadvantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• No random access</li>
                    <li>• Extra memory for pointers</li>
                    <li>• Poor cache locality</li>
                    <li>• Sequential access only</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Memory Structure</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                In memory, each node of a linked list consists of two parts: the data field and the pointer field. 
                The nodes can be scattered throughout memory, connected only by pointers. This is fundamentally 
                different from arrays where elements are stored contiguously.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Data Field</h4>
                  <p className="text-sm text-gray-300">
                    Stores the actual value or information. Can be any data type: integers, strings, objects, etc.
                  </p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">Pointer Field</h4>
                  <p className="text-sm text-gray-300">
                    Contains the memory address of the next node. Points to NULL for the last node.
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
                  <span className="text-red-400 font-mono">O(n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Search</span>
                  <span className="text-red-400 font-mono">O(n)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Insertion</span>
                  <span className="text-green-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Deletion</span>
                  <span className="text-green-400 font-mono">O(1)</span>
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
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Music Playlists</h4>
                  <p className="text-sm text-gray-300">Next song pointer structure</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Browser History</h4>
                  <p className="text-sm text-gray-300">Back/forward navigation</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Undo Functionality</h4>
                  <p className="text-sm text-gray-300">Action history tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Visualizer */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🎮</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Interactive Visualizer</h2>
          </div>
          <LinkedListVisualizer />
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
{`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_at_beginning(self, val):
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
    
    def delete_at_beginning(self):
        if self.head:
            self.head = self.head.next
    
    def search(self, val):
        current = self.head
        position = 0
        
        while current:
            if current.val == val:
                return position
            current = current.next
            position += 1
        
        return -1  # Not found`}
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
{`class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    
    insertAtBeginning(val) {
        const newNode = new ListNode(val);
        newNode.next = this.head;
        this.head = newNode;
    }
    
    deleteAtBeginning() {
        if (this.head) {
            this.head = this.head.next;
        }
    }
    
    search(val) {
        let current = this.head;
        let position = 0;
        
        while (current) {
            if (current.val === val) {
                return position;
            }
            current = current.next;
            position++;
        }
        
        return -1; // Not found
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
            href="/data-structures/stack" 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Next: Stacks
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 