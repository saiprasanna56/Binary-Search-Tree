import React from 'react';
import './index.css';

function TreeVisualizer({ root, width = 800, height = 500 }) {
  const nodes = [];
  const links = [];

  function layout(node, x, y, dx, direction = 1) {
    if (!node) return;

    nodes.push({ ...node, x, y });

    if (node.left) {
      const childX = x - dx * direction;
      const childY = y + 80;
      links.push({ source: { x, y }, target: { x: childX, y: childY } });
      layout(node.left, childX, childY, dx * 0.8, direction);
    }

    if (node.right) {
      const childX = x + dx * direction;
      const childY = y + 80;
      links.push({ source: { x, y }, target: { x: childX, y: childY } });
      layout(node.right, childX, childY, dx * 0.8, direction);
    }
  }

  // Start layout from center
  layout(root, 0, 0, 200); // start at (0,0), scale dx as needed

  // Determine bounds for viewBox
  const minX = Math.min(...nodes.map(n => n.x)) - 60;
  const maxX = Math.max(...nodes.map(n => n.x)) + 60;
  const minY = Math.min(...nodes.map(n => n.y)) - 60;
  const maxY = Math.max(...nodes.map(n => n.y)) + 60;

  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  return (
    <div style={{ width: '100%', height: `${height}px`, overflow: 'auto', border: '1px solid #ccc' }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {links.map((l, i) => (
          <line
            key={i}
            x1={l.source.x}
            y1={l.source.y}
            x2={l.target.x}
            y2={l.target.y}
            stroke="#aaa"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i} className="tree-node" transform={`translate(${n.x}, ${n.y})`}>
            <circle
              r={20}
              fill={n.isHighlighted ? "#ff6347" : "green"}
              stroke="#fff"
              className="node-circle"
            />
            <text x={0} y={5} textAnchor="middle" fontSize="14" fill="#fff">
              {n.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default TreeVisualizer;
