'use client';

import React from 'react';
import GraphVisualizer from '@/components/visualizations/GraphVisualizer';
import { ArrowLeft, BookOpen, Code, Brain, Zap, Network } from 'lucide-react';
import Link from 'next/link';

export default function GraphPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/data-structures" 
            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Graphs
          </h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">What are Graphs?</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                A graph is a collection of nodes (vertices) connected by edges. Graphs are versatile data structures 
                that can represent relationships between entities, making them essential for modeling real-world networks 
                like social media connections, transportation systems, and computer networks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✓ Advantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Models complex relationships</li>
                    <li>• Flexible structure</li>
                    <li>• Rich algorithms available</li>
                    <li>• Real-world applicability</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">✗ Disadvantages</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Higher memory overhead</li>
                    <li>• Complex algorithms</li>
                    <li>• No guaranteed structure</li>
                    <li>• Potential cycles</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 glass-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Graph Algorithms</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Graphs support various traversal and analysis algorithms. Depth-First Search (DFS) explores as far 
                as possible along each branch, while Breadth-First Search (BFS) visits neighbors level by level. 
                Shortest path algorithms find optimal routes between nodes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">DFS (Depth-First)</h4>
                  <p className="text-sm text-gray-300">
                    Explores deep before backtracking. Uses stack (recursion).
                  </p>
                </div>
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">BFS (Breadth-First)</h4>
                  <p className="text-sm text-gray-300">
                    Explores neighbors first. Uses queue for level-order.
                  </p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">Dijkstra&apos;s Algorithm</h4>
                  <p className="text-sm text-gray-300">
                    Shortest path in weighted graphs with non-negative weights.
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Topological Sort</h4>
                  <p className="text-sm text-gray-300">
                    Linear ordering of vertices in directed acyclic graphs.
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
                  <span className="text-gray-400">Add Vertex</span>
                  <span className="text-green-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Add Edge</span>
                  <span className="text-green-400 font-mono">O(1)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">DFS/BFS</span>
                  <span className="text-yellow-400 font-mono">O(V+E)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Find Path</span>
                  <span className="text-yellow-400 font-mono">O(V+E)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Space</span>
                  <span className="text-blue-400 font-mono">O(V+E)</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  * V = vertices, E = edges
                </div>
              </div>
            </div>

            {/* Graph Types */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Graph Types</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Undirected</h4>
                  <p className="text-sm text-gray-300">Bidirectional edges</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Directed (Digraph)</h4>
                  <p className="text-sm text-gray-300">One-way edges</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Weighted</h4>
                  <p className="text-sm text-gray-300">Edges have costs/weights</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Cyclic/Acyclic</h4>
                  <p className="text-sm text-gray-300">Contains or lacks cycles</p>
                </div>
              </div>
            </div>

            {/* Real-world Applications */}
            <div className="p-6 glass-dark rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Network className="w-5 h-5" />
                Real-world Uses
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Social Networks</h4>
                  <p className="text-sm text-gray-300">Friend connections, recommendations</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400">Maps & GPS</h4>
                  <p className="text-sm text-gray-300">Route finding, navigation</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Web Crawling</h4>
                  <p className="text-sm text-gray-300">Link analysis, page ranking</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400">Dependencies</h4>
                  <p className="text-sm text-gray-300">Build systems, package managers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Visualizer */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🕸️</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Interactive Graph Visualizer</h2>
          </div>
          <GraphVisualizer />
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
{`from collections import deque, defaultdict

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
        self.vertices = set()
    
    def add_vertex(self, vertex):
        """Add a vertex to the graph - O(1)"""
        self.vertices.add(vertex)
    
    def add_edge(self, u, v, directed=False):
        """Add an edge between vertices - O(1)"""
        self.graph[u].append(v)
        self.vertices.add(u)
        self.vertices.add(v)
        
        if not directed:
            self.graph[v].append(u)
    
    def dfs(self, start, visited=None):
        """Depth-First Search - O(V + E)"""
        if visited is None:
            visited = set()
        
        visited.add(start)
        result = [start]
        
        for neighbor in self.graph[start]:
            if neighbor not in visited:
                result.extend(self.dfs(neighbor, visited))
        
        return result
    
    def bfs(self, start):
        """Breadth-First Search - O(V + E)"""
        visited = set()
        queue = deque([start])
        result = []
        
        while queue:
            vertex = queue.popleft()
            if vertex not in visited:
                visited.add(vertex)
                result.append(vertex)
                
                for neighbor in self.graph[vertex]:
                    if neighbor not in visited:
                        queue.append(neighbor)
        
        return result
    
    def has_path(self, start, end):
        """Check if path exists - O(V + E)"""
        if start == end:
            return True
        
        visited = set()
        queue = deque([start])
        
        while queue:
            vertex = queue.popleft()
            if vertex == end:
                return True
            
            if vertex not in visited:
                visited.add(vertex)
                for neighbor in self.graph[vertex]:
                    queue.append(neighbor)
        
        return False`}
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
{`class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
    
    addVertex(vertex) {
        // Add a vertex to the graph - O(1)
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }
    
    addEdge(vertex1, vertex2, directed = false) {
        // Add an edge between vertices - O(1)
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        
        this.adjacencyList.get(vertex1).push(vertex2);
        
        if (!directed) {
            this.adjacencyList.get(vertex2).push(vertex1);
        }
    }
    
    dfs(start, visited = new Set()) {
        // Depth-First Search - O(V + E)
        visited.add(start);
        const result = [start];
        
        const neighbors = this.adjacencyList.get(start) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                result.push(...this.dfs(neighbor, visited));
            }
        }
        
        return result;
    }
    
    bfs(start) {
        // Breadth-First Search - O(V + E)
        const visited = new Set();
        const queue = [start];
        const result = [];
        
        while (queue.length > 0) {
            const vertex = queue.shift();
            
            if (!visited.has(vertex)) {
                visited.add(vertex);
                result.push(vertex);
                
                const neighbors = this.adjacencyList.get(vertex) || [];
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
        }
        
        return result;
    }
    
    hasPath(start, end) {
        // Check if path exists - O(V + E)
        if (start === end) return true;
        
        const visited = new Set();
        const queue = [start];
        
        while (queue.length > 0) {
            const vertex = queue.shift();
            
            if (vertex === end) return true;
            
            if (!visited.has(vertex)) {
                visited.add(vertex);
                const neighbors = this.adjacencyList.get(vertex) || [];
                queue.push(...neighbors);
            }
        }
        
        return false;
    }
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Link 
            href="/data-structures/binary-tree" 
            className="flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Binary Trees
          </Link>
          
          <Link 
            href="/data-structures/hash-table" 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
          >
            Next: Hash Tables
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
