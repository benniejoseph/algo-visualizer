'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MemoryVisualizer from './MemoryVisualizer';

interface ListNode {
  id: string;
  value: number;
  next: string | null;
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

export default function LinkedListVisualizer() {
  const [nodes, setNodes] = useState<ListNode[]>([
    { id: '0x1000', value: 10, next: '0x1008' },
    { id: '0x1008', value: 20, next: '0x1010' },
    { id: '0x1010', value: 30, next: null }
  ]);
  
  const [headPointer, setHeadPointer] = useState<string>('0x1000');
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Generate memory blocks for visualization
  const generateMemoryBlocks = (): MemoryBlock[] => {
    const blocks: MemoryBlock[] = [];
    const usedAddresses = new Set<string>();
    
    // Helper function to generate unique address
    const generateUniqueAddress = (baseAddr: number): string => {
      let addr = `0x${baseAddr.toString(16).toUpperCase()}`;
      while (usedAddresses.has(addr)) {
        baseAddr += 4;
        addr = `0x${baseAddr.toString(16).toUpperCase()}`;
      }
      usedAddresses.add(addr);
      return addr;
    };
    
    // Add nodes to memory with proper spacing
    nodes.forEach((node, index) => {
      // Data block - use the node's actual address
      usedAddresses.add(node.id);
      blocks.push({
        address: node.id,
        value: node.value,
        type: 'data',
        isActive: node.isActive,
        isHighlighted: node.isHighlighted,
        label: `Node ${index + 1}`
      });
      
      // Pointer block - generate unique address after the data block
      const dataAddr = parseInt(node.id, 16);
      const ptrAddress = generateUniqueAddress(dataAddr + 4);
      
      blocks.push({
        address: ptrAddress,
        value: node.next || 'NULL',
        type: 'pointer',
        pointsTo: node.next || undefined,
        label: 'next'
      });
    });

    // Generate free memory blocks that don't conflict with node addresses
    const freeAddresses = [];
    
    // Start from a safe base address that won't conflict
    const baseAddr = 0x1200; // Start well above potential node addresses
    for (let i = 0; i < 6; i++) {
      const addr = generateUniqueAddress(baseAddr + i * 8);
      freeAddresses.push(addr);
    }
    
    freeAddresses.forEach(addr => {
      blocks.push({
        address: addr,
        value: null,
        type: 'free'
      });
    });

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

  // Helper function to generate unique node address
  const generateUniqueNodeAddress = (): string => {
    const existingAddresses = new Set(nodes.map(node => node.id));
    let baseAddr = 0x0FF8; // Start from a base address and work backwards
    
    while (existingAddresses.has(`0x${baseAddr.toString(16).toUpperCase()}`)) {
      baseAddr -= 8; // Ensure 8-byte spacing for data + pointer
    }
    
    return `0x${baseAddr.toString(16).toUpperCase()}`;
  };

  const insertAtBeginning = async () => {
    if (!inputValue || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStep('Creating new node...');
    
    const newNodeId = generateUniqueNodeAddress();
    const newNode: ListNode = {
      id: newNodeId,
      value: parseInt(inputValue),
      next: headPointer,
      isActive: true
    };

    // Animate node creation
    setNodes(prev => [newNode, ...prev]);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Updating head pointer...');
    setHeadPointer(newNodeId);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Insert complete!');
    setNodes(prev => prev.map(node => ({ ...node, isActive: false })));
    setInputValue('');
    setIsAnimating(false);
    
    setTimeout(() => setCurrentStep(''), 1000);
  };

  const deleteFromBeginning = async () => {
    if (nodes.length === 0 || isAnimating || !headPointer) return;
    
    setIsAnimating(true);
    setCurrentStep('Highlighting node to delete...');
    
    await highlightNode(headPointer);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentStep('Updating head pointer...');
    const firstNode = nodes.find(n => n.id === headPointer);
    const oldHeadPointer = headPointer;
    if (firstNode?.next) {
      setHeadPointer(firstNode.next);
    } else {
      setHeadPointer('');
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Freeing memory...');
    setNodes(prev => prev.filter(node => node.id !== oldHeadPointer));
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep('Delete complete!');
    setIsAnimating(false);
    
    setTimeout(() => setCurrentStep(''), 1000);
  };

  const searchNode = async () => {
    if (!searchValue || isAnimating) return;
    
    setIsAnimating(true);
    const target = parseInt(searchValue);
    let currentId: string | null = headPointer;
    let steps = 0;
    
    setCurrentStep(`Searching for ${target}...`);
    
    while (currentId) {
      const currentNode = nodes.find(n => n.id === currentId);
      if (!currentNode) break;
      
      await highlightNode(currentId, 800);
      steps++;
      
      setCurrentStep(`Step ${steps}: Checking node at ${currentId} (value: ${currentNode.value})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (currentNode.value === target) {
        setCurrentStep(`Found ${target} at ${currentId} in ${steps} steps!`);
        setIsAnimating(false);
        setTimeout(() => setCurrentStep(''), 2000);
        return;
      }
      
      currentId = currentNode.next;
    }
    
    setCurrentStep(`${target} not found after ${steps} steps.`);
    setIsAnimating(false);
    setTimeout(() => setCurrentStep(''), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Insert Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-green-400">+</span> Insert Node
          </h3>
          <div className="flex gap-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isAnimating}
            />
            <motion.button
              onClick={insertAtBeginning}
              disabled={isAnimating || !inputValue}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Insert
            </motion.button>
          </div>
        </div>

        {/* Delete Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-400">-</span> Delete Node
          </h3>
          <motion.button
            onClick={deleteFromBeginning}
            disabled={isAnimating || nodes.length === 0}
            className="w-full px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Delete First
          </motion.button>
        </div>

        {/* Search Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400">🔍</span> Search Node
          </h3>
          <div className="flex gap-3">
            <input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search value"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isAnimating}
            />
            <motion.button
              onClick={searchNode}
              disabled={isAnimating || !searchValue}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
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

      {/* Linked List Visualization */}
      <div className="p-8 glass-dark rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🔗</span>
            </div>
            Linked List Structure
          </h3>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-300">Data Node</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-300">Pointer</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          {/* Head Pointer */}
          <motion.div
            className="flex flex-col items-center gap-2 min-w-[80px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-sm text-gray-400">HEAD</div>
            <motion.div 
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              PTR
            </motion.div>
            <div className="text-xs text-gray-400 font-mono">{headPointer}</div>
          </motion.div>

          {/* Arrow from HEAD */}
          {nodes.length > 0 && (
            <motion.div 
              className="text-2xl text-green-400"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.div>
          )}

          {/* Nodes */}
          <AnimatePresence>
            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center gap-4"
              >
                {/* Node */}
                <motion.div
                  className={`
                    relative p-6 rounded-xl border-2 min-w-[120px]
                    ${node.isHighlighted ? 'border-yellow-400 bg-gradient-to-r from-yellow-400/20 to-orange-400/20' :
                      node.isActive ? 'border-green-400 bg-gradient-to-r from-green-400/20 to-emerald-400/20' :
                      'border-blue-400 bg-gradient-to-r from-blue-400/20 to-indigo-400/20'}
                  `}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Memory Address */}
                  <div className="text-xs text-gray-400 font-mono mb-2">{node.id}</div>
                  
                  {/* Value */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">{node.value}</div>
                    <div className="text-xs text-gray-400">data</div>
                  </div>

                  {/* Next Pointer */}
                  <div className="mt-4 p-2 bg-purple-500/20 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">next</div>
                    <div className="text-xs font-mono text-purple-300">
                      {node.next || 'NULL'}
                    </div>
                  </div>

                  {/* Glow effect */}
                  {(node.isHighlighted || node.isActive) && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: node.isHighlighted ? 
                          'linear-gradient(45deg, #fbbf24, #f59e0b)' :
                          'linear-gradient(45deg, #10b981, #059669)',
                        filter: 'blur(20px)',
                        opacity: 0.3,
                        zIndex: -1,
                      }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </motion.div>

                {/* Arrow to next node */}
                {node.next && index < nodes.length - 1 && (
                  <motion.div 
                    className="text-2xl text-purple-400"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.2 }}
                  >
                    →
                  </motion.div>
                )}

                {/* NULL indicator */}
                {!node.next && (
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-lg text-gray-400">→</div>
                    <div className="px-3 py-1 bg-gray-700 rounded-lg text-gray-300 text-sm">
                      NULL
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty list indicator */}
          {nodes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="text-lg text-gray-400">→</div>
              <div className="px-4 py-2 bg-gray-700 rounded-lg text-gray-300">
                Empty List (NULL)
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Memory Visualization */}
      <MemoryVisualizer 
        memoryBlocks={memoryBlocks} 
        title="Memory Layout - Linked List"
      />

      {/* Complexity Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Access</h4>
          <div className="text-3xl font-bold text-red-400 mb-2">O(n)</div>
          <div className="text-sm text-gray-400">Must traverse from head</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Insertion</h4>
          <div className="text-3xl font-bold text-green-400 mb-2">O(1)</div>
          <div className="text-sm text-gray-400">At beginning (constant time)</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Deletion</h4>
          <div className="text-3xl font-bold text-yellow-400 mb-2">O(1)</div>
          <div className="text-sm text-gray-400">At beginning (constant time)</div>
        </div>
      </div>
    </div>
  );
} 