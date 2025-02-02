const Tree = require("./tree"); // make sure to import the Tree class

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = [10, 5, 15, 2, 7, 20,21,22,23];
let test = new Tree(arr);
test.insert(1)
test.insert(0)

prettyPrint(test.root);
console.log('height: ', test.height(test.find(10)))
console.log(test.isBalanced(test.root))
test.reBalance()
prettyPrint(test.root);
console.log(test.isBalanced(test.root))
// console.log(`the depth: ${test.depth(test.find(5), test.root)}`)

// console.log(`the height: ${test.height(test.find(7), test.root)}`)
// console.log('this tree is balanced ? ', test.isBalanced())


