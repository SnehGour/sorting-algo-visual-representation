"use client";
import { useState } from 'react';

export default function SortingAlgorithmsVisualization() {
  const [algorithmView, setAlgorithmView] = useState('bubble');
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [isPlaying, setIsPlaying] = useState(false);
  const [initialArray] = useState([5, 3, 8, 4, 2]);
  
  // Generate steps for each algorithm
  const bubbleSortSteps = generateBubbleSortSteps([...initialArray]);
  const insertionSortSteps = generateInsertionSortSteps([...initialArray]);
  const selectionSortSteps = generateSelectionSortSteps([...initialArray]);
  
  // Get current algorithm's steps
  const getSteps = () => {
    switch(algorithmView) {
      case 'bubble': return bubbleSortSteps;
      case 'insertion': return insertionSortSteps;
      case 'selection': return selectionSortSteps;
      default: return bubbleSortSteps;
    }
  };
  
  const steps = getSteps();
  const maxSteps = steps.length;
  
  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };
  
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    
    if (currentStep >= maxSteps - 1) {
      setCurrentStep(0);
    }
    
    setIsPlaying(true);
    playAnimation();
  };
  
  const playAnimation = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= maxSteps - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    
    return () => clearInterval(interval);
  };
  
  const stepForward = () => {
    if (currentStep < maxSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Sorting Algorithm Visualization</h2>
      
      <div className="flex space-x-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-md ${algorithmView === 'bubble' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => { setAlgorithmView('bubble'); resetAnimation(); }}
        >
          Bubble Sort
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${algorithmView === 'insertion' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => { setAlgorithmView('insertion'); resetAnimation(); }}
        >
          Insertion Sort
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${algorithmView === 'selection' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => { setAlgorithmView('selection'); resetAnimation(); }}
        >
          Selection Sort
        </button>
      </div>
      
      <div className="mb-6 w-full">
        <div className="flex justify-center space-x-2 mb-4">
          {steps[currentStep].array.map((value, index) => {
            let bgColor = 'bg-blue-500';
            
            if (steps[currentStep].comparing && (steps[currentStep].comparing.includes(index))) {
              bgColor = 'bg-yellow-500';
            }
            
            if (steps[currentStep].swapping && steps[currentStep].swapping.includes(index)) {
              bgColor = 'bg-green-500';
            }
            
            if (steps[currentStep].sorted && steps[currentStep].sorted.includes(index)) {
              bgColor = 'bg-purple-500';
            }
            
            return (
              <div 
                key={index} 
                className={`flex items-center justify-center ${bgColor} text-white font-bold rounded-md transition-all`}
                style={{ 
                  width: '40px',
                  height: `${value * 30}px`,
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
        
        <div className="text-gray-700 bg-gray-100 p-4 rounded-md h-24 overflow-auto">
          <p>{steps[currentStep].description}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <button 
          className="px-3 py-1 bg-gray-200 rounded-md"
          onClick={stepBackward}
          disabled={currentStep === 0}
        >
          &lt;
        </button>
        
        <button 
          className={`px-3 py-1 ${isPlaying ? 'bg-red-500' : 'bg-green-500'} text-white rounded-md`}
          onClick={togglePlay}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button 
          className="px-3 py-1 bg-gray-200 rounded-md"
          onClick={stepForward}
          disabled={currentStep === maxSteps - 1}
        >
          &gt;
        </button>
        
        <span className="text-sm text-gray-600">
          Step: {currentStep + 1}/{maxSteps}
        </span>
      </div>
      
      <div className="mb-6 w-full">
        <label className="block text-sm text-gray-600 mb-1">Animation Speed:</label>
        <input 
          type="range" 
          min="100" 
          max="1000" 
          step="100" 
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-md w-full">
        <h3 className="font-bold mb-2">
          {algorithmView === 'bubble' ? 'Bubble Sort' : 
           algorithmView === 'insertion' ? 'Insertion Sort' : 'Selection Sort'}
        </h3>
        <p className="text-sm text-gray-700">
          {algorithmView === 'bubble' ? 
            'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.' : 
           algorithmView === 'insertion' ? 
            'Builds the final sorted array one item at a time by taking each element and inserting it into its correct position.' : 
            'Repeatedly selects the smallest (or largest) element from the unsorted portion and moves it to the sorted portion.'}
        </p>
        <p className="text-sm text-gray-700 mt-2">
          {algorithmView === 'bubble' ? 
            'Time Complexity: O(n²) | Space Complexity: O(1)' : 
           algorithmView === 'insertion' ? 
            'Time Complexity: O(n²) | Space Complexity: O(1)' : 
            'Time Complexity: O(n²) | Space Complexity: O(1)'}
        </p>
      </div>
    </div>
  );
}

// Generate steps for Bubble Sort
function generateBubbleSortSteps(array) {
  const steps = [];
  const n = array.length;
  let sorted = [];
  
  steps.push({
    array: [...array],
    description: `Starting bubble sort with array [${array.join(', ')}]`,
    comparing: null,
    swapping: null,
    sorted: []
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing step
      steps.push({
        array: [...array],
        description: `Comparing elements at positions ${j} and ${j+1}: ${array[j]} and ${array[j+1]}`,
        comparing: [j, j+1],
        swapping: null,
        sorted: [...sorted]
      });
      
      if (array[j] > array[j+1]) {
        // Swapping step
        steps.push({
          array: [...array],
          description: `${array[j]} > ${array[j+1]}, swapping elements`,
          comparing: [j, j+1],
          swapping: [j, j+1],
          sorted: [...sorted]
        });
        
        // Perform the swap
        [array[j], array[j+1]] = [array[j+1], array[j]];
        
        // After swap
        steps.push({
          array: [...array],
          description: `Swapped elements, new array is [${array.join(', ')}]`,
          comparing: null,
          swapping: null,
          sorted: [...sorted]
        });
      } else {
        steps.push({
          array: [...array],
          description: `${array[j]} <= ${array[j+1]}, no swap needed`,
          comparing: [j, j+1],
          swapping: null,
          sorted: [...sorted]
        });
      }
    }
    
    sorted.unshift(n - 1 - i);
    
    steps.push({
      array: [...array],
      description: `Element ${array[n-1-i]} is now in its correct position`,
      comparing: null,
      swapping: null,
      sorted: [...sorted]
    });
  }
  
  sorted.unshift(0);
  
  steps.push({
    array: [...array],
    description: `Sorting complete! Final array: [${array.join(', ')}]`,
    comparing: null,
    swapping: null,
    sorted: [...sorted]
  });
  
  return steps;
}

// Generate steps for Insertion Sort
function generateInsertionSortSteps(array) {
  const steps = [];
  const n = array.length;
  
  steps.push({
    array: [...array],
    description: `Starting insertion sort with array [${array.join(', ')}]`,
    comparing: null,
    swapping: null,
    sorted: [0]
  });
  
  for (let i = 1; i < n; i++) {
    let current = array[i];
    
    steps.push({
      array: [...array],
      description: `Taking element ${current} at position ${i} to insert into the sorted portion`,
      comparing: [i],
      swapping: null,
      sorted: Array.from({length: i}, (_, idx) => idx)
    });
    
    let j = i - 1;
    
    while (j >= 0 && array[j] > current) {
      steps.push({
        array: [...array],
        description: `Comparing ${current} with ${array[j]} at position ${j}`,
        comparing: [i, j],
        swapping: null,
        sorted: Array.from({length: i}, (_, idx) => idx)
      });
      
      steps.push({
        array: [...array],
        description: `${array[j]} > ${current}, shifting ${array[j]} to the right`,
        comparing: [i, j],
        swapping: [j, j+1],
        sorted: Array.from({length: i}, (_, idx) => idx)
      });
      
      array[j+1] = array[j];
      j--;
      
      steps.push({
        array: [...array],
        description: `Shifted element, continuing comparison`,
        comparing: [i],
        swapping: null,
        sorted: Array.from({length: i}, (_, idx) => idx)
      });
    }
    
    array[j+1] = current;
    
    steps.push({
      array: [...array],
      description: `Inserted ${current} at position ${j+1}`,
      comparing: null,
      swapping: null,
      sorted: Array.from({length: i+1}, (_, idx) => idx)
    });
  }
  
  steps.push({
    array: [...array],
    description: `Sorting complete! Final array: [${array.join(', ')}]`,
    comparing: null,
    swapping: null,
    sorted: Array.from({length: n}, (_, idx) => idx)
  });
  
  return steps;
}

// Generate steps for Selection Sort
function generateSelectionSortSteps(array) {
  const steps = [];
  const n = array.length;
  let sorted = [];
  
  steps.push({
    array: [...array],
    description: `Starting selection sort with array [${array.join(', ')}]`,
    comparing: null,
    swapping: null,
    sorted: []
  });
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    steps.push({
      array: [...array],
      description: `Looking for the minimum element in the unsorted portion starting at index ${i}`,
      comparing: [i],
      swapping: null,
      sorted: [...sorted]
    });
    
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        description: `Comparing current minimum ${array[minIndex]} with ${array[j]}`,
        comparing: [minIndex, j],
        swapping: null,
        sorted: [...sorted]
      });
      
      if (array[j] < array[minIndex]) {
        steps.push({
          array: [...array],
          description: `${array[j]} < ${array[minIndex]}, updating minimum to ${array[j]} at position ${j}`,
          comparing: [j, minIndex],
          swapping: null,
          sorted: [...sorted]
        });
        
        minIndex = j;
      } else {
        steps.push({
          array: [...array],
          description: `${array[j]} >= ${array[minIndex]}, minimum remains at position ${minIndex}`,
          comparing: [minIndex, j],
          swapping: null,
          sorted: [...sorted]
        });
      }
    }
    
    if (minIndex !== i) {
      steps.push({
        array: [...array],
        description: `Swapping minimum element ${array[minIndex]} with element at position ${i} (${array[i]})`,
        comparing: null,
        swapping: [i, minIndex],
        sorted: [...sorted]
      });
      
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    } else {
      steps.push({
        array: [...array],
        description: `Element ${array[i]} is already in its correct position`,
        comparing: null,
        swapping: null,
        sorted: [...sorted]
      });
    }
    
    sorted.push(i);
    
    steps.push({
      array: [...array],
      description: `Element ${array[i]} is now in its correct position`,
      comparing: null,
      swapping: null,
      sorted: [...sorted]
    });
  }
  
  sorted.push(n-1);
  
  steps.push({
    array: [...array],
    description: `Sorting complete! Final array: [${array.join(', ')}]`,
    comparing: null,
    swapping: null,
    sorted: [...sorted]
  });
  
  return steps;
}