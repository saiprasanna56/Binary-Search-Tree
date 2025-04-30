import React from 'react';
import './index.css';

function TreeVisualizer({ root, width = 800, height = 500 }) {
  const nodes = [];
  const links = [];

  function layout(node, x, y, dx) {
    if (!node) return;
    nodes.push({ ...node, x, y });
    if (node.left) {
      links.push({ source: { x, y }, target: { x: x - dx, y: y + 60 } });
      layout(node.left, x - dx, y + 60, dx / 1.5);
    }
    if (node.right) {
      links.push({ source: { x, y }, target: { x: x + dx, y: y + 60 } });
      layout(node.right, x + dx, y + 60, dx / 1.5);
    }
  }

  layout(root, width / 2, 40, width / 4);

  return (
    <svg width={width} height={height}>
      {links.map((l, i) => (
        <line key={i} x1={l.source.x} y1={l.source.y} x2={l.target.x} y2={l.target.y} stroke="#aaa" />
      ))}
      {nodes.map((n, i) => (
        <g key={i} className="tree-node" transform={`translate(${n.x}, ${n.y})`}>
          <circle
            r={20}
            fill={n.isHighlighted ? "#ff6347" : "green"}
            stroke="#fff"
            className="node-circle"
          />
          <text x={0} y={5} textAnchor="middle" fontSize="14" fill="#fff">{n.value}</text>
        </g>
      ))}
    </svg>
  );
}

export default TreeVisualizer;