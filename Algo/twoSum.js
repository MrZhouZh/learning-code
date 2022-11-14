/**
 * refs: https://leetcode.cn/problems/two-sum/
 * 
 * 1. 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 * 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
 * 
 * 输入：nums = [3,2,4], target = 6
 * 输出：[1,2]
 * 
 */
const twoNum = (nums, target) => {
    // 双循环
    // for (let i = 0, len = nums.length; i < len; i++) {
    //     for (let j = i + 1; j < len; j++) {
    //         if (nums[i] + nums[j] === target) {
    //             return [i, j]
    //         }
    //     }
    // }
    // return []

    // map hash
    const map = new Map()
    for (let i = 0, j = nums.length; i < j; i++) {
        const x = target - nums[i]
        if (map.has(x)) {
            return [map.get(x), i]
        }
        map.set(nums[i], i)
    }
    return []
}

module.exports = twoNum
