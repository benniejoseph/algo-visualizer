'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MemoryVisualizer from './MemoryVisualizer';

interface TreeNode {
  id: string;
  value: number;
  left: string | null;
  right: string | null;
  x?: number;
  y?: number;
  isHighlighted?: boolean;
  isActive?: boolean;
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

export default function BinaryTreeVisualizer() {
  const [nodes, setNodes] = useState<TreeNode[]>([
    { id: '0x3000', value: 50, left: '0x3004', right: '0x3008' },
    { id: '0x3004', value: 30, left: '0x300C', right: null },
    { id: '0x3008', value: 70, left: null, right: '0x3010' },
    { id: '0x300C', value: 20, left: null, right: null },
    { id: '0x3010', value: 80, left: null, right: null }
  ]);
  
  const [rootId, setRootId] = useState<string>('0x3000');
  const [inputValue, setInputValue] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [traversalType, setTraversalType] = useState<string>('');

  // Calculate node positions for visualization
  const calculatePositions = () => {
    if (nodes.length === 0) return;
    
    const positions = new Map<string, { x: number; y: number }>();
    
    // Container dimensions - leave margins for nodes
    const containerWidth = 800;
    const containerHeight = 500;
    const nodeRadius = 32; // Half of node width/height
    const levelHeight = 100;
    
    // Calculate tree width to determine proper spacing
    const getTreeWidth = (nodeId: string | null, level: number): number => {
      if (!nodeId) return 0;
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return 0;
      
      const leftWidth = getTreeWidth(node.left, level + 1);
      const rightWidth = getTreeWidth(node.right, level + 1);
      
      return Math.max(1, leftWidth + rightWidth) || 1;
    };
    
    const traverse = (nodeId: string | null, x: number, y: number, level: number, treeWidth: number) => {
      if (!nodeId) return;
      
      // Ensure position is within bounds
      const clampedX = Math.max(nodeRadius + 20, Math.min(x, containerWidth - nodeRadius - 20));
      const clampedY = Math.max(nodeRadius + 20, Math.min(y, containerHeight - nodeRadius - 20));
      
      positions.set(nodeId, { x: clampedX, y: clampedY });
      
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        const spacing = Math.max(60, (containerWidth * 0.8) / Math.pow(2, level + 1));
        const nextY = clampedY + levelHeight;
        
        if (node.left) traverse(node.left, clampedX - spacing, nextY, level + 1, treeWidth);
        if (node.right) traverse(node.right, clampedX + spacing, nextY, level + 1, treeWidth);
      }
    };
    
    if (rootId) {
      const treeWidth = getTreeWidth(rootId, 0);
      const rootX = containerWidth / 2;
      const rootY = 60;
      traverse(rootId, rootX, rootY, 0, treeWidth);
    }
    
    // Only update positions without creating new node objects
    setNodes(prev => prev.map(node => {
      const pos = positions.get(node.id);
      if (pos && (node.x !== pos.x || node.y !== pos.y)) {
        return { ...node, x: pos.x, y: pos.y };
      }
      return node;
    }));
  };

  useEffect(() => {
    if (nodes.length > 0) {
      calculatePositions();
    }
  }, [nodes.length, rootId]);

  // Generate memory blocks for visualization
  const generateMemoryBlocks = (): MemoryBlock[] => {
    const blocks: MemoryBlock[] = [];
    const usedAddresses = new Set<string>();
    
    // Separate address space for pointers to avoid collisions
    let pointerBaseAddr = 0x3200;
    
    const generateUniqueAddress = (baseAddr: number): string => {
      let addr = `0x${baseAddr.toString(16).toUpperCase()}`;
      while (usedAddresses.has(addr)) {
        baseAddr += 4;
        addr = `0x${baseAddr.toString(16).toUpperCase()}`;
      }
      usedAddresses.add(addr);
      return addr;
    };
    
    // Add nodes to memory
    nodes.forEach((node, index) => {
      usedAddresses.add(node.id);
      blocks.push({
        address: node.id,
        value: node.value,
        type: 'data',
        isActive: node.isActive,
        isHighlighted: node.isHighlighted,
        label: node.id === rootId ? 'ROOT' : `Node ${index + 1}`
      });
      
      // Left pointer - use separate address space
      const leftPtrAddr = generateUniqueAddress(pointerBaseAddr);
      pointerBaseAddr += 4;
      blocks.push({
        address: leftPtrAddr,
        value: node.left || 'NULL',
        type: 'pointer',
        pointsTo: node.left || undefined,
        label: 'left'
      });
      
      // Right pointer - use separate address space
      const rightPtrAddr = generateUniqueAddress(pointerBaseAddr);
      pointerBaseAddr += 4;
      blocks.push({
        address: rightPtrAddr,
        value: node.right || 'NULL',
        type: 'pointer',
        pointsTo: node.right || undefined,
        label: 'right'
      });
    });

    // Generate free memory blocks
    const baseAddr = 0x3100;
    for (let i = 0; i < 4; i++) {
      const addr = generateUniqueAddress(baseAddr + i * 12);
      blocks.push({
        address: addr,
        value: null,
        type: 'free'
      });
    }

    return blocks.sort((a, b) => parseInt(a.address, 16) - parseInt(b.address, 16));
  };

