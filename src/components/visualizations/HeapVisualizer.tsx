'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MemoryVisualizer from './MemoryVisualizer';

interface HeapNode {
  id: string;
  value: number;
  index: number;
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

export default function HeapVisualizer() {
  const [heap, setHeap] = useState<HeapNode[]>([
    { id: '0x5000', value: 10, index: 0 },
    { id: '0x5004', value: 15, index: 1 },
    { id: '0x5008', value: 20, index: 2 },
    { id: '0x500C', value: 17, index: 3 },
    { id: '0x5010', value: 25, index: 4 }
  ]);
  
  const [heapType, setHeapType] = useState<'min' | 'max'>('min');
  const [inputValue, setInputValue] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Calculate node positions for tree visualization
  const calculatePositions = () => {
    if (heap.length === 0) return;
    
    // Container dimensions - leave margins for nodes
    const containerWidth = 800;
    const containerHeight = 400;
    const nodeRadius = 32;
    const levelHeight = 80;
    
    const getPosition = (index: number, level: number = 0) => {
      if (index >= heap.length) return { x: 0, y: 0 };
      
      const nodesAtLevel = Math.pow(2, level);
      const positionInLevel = index - (Math.pow(2, level) - 1);
      
      // Calculate spacing based on available width and level
      const availableWidth = containerWidth - (nodeRadius * 2 + 40); // Leave margins
      const spacing = availableWidth / Math.max(1, nodesAtLevel - 1);
      
      let x, y;
      
      if (nodesAtLevel === 1) {
        // Root node - center it
        x = containerWidth / 2;
      } else {
        // Calculate position within the level
        const startX = nodeRadius + 20;
        x = startX + positionInLevel * spacing;
        // Ensure x is within bounds
        x = Math.max(nodeRadius + 20, Math.min(x, containerWidth - nodeRadius - 20));
      }
      
      y = 60 + level * levelHeight;
      // Ensure y is within bounds
      y = Math.max(nodeRadius + 20, Math.min(y, containerHeight - nodeRadius - 20));
      
      return { x, y };
    };

    // Only update positions without creating new heap objects
    setHeap(prev => prev.map((node, index) => {
      const level = Math.floor(Math.log2(index + 1));
      const pos = getPosition(index, level);
      if (node.x !== pos.x || node.y !== pos.y) {
        return { ...node, x: pos.x, y: pos.y };
      }
      return node;
    }));
  };

  useEffect(() => {
    if (heap.length > 0) {
      calculatePositions();
    }
  }, [heap.length]);

  // Generate memory blocks for visualization
  const generateMemoryBlocks = (): MemoryBlock[] => {
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
    
    // Add heap nodes to memory (showing array representation)
    heap.forEach((node, index) => {
      usedAddresses.add(node.id);
      blocks.push({
        address: node.id,
        value: node.value,
        type: 'data',
        isActive: node.isActive,
        isHighlighted: node.isHighlighted,
        label: `arr[${index}]`
      });
    });

    // Generate free memory blocks
    const baseAddr = 0x5100;
    for (let i = 0; i < 6; i++) {
      const addr = generateUniqueAddress(baseAddr + i * 8);
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
  }, [heap]);

  const generateUniqueNodeAddress = (): string => {
    const existingAddresses = new Set(heap.map(node => node.id));
    let baseAddr = 0x5020;
    
    while (existingAddresses.has(`0x${baseAddr.toString(16).toUpperCase()}`)) {
      baseAddr += 4;
    }
    
    return `0x${baseAddr.toString(16).toUpperCase()}`;
  };

  const highlightNode = async (index: number, duration: number = 1000) => {
    setHeap(prev => prev.map((node, i) => 
      i === index ? { ...node, isHighlighted: true } : { ...node, isHighlighted: false }
    ));
    
    setTimeout(() => {
      setHeap(prev => prev.map(node => ({ ...node, isHighlighted: false })));
    }, duration);
  };

  const insert = async () => {
    if (!inputValue || isAnimating) return;
    
    setIsAnimating(true);
    const value = parseInt(inputValue);
    setCurrentStep(`Inserting ${value} into ${heapType} heap...`);
    
    const newNode: HeapNode = {
      id: generateUniqueNodeAddress(),
      value,
      index: heap.length,
      isActive: true
    };
    
    // Add the new node and wait for state update
    const newHeap = [...heap, newNode];
    setHeap(newHeap);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep(`Added ${value} at the end of the array`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (newHeap.length > 1) {
      setCurrentStep('Heapifying up to maintain heap property...');
      // Use the correct index (newHeap.length - 1, which is the index of the newly added element)
      await heapifyUpWithHeap(newHeap.length - 1, newHeap);
    }
    
    // Clear active state and recalculate positions
    setHeap(prev => prev.map(node => ({ ...node, isActive: false })));
    
    setCurrentStep('Insert complete!');
    setInputValue('');
    setIsAnimating(false);
    
    setTimeout(() => setCurrentStep(''), 1000);
  };

  // Helper function to heapify up with a specific heap array
  const heapifyUpWithHeap = async (index: number, heapArray: HeapNode[]) => {
    if (index <= 0) return;
    
    const parentIndex = Math.floor((index - 1) / 2);
    const current = heapArray[index];
    const parent = heapArray[parentIndex];
    
    if (!current || !parent) return;
    
    const shouldSwap = heapType === 'min' ? 
      current.value < parent.value : 
      current.value > parent.value;
    
    if (shouldSwap) {
      setCurrentStep(`Comparing ${current.value} with parent ${parent.value}`);
      await swapWithHeap(index, parentIndex, heapArray);
      // Get updated heap array after swap
      const updatedHeap = [...heapArray];
      [updatedHeap[index], updatedHeap[parentIndex]] = [updatedHeap[parentIndex], updatedHeap[index]];
      updatedHeap[index].index = index;
      updatedHeap[parentIndex].index = parentIndex;
      setHeap(updatedHeap);
      await heapifyUpWithHeap(parentIndex, updatedHeap);
    }
  };

  // Helper function to swap with a specific heap array
  const swapWithHeap = async (i: number, j: number, heapArray: HeapNode[]) => {
    if (i >= heapArray.length || j >= heapArray.length) return;
    
    await highlightNode(i, 500);
    await new Promise(resolve => setTimeout(resolve, 300));
    await highlightNode(j, 500);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCurrentStep(`Swapped elements at indices ${i} and ${j}`);
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const extractRoot = async () => {
    if (heap.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    const rootValue = heap[0].value;
    setCurrentStep(`Extracting ${heapType === 'min' ? 'minimum' : 'maximum'} value: ${rootValue}`);
    
    await highlightNode(0, 1000);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (heap.length === 1) {
      setHeap([]);
      setCurrentStep('Heap is now empty');
    } else {
      setCurrentStep('Moving last element to root...');
      const newHeap = [...heap];
      newHeap[0] = { ...newHeap[newHeap.length - 1], index: 0 };
      const finalHeap = newHeap.slice(0, -1).map((node, i) => ({ ...node, index: i }));
      setHeap(finalHeap);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep('Heapifying down to restore heap property...');
      await heapifyDownWithHeap(0, finalHeap);
    }
    
    setCurrentStep(`Extract complete! Removed ${rootValue}`);
    setIsAnimating(false);
    
    setTimeout(() => setCurrentStep(''), 2000);
  };

  // Helper function to heapify down with a specific heap array
  const heapifyDownWithHeap = async (index: number, heapArray: HeapNode[]) => {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let targetIndex = index;
    
    if (leftChild < heapArray.length) {
      const shouldUseLeft = heapType === 'min' ? 
        heapArray[leftChild].value < heapArray[targetIndex].value :
        heapArray[leftChild].value > heapArray[targetIndex].value;
      
      if (shouldUseLeft) {
        targetIndex = leftChild;
      }
    }
    
    if (rightChild < heapArray.length) {
      const shouldUseRight = heapType === 'min' ? 
        heapArray[rightChild].value < heapArray[targetIndex].value :
        heapArray[rightChild].value > heapArray[targetIndex].value;
      
      if (shouldUseRight) {
        targetIndex = rightChild;
      }
    }
    
    if (targetIndex !== index) {
      setCurrentStep(`Moving ${heapArray[targetIndex].value} up to maintain heap property`);
      await swapWithHeap(index, targetIndex, heapArray);
      // Get updated heap array after swap
      const updatedHeap = [...heapArray];
      [updatedHeap[index], updatedHeap[targetIndex]] = [updatedHeap[targetIndex], updatedHeap[index]];
      updatedHeap[index].index = index;
      updatedHeap[targetIndex].index = targetIndex;
      setHeap(updatedHeap);
      await heapifyDownWithHeap(targetIndex, updatedHeap);
    }
  };

  const peek = async () => {
    if (heap.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    const rootValue = heap[0].value;
    
    await highlightNode(0, 2000);
    setCurrentStep(`${heapType === 'min' ? 'Minimum' : 'Maximum'} value: ${rootValue}`);
    
    setTimeout(() => {
      setCurrentStep('');
      setIsAnimating(false);
    }, 2000);
  };

  const toggleHeapType = () => {
    if (isAnimating) return;
    
    setHeapType(prev => prev === 'min' ? 'max' : 'min');
    setCurrentStep(`Switched to ${heapType === 'min' ? 'max' : 'min'} heap`);
    setTimeout(() => setCurrentStep(''), 1500);
  };

  const getLeftChild = (index: number) => 2 * index + 1;
  const getRightChild = (index: number) => 2 * index + 2;

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
              onClick={insert}
              disabled={isAnimating || !inputValue}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add
            </motion.button>
          </div>
        </div>

        {/* Extract Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-400">↑</span> Extract
          </h3>
          <motion.button
            onClick={extractRoot}
            disabled={isAnimating || heap.length === 0}
            className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Extract {heapType === 'min' ? 'Min' : 'Max'}
          </motion.button>
        </div>

        {/* Peek Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400">👁</span> Peek
          </h3>
          <motion.button
            onClick={peek}
            disabled={isAnimating || heap.length === 0}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Peek
          </motion.button>
        </div>

        {/* Heap Type Toggle */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400">🔄</span> Type
          </h3>
          <motion.button
            onClick={toggleHeapType}
            disabled={isAnimating}
            className={`w-full px-4 py-2 rounded-lg font-semibold disabled:opacity-50 transition-all duration-300 ${
              heapType === 'min' 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg hover:shadow-blue-500/25'
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-500/25'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {heapType.toUpperCase()} Heap
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

      {/* Heap Visualization */}
      <div className="p-8 glass-dark rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🏔️</span>
            </div>
            {heapType.toUpperCase()} Heap Tree
          </h3>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">Node</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Highlighted</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[400px] bg-gray-900/20 rounded-xl overflow-hidden mb-8">
          {/* Tree Nodes */}
          <AnimatePresence>
            {heap.map((node, index) => (
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
                    'border-red-400 bg-gradient-to-r from-red-400/30 to-pink-400/30'}
                `}
                whileHover={{ scale: 1.1 }}
              >
                {/* Array Index */}
                <div className="absolute -top-8 text-xs text-gray-400 font-mono">
                  [{index}]
                </div>
                
                {/* Value */}
                <div className="text-lg font-bold text-white">{node.value}</div>

                {/* Memory Address */}
                <div className="absolute -bottom-8 text-xs text-gray-400 font-mono whitespace-nowrap">
                  {node.id}
                </div>

                {/* Root indicator */}
                {index === 0 && (
                  <div className="absolute -bottom-12 text-xs text-red-400 font-semibold">
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
            {heap.map((node, index) => {
              const leftChildIndex = getLeftChild(index);
              const rightChildIndex = getRightChild(index);
              
              return (
                <g key={`edges-${node.id}`}>
                  {/* Left child edge */}
                  {leftChildIndex < heap.length && (() => {
                    const leftChild = heap[leftChildIndex];
                    const x1 = node.x || 400;
                    const y1 = node.y || 50;
                    const x2 = leftChild.x || 400;
                    const y2 = leftChild.y || 50;
                    
                    return (
                      <motion.line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#ef4444"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    );
                  })()}
                  
                  {/* Right child edge */}
                  {rightChildIndex < heap.length && (() => {
                    const rightChild = heap[rightChildIndex];
                    const x1 = node.x || 400;
                    const y1 = node.y || 50;
                    const x2 = rightChild.x || 400;
                    const y2 = rightChild.y || 50;
                    
                    return (
                      <motion.line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#ef4444"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    );
                  })()}
                </g>
              );
            })}
          </svg>

          {/* Empty heap indicator */}
          {heap.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="text-gray-400 text-xl">Empty Heap</div>
              <div className="text-gray-500 text-sm mt-2">Insert elements to build the heap</div>
            </motion.div>
          )}
        </div>

        {/* Array Representation */}
        <div className="mt-8">
          <h4 className="text-lg font-bold text-white mb-4">Array Representation</h4>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {heap.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={`
                    w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer
                    ${node.isHighlighted ? 'border-yellow-400 bg-yellow-400/20' :
                      node.isActive ? 'border-green-400 bg-green-400/20' :
                      'border-red-400 bg-red-400/20'}
                  `}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-xs text-gray-400">[{index}]</div>
                  <div className="text-sm font-bold text-white">{node.value}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Memory Visualization */}
      <MemoryVisualizer 
        memoryBlocks={memoryBlocks} 
        title="Memory Layout - Heap (Array Based)"
      />

      {/* Complexity Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Insert</h4>
          <div className="text-3xl font-bold text-green-400 mb-2">O(log n)</div>
          <div className="text-sm text-gray-400">Heapify up operation</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Extract</h4>
          <div className="text-3xl font-bold text-red-400 mb-2">O(log n)</div>
          <div className="text-sm text-gray-400">Heapify down operation</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Peek</h4>
          <div className="text-3xl font-bold text-blue-400 mb-2">O(1)</div>
          <div className="text-sm text-gray-400">Constant time access</div>
        </div>
      </div>
    </div>
  );
} 