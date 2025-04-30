export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.isHighlighted = false;
  }
}

export class BST {
  constructor() {
    this.root = null;
    this.maxAllowedDepth = Infinity;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      if (this.maxAllowedDepth <= 0) return 'Cannot insert beyond max depth';
      this.root = newNode;
      return;
    }
    let curr = this.root;
    let depth = 1;
    while (true) {
      if (depth >= this.maxAllowedDepth) return 'Cannot insert beyond max depth';
      if (value < curr.value) {
        if (!curr.left) {
          curr.left = newNode;
          return;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = newNode;
          return;
        }
        curr = curr.right;
      }
      depth++;
    }
  }

  search(value) {
    let curr = this.root;
    this.clearHighlights();
    while (curr) {
      if (value === curr.value) {
        curr.isHighlighted = true;
        return true;
      }
      curr = value < curr.value ? curr.left : curr.right;
    }
    return false;
  }

  findMin(node = this.root) {
    if (!node) return null;
    this.clearHighlights();
    while (node.left) {
      node = node.left;
    }
    node.isHighlighted = true;
    return node.value;
  }

  findMax(node = this.root) {
    if (!node) return null;
    this.clearHighlights();
    while (node.right) {
      node = node.right;
    }
    node.isHighlighted = true;
    return node.value;
  }

  delete(value) {
    this.root = this._deleteRec(value, this.root);
  }

  _deleteRec(value, node) {
    if (!node) return null;
    if (value < node.value) {
      node.left = this._deleteRec(value, node.left);
    } else if (value > node.value) {
      node.right = this._deleteRec(value, node.right);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let succVal = this.findMin(node.right);
      node.value = succVal;
      node.right = this._deleteRec(succVal, node.right);
    }
    return node;
  }

  traverse(order = 'inorder', node = this.root, arr = []) {
    if (!node) return arr;
    if (order === 'preorder') arr.push(node.value);
    this.traverse(order, node.left, arr);
    if (order === 'inorder') arr.push(node.value);
    this.traverse(order, node.right, arr);
    if (order === 'postorder') arr.push(node.value);
    return arr;
  }

  maxDepth(node = this.root) {
    if (!node) return 0;
    return 1 + Math.max(this.maxDepth(node.left), this.maxDepth(node.right));
  }

  clearHighlights(node = this.root) {
    if (!node) return;
    node.isHighlighted = false;
    this.clearHighlights(node.left);
    this.clearHighlights(node.right);
  }

  setMaxDepth(depth) {
    if (depth < this.maxDepth()) return 'Cannot set depth less than current tree depth';
    this.maxAllowedDepth = depth;
    return `Max depth set to ${depth}`;
  }

  clearTree() {
    this.root = null;
  }
}