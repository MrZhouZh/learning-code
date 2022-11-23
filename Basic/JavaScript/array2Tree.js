/**
 * 平铺数组转树状结构
 * 
 * 实现原理: 要求数组对象中已经有标识标识不同层级的
 */
const array2Tree = function (list, cfg) {
    let nodes = {}, parentNodes = {}
    let prop = Object.assign({
        rootId: 'root',
        id: 'id',
        parentId: 'parentId',
        children: 'children',
        leaf: 'leaf',
    }, cfg)

    list.forEach((node) => {
        let id = node[prop.id]
        let parentId = node[prop.parentId] || prop.rootId
        nodes[id] = node
        if (parentId) {
            parentNodes[parentId] = parentNodes[parentId] || []
            parentNodes[parentId].push(node)
        }
    })


    Object.keys(nodes).forEach(id => {
        let node = nodes[id]
        if (parentNodes[id]) {
            node[prop.children] = parentNodes[id]
        }
        // else {
        //     node[prop.leaf] = true
        // }
    })

    return parentNodes[prop.rootId]
}

const data = require('./array2Tree-mock')

const res = array2Tree(data, { id: 'categoryId', })

// console.log(JSON.stringify(res), '-- res')
console.log(res, '-- res')

// output:
// [
//     {
//       categoryId: 3004,
//       categoryName: 'Clothing & Accessories',
//       level: 1,
//       parentId: 0
//     },
//     {
//       categoryId: 5990,
//       categoryName: 'Shoes, Luggage & Bags',
//       level: 1,
//       parentId: 0
//     },
//     {
//       categoryId: 2999,
//       categoryName: 'Household Supplies',
//       level: 1,
//       parentId: 0
//     },
//     {
//       categoryId: 3000,
//       categoryName: 'Home Appliance',
//       level: 1,
//       parentId: 0
//     },
//     {
//       categoryId: 3012,
//       categoryName: 'Sports & Outdoors',
//       level: 1,
//       parentId: 0
//     },
//     {
//       categoryId: 3013,
//       categoryName: 'Consumer Electronics',
//       level: 1,
//       parentId: 0
//     },
//     {
//       categoryId: 3009,
//       categoryName: 'Computer & Office',
//       level: 1,
//       parentId: 0
//     },
//     {
//       categoryId: 3006,
//       categoryName: 'Automobile',
//       level: 1,
//       parentId: 0,
//       children: [{
//         categoryId: 2998,
//         categoryName: "Furniture",
//         level: 2,
//         parentId: 3006,
//         children: [{
//             categoryId: 2995,
//             categoryName: "Underwears/Loungewear",
//             level: 3,
//             parentId: 2998,
//         }]
//       }]
//     }
// ]
