/*
*   power by    weishengjian
*   datetime    2018/7/14 10:31
*/

/*
*  日期转换prototype
*/
Date.prototype.format = function (formatString) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(formatString)) formatString = formatString.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(formatString)) formatString = formatString.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return formatString;
};

/*
* 常用日期格式prototype
*/
Date.prototype.yyyyMMdd_hhmmss = function () {
  return this.format('yyyy-MM-dd hh:mm:ss');
};

/*
*  添加数组prototype
*/
Array.prototype.pushArray = function (array) {
  if (!array) return
  if (!array instanceof Array) {
    console.error('pushArray的参数必须是一个数组');
    return;
  }
  array.forEach((item) => {
    this.push(item);
  })
};

/*
*  删除数组所有元素prototype
*/
Array.prototype.removeAll = function () {
  this.splice(0, this.length);
}