  const [memoryBlocks, setMemoryBlocks] = useState<MemoryBlock[]>(generateMemoryBlocks());

  useEffect(() => {
    setMemoryBlocks(generateMemoryBlocks());
  }, [nodes]);

  const highlightNode = async (nodeId: string, duration: number = 1000) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, isHighlighted: true } : { ...node, isHighlighted: false }
    ));
    
    setTimeout(() => {
      setNodes(prev => prev.map(node => ({ ...node, isHighlighted: false })));
    }, duration);
  };

  const generateUniqueNodeAddress = (): string => {
    const existingAddresses = new Set(nodes.map(node => node.id));
    let baseAddr = 0x3020;
    
    while (existingAddresses.has(`0x${baseAddr.toString(16).toUpperCase()}`)) {
      baseAddr += 4;
    }
    
    return `0x${baseAddr.toString(16).toUpperCase()}`;
  };

  const insertNode = async () => {
    if (!inputValue || isAnimating) return;
    
    setIsAnimating(true);
    const value = parseInt(inputValue);
    setCurrentStep(`Inserting ${value} into BST...`);
    
    if (nodes.length === 0) {
      const newNodeId = generateUniqueNodeAddress();
      const newNode = { id: newNodeId, value, left: null, right: null };
      setNodes([newNode]);
      setRootId(newNodeId);
      setCurrentStep('Created root node!');
      setInputValue('');
      setIsAnimating(false);
      setTimeout(() => setCurrentStep(''), 1000);
      return;
    }
    
    // BST insertion logic
    let currentId: string | null = rootId;
    const path: string[] = [];
    let newNodeId: string | null = null;
    
    while (currentId) {
      const currentNode = nodes.find(n => n.id === currentId);
      if (!currentNode) break;
      
      await highlightNode(currentId, 800);
      path.push(currentId);
      setCurrentStep(`Comparing ${value} with ${currentNode.value} at ${currentId}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (value < currentNode.value) {
        if (!currentNode.left) {
          // Insert as left child
          newNodeId = generateUniqueNodeAddress();
          setNodes(prev => prev.map(node => 
            node.id === currentId ? { ...node, left: newNodeId } : node
          ).concat([{ id: newNodeId!, value, left: null, right: null, isActive: true }]));
          setCurrentStep(`Inserted ${value} as left child of ${currentNode.value}`);
          break;
        }
        currentId = currentNode.left;
      } else {
        if (!currentNode.right) {
          // Insert as right child
          newNodeId = generateUniqueNodeAddress();
          setNodes(prev => prev.map(node => 
            node.id === currentId ? { ...node, right: newNodeId } : node
          ).concat([{ id: newNodeId!, value, left: null, right: null, isActive: true }]));
          setCurrentStep(`Inserted ${value} as right child of ${currentNode.value}`);
          break;
        }
        currentId = currentNode.right;
      }
    }
    
    // Wait for state update, then clear active state and recalculate positions
    setTimeout(() => {
      setNodes(prev => prev.map(node => ({ ...node, isActive: false })));
    }, 1000);
    
    setInputValue('');
    setIsAnimating(false);
    setTimeout(() => setCurrentStep(''), 2000);
  };

  const inorderTraversal = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTraversalResult([]);
    setTraversalType('Inorder (Left-Root-Right)');
    setCurrentStep('Starting inorder traversal...');
    
    const result: number[] = [];
    
    const traverse = async (nodeId: string | null): Promise<void> => {
      if (!nodeId) return;
      
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;
      
      // Left
      if (node.left) {
        setCurrentStep(`Traversing left subtree of ${node.value}`);
        await traverse(node.left);
      }
      
      // Root
      await highlightNode(nodeId, 800);
      setCurrentStep(`Visiting node ${node.value}`);
      result.push(node.value);
      setTraversalResult([...result]);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Right
      if (node.right) {
        setCurrentStep(`Traversing right subtree of ${node.value}`);
        await traverse(node.right);
      }
    };
    
    await traverse(rootId);
    setCurrentStep(`Inorder traversal complete: [${result.join(', ')}]`);
    setIsAnimating(false);
    setTimeout(() => setCurrentStep(''), 3000);
  };

  const preorderTraversal = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTraversalResult([]);
    setTraversalType('Preorder (Root-Left-Right)');
    setCurrentStep('Starting preorder traversal...');
    
    const result: number[] = [];
    
    const traverse = async (nodeId: string | null): Promise<void> => {
      if (!nodeId) return;
      
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;
      
      // Root
      await highlightNode(nodeId, 800);
      setCurrentStep(`Visiting node ${node.value}`);
      result.push(node.value);
      setTraversalResult([...result]);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Left
      if (node.left) {
        setCurrentStep(`Traversing left subtree of ${node.value}`);
        await traverse(node.left);
      }
      
      // Right
      if (node.right) {
        setCurrentStep(`Traversing right subtree of ${node.value}`);
        await traverse(node.right);
      }
    };
    
    await traverse(rootId);
    setCurrentStep(`Preorder traversal complete: [${result.join(', ')}]`);
    setIsAnimating(false);
    setTimeout(() => setCurrentStep(''), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Insert Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-green-400">+</span> Insert
          </h3>
          <div className="space-y-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isAnimating}
            />
            <motion.button
              onClick={insertNode}
              disabled={isAnimating || !inputValue}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add
            </motion.button>
          </div>
        </div>

        {/* Traversal Controls */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400">🔄</span> Inorder
          </h3>
          <motion.button
            onClick={inorderTraversal}
            disabled={isAnimating || nodes.length === 0}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            L-R-R
          </motion.button>
        </div>

        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400">🔄</span> Preorder
          </h3>
          <motion.button
            onClick={preorderTraversal}
            disabled={isAnimating || nodes.length === 0}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            R-L-R
          </motion.button>
        </div>

        {/* Traversal Result */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4">Result</h3>
          {traversalType && (
            <div className="text-xs text-gray-400 mb-2">{traversalType}</div>
          )}
          <div className="text-sm text-cyan-400 font-mono">
            {traversalResult.length > 0 ? `[${traversalResult.join(', ')}]` : 'No traversal yet'}
          </div>
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

      {/* Tree Visualization */}
      <div className="p-8 glass-dark rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🌳</span>
            </div>
            Binary Search Tree
          </h3>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-gray-300">Node</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Highlighted</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[500px] bg-gray-900/20 rounded-xl overflow-hidden">
          {/* Tree Nodes */}
          <AnimatePresence>
            {nodes.map(node => (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  x: (node.x || 400) - 32,
                  y: (node.y || 50) - 32
                }}
                exit={{ scale: 0, opacity: 0 }}
                className={`
                  absolute w-16 h-16 rounded-full border-2 cursor-pointer flex items-center justify-center
                  ${node.isHighlighted ? 'border-yellow-400 bg-gradient-to-r from-yellow-400/30 to-orange-400/30' :
                    node.isActive ? 'border-green-400 bg-gradient-to-r from-green-400/30 to-emerald-400/30' :
                    'border-purple-400 bg-gradient-to-r from-purple-400/30 to-pink-400/30'}
                `}
                whileHover={{ scale: 1.1 }}
              >
                {/* Memory Address */}
                <div className="absolute -top-8 text-xs text-gray-400 font-mono whitespace-nowrap">
                  {node.id}
                </div>
                
                {/* Value */}
                <div className="text-lg font-bold text-white">{node.value}</div>

                {/* Root indicator */}
                {node.id === rootId && (
                  <div className="absolute -bottom-8 text-xs text-purple-400 font-semibold">
                    ROOT
                  </div>
                )}

                {/* Glow effect */}
                {(node.isHighlighted || node.isActive) && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: node.isHighlighted ? 
                        'linear-gradient(45deg, #fbbf24, #f59e0b)' :
                        'linear-gradient(45deg, #10b981, #059669)',
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

          {/* Tree Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.map(node => {
              const x1 = node.x || 400;
              const y1 = node.y || 50;
              
              return (
                <g key={`edges-${node.id}`}>
                  {/* Left child edge */}
                  {node.left && (() => {
                    const leftChild = nodes.find(n => n.id === node.left);
                    if (leftChild) {
                      const x2 = leftChild.x || 400;
                      const y2 = leftChild.y || 50;
                      return (
                        <motion.line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      );
                    }
                  })()}
                  
                  {/* Right child edge */}
                  {node.right && (() => {
                    const rightChild = nodes.find(n => n.id === node.right);
                    if (rightChild) {
                      const x2 = rightChild.x || 400;
                      const y2 = rightChild.y || 50;
                      return (
                        <motion.line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      );
                    }
                  })()}
                </g>
              );
            })}
          </svg>

          {/* Empty tree indicator */}
          {nodes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="text-gray-400 text-xl">Empty Tree</div>
              <div className="text-gray-500 text-sm mt-2">Insert nodes to build the tree</div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Memory Visualization */}
      <MemoryVisualizer 
        memoryBlocks={memoryBlocks} 
        title="Memory Layout - Binary Tree"
      />

      {/* Complexity Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Search</h4>
          <div className="text-3xl font-bold text-yellow-400 mb-2">O(h)</div>
          <div className="text-sm text-gray-400">Height dependent</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Insert</h4>
          <div className="text-3xl font-bold text-green-400 mb-2">O(h)</div>
          <div className="text-sm text-gray-400">Height dependent</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Traversal</h4>
          <div className="text-3xl font-bold text-blue-400 mb-2">O(n)</div>
          <div className="text-sm text-gray-400">Visit all nodes</div>
        </div>
      </div>
    </div>
  );
} 