/**
 * 数组实现队列: FIFO
 */
const queue = [];

// 入队
queue.push(0);
queue.push(1);
queue.push(2);

// 出队
const shiftVal = queue.shift();

// 用两个栈实现队列
class CQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  appendTail(value) {
    this.inStack.push(value);
  }

  deleteHead() {
    const { inStack, outStack } = this;
    if (outStack.length) return outStack.pop();

    while (inStack.length) {
      outStack.push(inStack.pop());
    }

    return outStack.pop() || -1;
  }
}

// Test
let cqueue = new CQueue();
cqueue.appendTail(0);
cqueue.appendTail(1);
cqueue.appendTail(2);

cqueue.deleteHead();
cqueue.deleteHead();
// cqueue.deleteHead();
console.log(cqueue);
