/*var object = {
  name:"lvhang",
  age:24,
  hobby:"sleep",
  others:{
    a:1,
    b:2,
    c:3
  }
};
var object1 = object;

function copyObject(src) {
  var dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}
var object2 = copyObject(object);

object2.name = "布鲁斯。韦恩";
object2.hobby = "当蝙蝠侠";
object1.name = "joker";
object1.others.a = "佳期如梦";
console.log(object);
console.log(object1);
console.log(object2);*/


/*var twoSum = function(nums, target) {
  var indexArr = [];
  for(var i = 0;i < nums.length;i++){
    for(var j = i + 1 ;j < nums.length  ;j++){
      // console.log((target - nums[i]));
      if((target - nums[i]) == nums[j]){
        indexArr.push(i);
        indexArr.push(j);
        return indexArr;
      }
    }
  }
};

console.log(twoSum( [2, 7,7, 2 ,11 , 15 , 27],14));*/

/*var str = "abcdefg";
var lengthOfLongestSubstring = function(str) {
  var strArr = str.split('');
  var newArr = [];
  var maxLenth = 0;
  for(var i = 0;i < strArr.length;i++){
    if(newArr.indexOf(creatArr(i,strArr).length) < 0) {
      newArr.push(creatArr(i,strArr).length);
      if(maxLenth < creatArr(i,strArr).length){
        maxLenth =  creatArr(i,strArr).length
      }
    }
  }
  return maxLenth;
};
//创建一个没有重复数据的数组
function creatArr(index,arr) {
  var newArr = [];
  for(var i = index;i < arr.length;i++){
    if(newArr.indexOf(arr[i]) < 0){
      newArr.push(arr[i]);
    }else {
      return newArr;
    }
  }
  return newArr;
}
lengthOfLongestSubstring(str);*/

//找出这两个有序数组的中位数，并且要求算法的时间复杂度
// 先合并 再从大到小排序 然后 取中位数
/*var findMedianSortedArrays = function(nums1, nums2) {
  var sum = nums1.concat(nums2);
  for(var i = 0;i < sum.length;i++){
    for(var j = 0;j < sum.length - i;j++){
      if(sum[j] > sum[j+1]){
        var tem = sum[j+1];
        sum[j+1] = sum[j];
        sum[j] = tem;
      }
    }
  }
  //判断数组的奇数偶数
  var length = sum.length;
  console.log(sum);
  if((length % 2) == 0){//偶数

    return (sum[length / 2 - 1] + sum[length / 2 ]) / 2
  }else {//奇数
    return sum[(length - 1) / 2 ];
  }
};
var num1 = [1,3];
// var num1 = '';
var num2 = [2];
console.log(findMedianSortedArrays(num1,num2))*/

//给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
//
var str = "abababa";
var longestPalindrome = function(str) {

};













