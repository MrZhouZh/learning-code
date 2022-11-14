const LinkedList = require("../linkedlist");

describe('implement linked-list', () => {
    const ret = new LinkedList();
    
    test('linked-list append', () => {
        ret.append("append1");
        ret.append("append2");
        expect(ret.head.next.name).toBe('append1')
        expect(ret.head.next.next.name).toBe('append2')
    })

    test('linked-list findByName', () => {
        const findNodeByName = ret.findByName("append2");
        expect(findNodeByName.name).toBe('append2')
    })

    test('linked-list insert', () => {
        const findNodeByName = ret.findByName("append2");
        ret.insert("append3", findNodeByName);
        const append3Node = ret.findByName("append3");
        expect(append3Node.name).toBe('append3')
    })
    test('linked-list remove', () => {
        ret.append("append4");
        ret.remove(ret.findByName("append4"));
        const findByName = ret.findByName("append4");
        expect(findByName).toBe(-1)
    })
    test('linked-list findMidNode', () => {
        const midNode = ret.findMidNode()
        expect(midNode.name).toBe('append1')
        expect(midNode.next.name).toBe('append2')
    })
})


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
