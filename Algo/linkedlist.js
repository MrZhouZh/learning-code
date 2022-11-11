const { log } = require("console");

class Node {
  constructor(name) {
    this.name = name;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node("head");
  }

  // 添加节点
  append(name) {
    const newNode = new Node(name);
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
  }

  // 插入节点
  insert(name, node) {
    if (node && node === -1) {
      console.log(`未找到插入位置`);
      return;
    }
    const newNode = new Node(name);
    newNode.next = node.next;
    node.next = newNode;
  }

  // 删除节点
  remove(node) {
    const prevNode = this.findPrev(node);

    if (prevNode === -1) {
      console.log(`未找到元素`);
      return;
    }
    prevNode.next = prevNode.next.next;
  }

  // 找到 node 节点的前一个节点
  findPrev(node) {
    let currentNode = this.head.next;
    while (currentNode && currentNode.next !== node) {
      currentNode = currentNode.next;
    }

    return currentNode === null ? -1 : currentNode;
  }

  // 根据 name 查找节点
  findByName(name) {
    let currentNode = this.head.next;
    while (currentNode !== null && currentNode.name !== name) {
      currentNode = currentNode.next;
    }

    return currentNode === null ? -1 : currentNode;
  }

  // 根据 index 查找节点
  findByIndex(index) {
    let currentNode = this.head.next,
      pos = 0;

    while (currentNode !== null && pos !== index) {
      currentNode = currentNode.next;
      pos++;
    }

    return currentNode;
  }

  // 查找中间节点
  findMidNode() {
    let fast = this.head,
      slow = this.head;
    while (fast.next !== null && fast.next.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
    }

    return slow;
  }

  // 打印所有节点
  print() {
    let currentNode = this.head.next;
    while (currentNode !== null) {
      console.log(currentNode.name);
      currentNode = currentNode.next;
    }
    console.log("\n");
  }

  // 反转单向链表
  reverse() {
    let root = new Node("head"),
      currentNode = this.head.next;
    while (currentNode !== null) {
      // 暂存当前节点的 next
      const next = currentNode.next;
      // 反转指向前一个节点
      currentNode.next = root.next;
      // 游标后移
      root.next = currentNode;
      currentNode = next;
    }

    this.head = root;
  }
}

module.exports = LinkedList;
