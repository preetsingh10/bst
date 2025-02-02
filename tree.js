const Node = require("./node");

class Tree {
  constructor(arr) {
    // Remove duplicates and sort array before building the BST
    this.root = this.buildTree([...new Set(arr)].sort((a, b) => a - b));
  }

  // Build a balanced BST from a sorted array
  buildTree(arr) {
    return this.sortedArrToBst(arr, 0, arr.length - 1);
  }

  // Recursively construct a BST from a sorted array
  sortedArrToBst(arr, start, end) {
    if (start > end) return null;
    
    let middle = Math.floor((start + end) / 2);
    let root = new Node(arr[middle]);
    
    root.left = this.sortedArrToBst(arr, start, middle - 1);
    root.right = this.sortedArrToBst(arr, middle + 1, end);
    
    return root;
  }

  // Insert a new value into the BST
  insert(value) {
    this.root = this._insertRecursively(this.root, value);
  }

  _insertRecursively(root, value) {
    if (!root) return new Node(value); // Create new node if null
    if (root.data === value) return root; // Avoid duplicate values
    
    if (value < root.data) {
      root.left = this._insertRecursively(root.left, value);
    } else {
      root.right = this._insertRecursively(root.right, value);
    }
    
    return root;
  }

  // Delete a node with a given value
  deleteItem(value) {
    this.root = this._deleteRecursively(this.root, value);
  }

  _deleteRecursively(root, value) {
    if (!root) return root;

    if (value < root.data) {
      root.left = this._deleteRecursively(root.left, value);
    } else if (value > root.data) {
      root.right = this._deleteRecursively(root.right, value);
    } else {
      // Node with only one child or no child
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      
      // Node with two children: get inorder successor (smallest in right subtree)
      let successor = this.findMin(root.right);
      root.data = successor.data;
      root.right = this._deleteRecursively(root.right, successor.data);
    }
    
    return root;
  }

  // Find the node with the smallest value in a subtree
  findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  // Find a node with a given value
  find(value) {
    return this._findRecursively(value, this.root);
  }

  _findRecursively(value, root) {
    if (!root || root.data === value) return root;
    return value < root.data
      ? this._findRecursively(value, root.left)
      : this._findRecursively(value, root.right);
  }

  // Level-order traversal (BFS)
  levelOrder(callback) {
    if (!callback) throw new Error("No callback function provided");
    let queue = [this.root];
    while (queue.length) {
      let node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // Inorder traversal (Left, Root, Right)
  inOrder(root, callback) {
    if (!callback) throw new Error("No callback function provided");
    if (!root) return;
    this.inOrder(root.left, callback);
    callback(root);
    this.inOrder(root.right, callback);
  }

  // Preorder traversal (Root, Left, Right)
  preOrder(root, callback) {
    if (!callback) throw new Error("No callback function provided");
    if (!root) return;
    callback(root);
    this.preOrder(root.left, callback);
    this.preOrder(root.right, callback);
  }

  // Postorder traversal (Left, Right, Root)
  postOrder(root, callback) {
    if (!callback) throw new Error("No callback function provided");
    if (!root) return;
    this.postOrder(root.left, callback);
    this.postOrder(root.right, callback);
    callback(root);
  }

  // Calculate height of a node (max depth of subtree)
  height(node) {
    return node ? 1 + Math.max(this.height(node.left), this.height(node.right)) : -1;
  }

  // Find depth of a node (distance from root)
  depth(node, root = this.root, level = 0) {
    if (!root) return -1;
    if (root === node) return level;
    let nextLevel = this.depth(node, node.data < root.data ? root.left : root.right, level + 1);
    return nextLevel;
  }

  // Check if the tree is balanced (left and right subtrees differ by at most 1 level)
  isBalanced(node = this.root) {
    if (!node) return true;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  // Rebalance the tree if it is unbalanced
  reBalance() {
    if (!this.isBalanced(this.root)) {
      let nodes = [];
      this.inOrder(this.root, (node) => nodes.push(node.data)); // Collect nodes in sorted order
      this.root = this.buildTree(nodes); // Rebuild tree
    }
  }
}

module.exports = Tree;
