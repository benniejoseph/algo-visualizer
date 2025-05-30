'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MemoryVisualizer from './MemoryVisualizer';

interface HashEntry {
  key: string;
  value: number;
  address: string;
  isActive?: boolean;
  isHighlighted?: boolean;
}

interface HashBucket {
  index: number;
  entries: HashEntry[];
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

export default function HashTableVisualizer() {
  const [tableSize] = useState<number>(8);
  const [hashTable, setHashTable] = useState<HashBucket[]>(() => 
    Array.from({ length: 8 }, (_, i) => ({ index: i, entries: [] }))
  );
  
  const [inputKey, setInputKey] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [searchKey, setSearchKey] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hashDetails, setHashDetails] = useState<string>('');

  // Simple hash function
  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % tableSize;
  };

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
    
    // Add hash table entries to memory
    hashTable.forEach((bucket, bucketIndex) => {
      bucket.entries.forEach((entry, entryIndex) => {
        usedAddresses.add(entry.address);
        blocks.push({
          address: entry.address,
          value: `${entry.key}:${entry.value}`,
          type: 'data',
          isActive: entry.isActive,
          isHighlighted: entry.isHighlighted,
          label: `Bucket[${bucketIndex}][${entryIndex}]`
        });
      });
    });

    // Generate free memory blocks
    const baseAddr = 0x4100;
    for (let i = 0; i < 8; i++) {
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
  }, [hashTable]);

  const generateUniqueEntryAddress = (): string => {
    const existingAddresses = new Set<string>();
    hashTable.forEach(bucket => {
      bucket.entries.forEach(entry => {
        existingAddresses.add(entry.address);
      });
    });
    
    let baseAddr = 0x4000;
    while (existingAddresses.has(`0x${baseAddr.toString(16).toUpperCase()}`)) {
      baseAddr += 4;
    }
    
    return `0x${baseAddr.toString(16).toUpperCase()}`;
  };

  const highlightBucket = async (index: number, duration: number = 1000) => {
    setHashTable(prev => prev.map((bucket, i) => 
      i === index ? { ...bucket, isHighlighted: true } : { ...bucket, isHighlighted: false }
    ));
    
    setTimeout(() => {
      setHashTable(prev => prev.map(bucket => ({ ...bucket, isHighlighted: false })));
    }, duration);
  };

  const insert = async () => {
    if (!inputKey || !inputValue || isAnimating) return;
    
    setIsAnimating(true);
    const key = inputKey;
    const value = parseInt(inputValue);
    
    setCurrentStep(`Inserting key "${key}" with value ${value}...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Calculate hash
    const hashValue = hashFunction(key);
    setHashDetails(`Hash("${key}") = ${hashValue}`);
    setCurrentStep(`Hash function: "${key}" → ${hashValue}`);
    
    await highlightBucket(hashValue, 1500);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if key already exists
    const bucket = hashTable[hashValue];
    const existingEntry = bucket.entries.find(entry => entry.key === key);
    
    if (existingEntry) {
      setCurrentStep(`Key "${key}" already exists, updating value...`);
      setHashTable(prev => prev.map((bucket, i) => 
        i === hashValue ? {
          ...bucket,
          entries: bucket.entries.map(entry => 
            entry.key === key ? { ...entry, value, isActive: true } : entry
          )
        } : bucket
      ));
      
      setTimeout(() => {
        setHashTable(prev => prev.map(bucket => ({
          ...bucket,
          entries: bucket.entries.map(entry => ({ ...entry, isActive: false }))
        })));
      }, 1000);
    } else {
      setCurrentStep(`Adding new entry to bucket ${hashValue}...`);
      const newEntry: HashEntry = {
        key,
        value,
        address: generateUniqueEntryAddress(),
        isActive: true
      };
      
      setHashTable(prev => prev.map((bucket, i) => 
        i === hashValue ? {
          ...bucket,
          entries: [...bucket.entries, newEntry]
        } : bucket
      ));
      
      setTimeout(() => {
        setHashTable(prev => prev.map(bucket => ({
          ...bucket,
          entries: bucket.entries.map(entry => ({ ...entry, isActive: false }))
        })));
      }, 1000);
    }
    
    setCurrentStep('Insert complete!');
    setInputKey('');
    setInputValue('');
    setIsAnimating(false);
    
    setTimeout(() => {
      setCurrentStep('');
      setHashDetails('');
    }, 2000);
  };

  const search = async () => {
    if (!searchKey || isAnimating) return;
    
    setIsAnimating(true);
    const key = searchKey;
    
    setCurrentStep(`Searching for key "${key}"...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Calculate hash
    const hashValue = hashFunction(key);
    setHashDetails(`Hash("${key}") = ${hashValue}`);
    setCurrentStep(`Hash function: "${key}" → bucket ${hashValue}`);
    
    await highlightBucket(hashValue, 1500);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Search in bucket
    const bucket = hashTable[hashValue];
    const entry = bucket.entries.find(entry => entry.key === key);
    
    if (entry) {
      setCurrentStep(`Found "${key}" with value ${entry.value} at ${entry.address}`);
      setHashTable(prev => prev.map((bucket, i) => 
        i === hashValue ? {
          ...bucket,
          entries: bucket.entries.map(e => 
            e.key === key ? { ...e, isHighlighted: true } : e
          )
        } : bucket
      ));
      
      setTimeout(() => {
        setHashTable(prev => prev.map(bucket => ({
          ...bucket,
          entries: bucket.entries.map(entry => ({ ...entry, isHighlighted: false }))
        })));
      }, 2000);
    } else {
      setCurrentStep(`Key "${key}" not found in bucket ${hashValue}`);
    }
    
    setSearchKey('');
    setIsAnimating(false);
    
    setTimeout(() => {
      setCurrentStep('');
      setHashDetails('');
    }, 3000);
  };

  const deleteKey = async (key: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStep(`Deleting key "${key}"...`);
    
    const hashValue = hashFunction(key);
    setHashDetails(`Hash("${key}") = ${hashValue}`);
    
    await highlightBucket(hashValue, 1000);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setHashTable(prev => prev.map((bucket, i) => 
      i === hashValue ? {
        ...bucket,
        entries: bucket.entries.filter(entry => entry.key !== key)
      } : bucket
    ));
    
    setCurrentStep(`Deleted "${key}" from bucket ${hashValue}`);
    setIsAnimating(false);
    
    setTimeout(() => {
      setCurrentStep('');
      setHashDetails('');
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Insert Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-green-400">+</span> Insert
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Key"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isAnimating}
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Value"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isAnimating}
              />
              <motion.button
                onClick={insert}
                disabled={isAnimating || !inputKey || !inputValue}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Control */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400">🔍</span> Search
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Key to search"
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isAnimating}
            />
            <motion.button
              onClick={search}
              disabled={isAnimating || !searchKey}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find
            </motion.button>
          </div>
        </div>

        {/* Hash Function Info */}
        <div className="p-6 glass-dark rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400">#</span> Hash Function
          </h3>
          <div className="text-sm text-gray-300 mb-2">
            Sum of ASCII values mod {tableSize}
          </div>
          <div className="text-sm text-cyan-400 font-mono">
            {hashDetails || 'Enter a key to see hash calculation'}
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

      {/* Hash Table Visualization */}
      <div className="p-8 glass-dark rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">#️⃣</span>
            </div>
            Hash Table (Chaining)
          </h3>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cyan-500 rounded"></div>
              <span className="text-gray-300">Bucket</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-300">Entry</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {hashTable.map((bucket, index) => (
            <motion.div
              key={index}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300
                ${bucket.isHighlighted 
                  ? 'border-yellow-400 bg-gradient-to-r from-yellow-400/20 to-orange-400/20' 
                  : 'border-cyan-400 bg-gradient-to-r from-cyan-400/10 to-blue-400/10'}
              `}
              whileHover={{ scale: 1.02 }}
            >
              {/* Bucket Header */}
              <div className="text-center mb-3">
                <div className="text-sm text-gray-400">Bucket</div>
                <div className="text-xl font-bold text-cyan-400">{index}</div>
              </div>

              {/* Entries */}
              <div className="space-y-2 min-h-[100px]">
                <AnimatePresence>
                  {bucket.entries.map((entry) => (
                    <motion.div
                      key={`${entry.key}-${entry.address}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={`
                        p-3 rounded-lg border cursor-pointer group
                        ${entry.isHighlighted 
                          ? 'border-yellow-400 bg-yellow-400/20' 
                          : entry.isActive
                          ? 'border-green-400 bg-green-400/20'
                          : 'border-gray-500 bg-gray-500/10'}
                      `}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => deleteKey(entry.key)}
                    >
                      {/* Memory Address */}
                      <div className="text-xs text-gray-400 font-mono mb-1">
                        {entry.address}
                      </div>
                      
                      {/* Key-Value */}
                      <div className="text-sm">
                        <div className="text-white font-semibold">{entry.key}</div>
                        <div className="text-gray-300">{entry.value}</div>
                      </div>

                      {/* Delete hint */}
                      <div className="text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                        Click to delete
                      </div>

                      {/* Glow effect */}
                      {(entry.isHighlighted || entry.isActive) && (
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: entry.isHighlighted ? 
                              'linear-gradient(45deg, #fbbf24, #f59e0b)' :
                              'linear-gradient(45deg, #10b981, #059669)',
                            filter: 'blur(10px)',
                            opacity: 0.3,
                            zIndex: -1,
                          }}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty bucket indicator */}
                {bucket.entries.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-2xl mb-2">∅</div>
                    <div className="text-xs">Empty</div>
                  </div>
                )}
              </div>

              {/* Collision indicator */}
              {bucket.entries.length > 1 && (
                <div className="mt-2 text-center">
                  <div className="text-xs text-orange-400">
                    Collision ({bucket.entries.length} items)
                  </div>
                </div>
              )}

              {/* Glow effect for highlighted bucket */}
              {bucket.isHighlighted && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                    filter: 'blur(15px)',
                    opacity: 0.2,
                    zIndex: -1,
                  }}
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4 glass rounded-lg">
            <div className="text-sm text-gray-400">Total Entries</div>
            <div className="text-2xl font-bold text-cyan-400">
              {hashTable.reduce((sum, bucket) => sum + bucket.entries.length, 0)}
            </div>
          </div>
          
          <div className="text-center p-4 glass rounded-lg">
            <div className="text-sm text-gray-400">Used Buckets</div>
            <div className="text-2xl font-bold text-green-400">
              {hashTable.filter(bucket => bucket.entries.length > 0).length}
            </div>
          </div>
          
          <div className="text-center p-4 glass rounded-lg">
            <div className="text-sm text-gray-400">Collisions</div>
            <div className="text-2xl font-bold text-orange-400">
              {hashTable.filter(bucket => bucket.entries.length > 1).length}
            </div>
          </div>
        </div>
      </div>

      {/* Memory Visualization */}
      <MemoryVisualizer 
        memoryBlocks={memoryBlocks} 
        title="Memory Layout - Hash Table"
      />

      {/* Complexity Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Insert</h4>
          <div className="text-3xl font-bold text-green-400 mb-2">O(1)*</div>
          <div className="text-sm text-gray-400">Average case</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Search</h4>
          <div className="text-3xl font-bold text-blue-400 mb-2">O(1)*</div>
          <div className="text-sm text-gray-400">Average case</div>
        </div>
        
        <div className="p-6 glass-dark rounded-xl text-center">
          <h4 className="text-lg font-bold text-white mb-3">Delete</h4>
          <div className="text-3xl font-bold text-red-400 mb-2">O(1)*</div>
          <div className="text-sm text-gray-400">Average case</div>
        </div>
      </div>
    </div>
  );
} 