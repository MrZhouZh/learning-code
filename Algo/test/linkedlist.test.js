const LinkedList = require("../linkedlist");

const ret = new LinkedList();
ret.append("append1");
ret.append("append2");
const findNodeByName = ret.findByName("append2");
ret.insert("append3", findNodeByName);

ret.append("append4");
ret.print();
ret.remove(ret.findByName("append4"));

console.log(ret.findMidNode(), "-- mid node");

ret.print();

// output:
// append1
// append2
// append3
// append4

// Node {
//   name: 'append1',
//   next: Node { name: 'append2', next: Node { name: 'append3', next: null } }
// } -- mid node
// append1
// append2
// append3
