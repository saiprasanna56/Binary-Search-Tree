import React, { useState } from 'react';
import { BST } from './BST';
import TreeVisualizer from './TreeVisualizer';
import './index.css';

function App() {
  const [bst] = useState(new BST());
  const [value, setValue] = useState('');
  const [traversal, setTraversal] = useState([]);
  const [info, setInfo] = useState('');
  const [depth, setDepth] = useState('');
  const [currentDepth, setCurrentDepth] = useState('Infinity');

  const handleOperation = (op) => {
    const val = parseInt(value, 10);
    let result;
    bst.clearHighlights();

    switch (op) {
      case 'insert': {
        const res = bst.insert(val);
        setInfo(res ? res : `Inserted ${val}`);
        break;
      }
      case 'delete':
        bst.delete(val);
        setInfo(`Deleted ${val}`);
        break;
      case 'search':
        result = bst.search(val);
        setInfo(result ? `${val} found` : `${val} not found`);
        break;
      case 'min':
        result = bst.findMin();
        setInfo(`Min: ${result}`);
        break;
      case 'max':
        result = bst.findMax();
        setInfo(`Max: ${result}`);
        break;
      case 'inorder':
      case 'preorder':
      case 'postorder':
        result = bst.traverse(op);
        setTraversal(result);
        setInfo(`${op} traversal: [${result.join(', ')}]`);
        break;
      case 'depth':
        result = bst.maxDepth();
        setInfo(`Depth: ${result}`);
        break;
      case 'clear':
        bst.clearTree();
        setInfo('Tree cleared');
        break;
      default:
        break;
    }
    setValue('');
  };

  const handleSetDepth = () => {
    const d = parseInt(depth, 10);
    if (!isNaN(d)) {
      const res = bst.setMaxDepth(d);
      setInfo(res);
      if (!res.includes('Cannot')) setCurrentDepth(d);
      setDepth('');
    }
  };

  return (
    <div className="container">
      <h1>BST Visualizer</h1>
      <p className="depth-indicator">Current Max Depth: {currentDepth}</p>
      <div className="controls">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={() => handleOperation('insert')}>Insert</button>
        <button className="danger" onClick={() => handleOperation('delete')}>Delete</button>
        <button onClick={() => handleOperation('search')}>Search</button>
        <button onClick={() => handleOperation('min')}>Find Min</button>
        <button onClick={() => handleOperation('max')}>Find Max</button>
        <button onClick={() => handleOperation('inorder')}>Inorder</button>
        <button onClick={() => handleOperation('preorder')}>Preorder</button>
        <button onClick={() => handleOperation('postorder')}>Postorder</button>
        <button onClick={() => handleOperation('depth')}>Tree Depth</button>
        <input
          type="number"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          placeholder="Set max depth"
        />
        <button onClick={handleSetDepth}>Apply Depth</button>
        <button className="danger" onClick={() => handleOperation('clear')}>Clear Tree</button>
      </div>
      <p className="info">{info}</p>
      <TreeVisualizer root={bst.root} />
    </div>
  );
}

export default App;
