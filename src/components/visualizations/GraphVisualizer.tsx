'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import MemoryVisualizer from './MemoryVisualizer';

interface GraphVertex {
  id: string;
  label: string;
  x: number;
  y: number;
  isHighlighted?: boolean;
  isActive?: boolean;
  isVisited?: boolean;
}

interface GraphEdge {
  id: string;
  from: string;
  to: string;
  weight?: number;
  isHighlighted?: boolean;
}

interface MemoryBlock {
  address: string;
  value: string | number | null;
  type: 'data' | 'pointer' | 'free';
  isActive?: boolean;
  isHighlighted?: boolean;
  pointsTo?: string;
  label?: string;
}

export default function GraphVisualizer() {
  const [vertices, setVertices] = useState<GraphVertex[]>([
    { id: 'A', label: 'A', x: 200, y: 100 },
    { id: 'B', label: 'B', x: 400, y: 100 },
    { id: 'C', label: 'C', x: 300, y: 200 },
    { id: 'D', label: 'D', x: 500, y: 200 }
  ]);
  
  const [edges, setEdges] = useState<GraphEdge[]>([
    { id: 'A-B', from: 'A', to: 'B' },
    { id: 'A-C', from: 'A', to: 'C' },
    { id: 'B-D', from: 'B', to: 'D' },
    { id: 'C-D', from: 'C', to: 'D' }
  ]);
  
  const [newVertexLabel, setNewVertexLabel] = useState<string>('');
  const [selectedVertex, setSelectedVertex] = useState<string>('');
  const [targetVertex, setTargetVertex] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [visitedOrder, setVisitedOrder] = useState<string[]>([]);
  const [dragPositions, setDragPositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  // Handle drag to update visual positions for edges
  const handleDrag = useCallback((vertexId: string, info: { offset: { x: number; y: number } }) => {
    const vertex = vertices.find(v => v.id === vertexId);
    if (!vertex) return;
    
    const newX = vertex.x + info.offset.x;
    const newY = vertex.y + info.offset.y;
    
    setDragPositions(prev => ({
      ...prev,
      [vertexId]: { x: newX, y: newY }
    }));
  }, [vertices]);

  // Handle drag end to update vertex position
  const handleDragEnd = useCallback((vertexId: string, event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
    const vertex = vertices.find(v => v.id === vertexId);
    if (!vertex) return;
    
    const newX = Math.max(32, Math.min(vertex.x + info.offset.x, 768));
    const newY = Math.max(32, Math.min(vertex.y + info.offset.y, 368));
    
    setVertices(prev => prev.map(v => 
      v.id === vertexId ? { ...v, x: newX, y: newY } : v
    ));
    
    // Clear drag position
    setDragPositions(prev => {
      const newPos = { ...prev };
      delete newPos[vertexId];
      return newPos;
    });
  }, [vertices]);

  // Generate memory blocks for visualization - only when structure changes
  const generateMemoryBlocks = useCallback((): MemoryBlock[] => {
    const blocks: MemoryBlock[] = [];
    const usedAddresses = new Set<string>();
    
    const generateUniqueAddress = (baseAddr: number): string => {
      let addr = `0x${baseAddr.toString(16).toUpperCase()}`;
      while (usedAddresses.has(addr)) {
        baseAddr += 4;
        addr = `0x${baseAddr.toString(16).toUpperCase()}`;
      }
      usedAddresses.add(addr);
      return addr;
    };
    
    // Add vertices to memory
    vertices.forEach((vertex) => {
      usedAddresses.add(vertex.id);
      blocks.push({
        address: vertex.id,
        value: vertex.label,
        type: 'data',
        isActive: vertex.isActive,
        isHighlighted: vertex.isHighlighted,
        label: `Vertex ${vertex.label}`
      });
    });

    // Add edges to memory (adjacency list representation)
    edges.forEach((edge, index) => {
      const addr = generateUniqueAddress(0x6100 + index * 4);
      blocks.push({
        address: addr,
        value: `${edge.from}→${edge.to}`,
        type: 'pointer',
        pointsTo: edge.to,
        label: `Edge ${index + 1}`
      });
    });

    // Generate free memory blocks
    const baseAddr = 0x6200;
    for (let i = 0; i < 6; i++) {
      const addr = generateUniqueAddress(baseAddr + i * 8);
      blocks.push({
        address: addr,
        value: null,
        type: 'free'
      });
    }

    return blocks.sort((a, b) => parseInt(a.address, 16) - parseInt(b.address, 16));
  }, [vertices, edges]);

  const [memoryBlocks, setMemoryBlocks] = useState<MemoryBlock[]>(() => generateMemoryBlocks());

  // Create stable structure representation for memory blocks
  const structureHash = useMemo(() => {
    const vertexHash = vertices.map(v => `${v.id}:${v.label}:${v.isActive}:${v.isHighlighted}`).join('|');
    const edgeHash = edges.map(e => `${e.from}-${e.to}:${e.isHighlighted}`).join('|');
    return `${vertexHash}::${edgeHash}`;
  }, [vertices, edges]);

  // Update memory blocks only when structure actually changes
  useEffect(() => {
    setMemoryBlocks(generateMemoryBlocks());
  }, [structureHash, generateMemoryBlocks]);

  const highlightVertex = async (vertexId: string, duration: number = 1000) => {
    setVertices(prev => prev.map(vertex => 
      vertex.id === vertexId ? { ...vertex, isHighlighted: true } : { ...vertex, isHighlighted: false }
    ));
    
    setTimeout(() => {
      setVertices(prev => prev.map(vertex => ({ ...vertex, isHighlighted: false })));
    }, duration);
  };

  const addVertex = () => {
    if (!newVertexLabel || isAnimating) return;
    
    const newVertex: GraphVertex = {
      id: newVertexLabel,
      label: newVertexLabel,
      x: Math.random() * 400 + 200,
      y: Math.random() * 200 + 100,
      isActive: true
    };
    
    setVertices(prev => [...prev, newVertex]);
    setNewVertexLabel('');
    
    setTimeout(() => {
      setVertices(prev => prev.map(vertex => ({ ...vertex, isActive: false })));
    }, 1000);
  };

  const addEdge = () => {
    if (!selectedVertex || !targetVertex || selectedVertex === targetVertex || isAnimating) return;
    
    const edgeId = `${selectedVertex}-${targetVertex}`;
    const reverseEdgeId = `${targetVertex}-${selectedVertex}`;
    
    // Check if edge already exists
    const existingEdge = edges.find(edge => 
      edge.id === edgeId || edge.id === reverseEdgeId
    );
    
    if (existingEdge) {
      setCurrentStep('Edge already exists!');
      setTimeout(() => setCurrentStep(''), 1500);
      return;
    }
    
    const newEdge: GraphEdge = {
      id: edgeId,
      from: selectedVertex,
      to: targetVertex,
      isHighlighted: true
    };
    
    setEdges(prev => [...prev, newEdge]);
    setSelectedVertex('');
    setTargetVertex('');
    
    setTimeout(() => {
      setEdges(prev => prev.map(edge => ({ ...edge, isHighlighted: false })));
    }, 1000);
  };

  const dfs = async (startVertex?: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const start = startVertex || vertices[0]?.id;
    if (!start) return;
    
    setCurrentStep('Starting Depth-First Search...');
    setVisitedOrder([]);
    
    // Reset all vertices
    setVertices(prev => prev.map(vertex => ({ 
      ...vertex, 
      isVisited: false, 
      isHighlighted: false 
    })));
    
    const visited = new Set<string>();
    const stack = [start];
    const order: string[] = [];
    
    while (stack.length > 0) {
      const current = stack.pop()!;
      
      if (visited.has(current)) continue;
      
      visited.add(current);
      order.push(current);
      setVisitedOrder([...order]);
      
      await highlightVertex(current, 1500);
      setCurrentStep(`Visiting vertex ${current}`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mark as visited
      setVertices(prev => prev.map(vertex => 
        vertex.id === current ? { ...vertex, isVisited: true } : vertex
      ));
      
      // Add unvisited neighbors to stack
      const neighbors = edges
        .filter(edge => edge.from === current || edge.to === current)
        .map(edge => edge.from === current ? edge.to : edge.from)
        .filter(neighbor => !visited.has(neighbor));
      
      for (const neighbor of neighbors.reverse()) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
    
    setCurrentStep(`DFS complete! Order: ${order.join(' → ')}`);
    setIsAnimating(false);
    
    setTimeout(() => {
      setCurrentStep('');
      setVertices(prev => prev.map(vertex => ({ 
        ...vertex, 
        isVisited: false, 
        isHighlighted: false 
      })));
    }, 3000);
  };

  const bfs = async (startVertex?: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const start = startVertex || vertices[0]?.id;
    if (!start) return;
    
    setCurrentStep('Starting Breadth-First Search...');
    setVisitedOrder([]);
    
    // Reset all vertices
    setVertices(prev => prev.map(vertex => ({ 
      ...vertex, 
      isVisited: false, 
      isHighlighted: false 
    })));
    
    const visited = new Set<string>();
    const queue = [start];
    const order: string[] = [];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (visited.has(current)) continue;
      
      visited.add(current);
      order.push(current);
      setVisitedOrder([...order]);
      
      await highlightVertex(current, 1500);
      setCurrentStep(`Visiting vertex ${current}`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mark as visited
      setVertices(prev => prev.map(vertex => 
        vertex.id === current ? { ...vertex, isVisited: true } : vertex
      ));
      
      // Add unvisited neighbors to queue
      const neighbors = edges
        .filter(edge => edge.from === current || edge.to === current)
        .map(edge => edge.from === current ? edge.to : edge.from)
        .filter(neighbor => !visited.has(neighbor));
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
    
    setCurrentStep(`BFS complete! Order: ${order.join(' → ')}`);
    setIsAnimating(false);
    
    setTimeout(() => {
      setCurrentStep('');
      setVertices(prev => prev.map(vertex => ({ 
        ...vertex, 
        isVisited: false, 
        isHighlighted: false 
      })));
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Add Vertex */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-green-400">+</span> Add Vertex
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newVertexLabel}
              onChange={(e) => setNewVertexLabel(e.target.value.toUpperCase())}
              placeholder="Label (A-Z)"
              maxLength={1}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg font-medium"
              disabled={isAnimating}
            />
            <motion.button
              onClick={addVertex}
              disabled={isAnimating || !newVertexLabel}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Vertex
            </motion.button>
          </div>
        </div>

        {/* Add Edge */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400">—</span> Add Edge
          </h3>
          <div className="space-y-2">
            <select
              value={selectedVertex}
              onChange={(e) => setSelectedVertex(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isAnimating}
            >
              <option value="">From vertex</option>
              {vertices.map(vertex => (
                <option key={vertex.id} value={vertex.id}>{vertex.label}</option>
              ))}
            </select>
            <select
              value={targetVertex}
              onChange={(e) => setTargetVertex(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isAnimating}
            >
              <option value="">To vertex</option>
              {vertices.map(vertex => (
                <option key={vertex.id} value={vertex.id}>{vertex.label}</option>
              ))}
            </select>
            <motion.button
              onClick={addEdge}
              disabled={isAnimating || !selectedVertex || !targetVertex}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect
            </motion.button>
          </div>
        </div>

        {/* DFS */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400">🔍</span> DFS
          </h3>
          <motion.button
            onClick={() => dfs()}
            disabled={isAnimating || vertices.length === 0}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Depth-First Search
          </motion.button>
        </div>

        {/* BFS */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-400">🌊</span> BFS
          </h3>
          <motion.button
            onClick={() => bfs()}
            disabled={isAnimating || vertices.length === 0}
            className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Breadth-First Search
          </motion.button>
        </div>
      </div>

      {/* Status */}
      {currentStep && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 glass-dark rounded-xl border-l-4 border-purple-500"
        >
          <div className="text-white font-medium">{currentStep}</div>
        </motion.div>
      )}

      {/* Traversal Result */}
      {visitedOrder.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 glass-dark rounded-xl border-l-4 border-cyan-500"
        >
          <div className="text-white font-medium">
            Visited Order: {visitedOrder.join(' → ')}
          </div>
        </motion.div>
      )}

      {/* Graph Visualization */}
      <div className="p-8 glass-dark rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🕸️</span>
            </div>
            Graph Structure
          </h3>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
              <span className="text-gray-300">Vertex</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Visited</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[400px] bg-gray-900/20 rounded-xl overflow-hidden">
          {/* Edges */}
          <svg className="absolute inset-0 w-full h-full">
            {edges.map(edge => {
              const fromVertex = vertices.find(v => v.id === edge.from);
              const toVertex = vertices.find(v => v.id === edge.to);
              
              if (!fromVertex || !toVertex) return null;
              
              // Use drag position if available, otherwise use state position
              const fromPos = dragPositions[edge.from] || fromVertex;
              const toPos = dragPositions[edge.to] || toVertex;
              
              return (
                <motion.line
                  key={edge.id}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={edge.isHighlighted ? "#fbbf24" : "#6366f1"}
                  strokeWidth={edge.isHighlighted ? "3" : "2"}
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    x1: fromPos.x,
                    y1: fromPos.y,
                    x2: toPos.x,
                    y2: toPos.y
                  }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}
          </svg>

          {/* Vertices */}
          <AnimatePresence>
            {vertices.map(vertex => (
              <motion.div
                key={vertex.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  x: vertex.x - 32,
                  y: vertex.y - 32
                }}
                exit={{ scale: 0, opacity: 0 }}
                className={`
                  absolute w-16 h-16 rounded-full border-2 cursor-grab active:cursor-grabbing flex items-center justify-center
                  ${vertex.isVisited ? 'border-green-400 bg-gradient-to-r from-green-400/30 to-emerald-400/30' :
                    vertex.isHighlighted ? 'border-yellow-400 bg-gradient-to-r from-yellow-400/30 to-orange-400/30' :
                    vertex.isActive ? 'border-blue-400 bg-gradient-to-r from-blue-400/30 to-indigo-400/30' :
                    'border-indigo-400 bg-gradient-to-r from-indigo-400/30 to-purple-400/30'}
                `}
                whileHover={{ scale: 1.1 }}
                drag
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={{
                  left: 0,
                  right: 736,
                  top: 0,
                  bottom: 336
                }}
                onDrag={(_, info) => handleDrag(vertex.id, info)}
                onDragEnd={(event, info) => handleDragEnd(vertex.id, event, info)}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-lg font-bold text-white">{vertex.label}</div>

                {/* Glow effect */}
                {(vertex.isHighlighted || vertex.isActive || vertex.isVisited) && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: vertex.isVisited ? 
                        'linear-gradient(45deg, #10b981, #059669)' :
                        vertex.isHighlighted ? 
                        'linear-gradient(45deg, #fbbf24, #f59e0b)' :
                        'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                      filter: 'blur(15px)',
                      opacity: 0.4,
                      zIndex: -1,
                    }}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty graph indicator */}
          {vertices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="text-gray-400 text-xl">Empty Graph</div>
              <div className="text-gray-500 text-sm mt-2">Add vertices to start building the graph</div>
            </motion.div>
          )}
        </div>

        {/* Graph Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4 glass rounded-lg">
            <div className="text-sm text-gray-400">Vertices</div>
            <div className="text-2xl font-bold text-indigo-400">{vertices.length}</div>
          </div>
          
          <div className="text-center p-4 glass rounded-lg">
            <div className="text-sm text-gray-400">Edges</div>
            <div className="text-2xl font-bold text-blue-400">{edges.length}</div>
          </div>
          
          <div className="text-center p-4 glass rounded-lg">
            <div className="text-sm text-gray-400">Density</div>
            <div className="text-2xl font-bold text-purple-400">
              {vertices.length > 1 ? 
                ((2 * edges.length) / (vertices.length * (vertices.length - 1)) * 100).toFixed(1) + '%' : 
                '0%'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Memory Visualization */}
      <MemoryVisualizer 
        memoryBlocks={memoryBlocks} 
        title="Memory Layout - Graph (Adjacency List)"
      />

      {/* Complexity Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">DFS</h4>
          <div className="text-3xl font-bold text-purple-400 mb-2">O(V+E)</div>
          <div className="text-sm text-gray-400">Vertices + Edges</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">BFS</h4>
          <div className="text-3xl font-bold text-orange-400 mb-2">O(V+E)</div>
          <div className="text-sm text-gray-400">Vertices + Edges</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Space</h4>
          <div className="text-3xl font-bold text-blue-400 mb-2">O(V+E)</div>
          <div className="text-sm text-gray-400">Adjacency list storage</div>
        </div>
      </div>
    </div>
  );
} 