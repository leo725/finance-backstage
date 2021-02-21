let secretId  = 'xiaopangcheskey123'; //加盐
import md5 from './md5.js'

// 生成签名
export function getSign(param) {
  let params = createSing(param)
  // console.log(params)
  if (typeof params == "string") {
    return paramsStrSort(params);
  } else if (typeof params == "object") {
    var arr = [];
    for (var i in params) {
      if (params[i] && typeof params[i] === "object") {
        arr.push((i + "=" + JSON.stringify(params[i])));
      } else {
        arr.push((i + "=" + params[i]));
      }
    }
    // console.log(arr.sort().join("&"))
    return md5(secretId + arr.sort().join("&") + secretId);
  }
}

// xiaopangcheskey123cityCode = 330300 & cityName = 温州市 & contactsAddress = 大温州 & contactsName = 李大王 & contactsPhone = 13123131231 & provinceCode = 330000 & provinceName = 浙江省 & wechatQrcode = https: //d.xiaopangche.cn:20025/group1/M00/00/36/wKgAslzeTFKAPtQmAABYZrIQCY0809.jpgxiaopangcheskey123
// 对象排序方法
export function sort_ASCII(obj) {
  var arr = new Array();
  var num = 0;
  for (var i in obj) {
    arr[num] = i;
    num++;
  }
  var sortArr = arr.sort();
  var sortObj = {};
  for (var i in sortArr) {
    sortObj[sortArr[i]] = obj[sortArr[i]];
  }
  return sortObj;
}
// 参数递归排序
export function createSing(obja) {
  let obj = obja;
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        //判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === "object") {
          if (Array.isArray(obj[key])) {
            obj[key].forEach((ele, index) => {
              if (ele && typeof ele === "object") {
                if (!Array.isArray(ele)) {
                  obj[key][index] = sort_ASCII(ele)
                  // console.log(obj[key])
                  createSing(obj[key][index]);
                }
              } else {
                obj[key][index] = ele
                obj[key] = obj[key];
              }
            });
            JSON.stringify(obj[key]);
          } else {
            obj[key] = sort_ASCII(obj[key])
            obj[key] = createSing(obj[key]);
          }

        } else {
          //如果不是，简单复制
          // objClone[key] = obj[key];
        }
      }
    }
  }
  return obj;
}


// F2(data) {
//     let arr = [];
//     for (var key in data) {
//       arr.push(key);
//     }
//     arr.sort();

//     let obj = null;
//     let isArr = this.isArray(data);

//     if (isArr) obj = [];
//     else obj = {};

//     for (let i in arr) {
//       let data2 = data[arr[i]];
//       if (data2 === 'undefined' || data2 === null || data2 === '') continue;
//       if (typeof data2 === 'object') {
//         if (isArr) {
//           obj.push(this.F2(data2));
//         } else {
//           obj[arr[i]] = this.F2(data2);
//         }
//       }
//       else {
//         if (isArr) {
//           obj.push(data2);
//         } else {
//           obj[arr[i]] = data2;
//         }
//       }
//     }

//     return obj;
//   },
//   F1(data) {
//     // console.log(data)
//     let arr = [];
//     for (var key in data) {
//       arr.push(key);
//     }
//     arr.sort();

//     let obj = [];
//     let isArr = this.isArray(data);

//     for (let i in arr) {
//       let data2 = data[arr[i]];
//       if (data2 === 'undefined' || data2 === null || data2 === '') continue;
//       if (typeof data2 === 'object') {
//         data2 = this.F2(data2);
//         if (!isArr) {
//           data2 = JSON.stringify(data2);
//         }
//       }
//       if (!isArr) {
//         obj.push(arr[i] + '=' + data2);
//       } else {
//         obj.push(data2);
//       }
//     }

//     if (!isArr) {
//       return obj.join('&');
//     }
//     else {
//       return JSON.stringify(obj);
//     }
//   },
//   isArray(data) {
//     //return Object.prototype.toString.call(data)  === '[object Array]'
//     return Array.isArray(data);
//   },
