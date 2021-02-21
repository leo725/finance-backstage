var vx = { version: "1.0" };



// 表格序号
export function indexMethod(index) {
  return (index + 1) + (this.pageSize * (this.pageIndex - 1));
}

//获取上传文件的类型
export function checkFileType(_name) {
  var name = _name
  var index = name.lastIndexOf("."); //（考虑严谨用lastIndexOf(".")得到）得到"."在第几位
  name = name.substring(index)
  if (name == ".bmp" || name == ".png" || name == ".gif" || name == ".jpg" || name == ".jpeg") { //根据后缀，判断是否符合图片格式
    return 'img'
  } else if (name == ".pdf") {
    return 'pdf'
  } else {
    return 'file'
  }
}
// 文件查看
export function seeFileType(_url) {
  window.open(_url)
}

// 保存搜索参数
export function saveSelectParams(route, store, params) {
  route = Object.assign({}, route, { query: params })
  // console.log(route);
  store.dispatch('addVisitedViews', route)
};


// 是否有属性
vx.hasProp = function (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
// 删除属性
vx.deleteProp = function (obj, prop) {
  if (vx.hasProp(obj, prop)) {
    delete obj[prop];
  }
};
// 拷贝属性
vx.copyProps = function (target, source, isCopyAll) {
  isCopyAll = isCopyAll || false;
  if (target && source) {
    for (var p in source) {
      // p is method
      if (typeof source[p] === "function") {
        // do nothing
      } else {
        if (isCopyAll) {
          target[p] = source[p];
        } else {
          if (vx.hasProp(target, p)) {
            target[p] = source[p];
          }
        }
      }
    }
  }
};
// 对比删除属性
vx.compareAndRemoveProps = function (target, source) {
  var newDict = {};
  if (target && source) {
    for (var p in source) {
      // p is method
      if (typeof source[p] === "function") {
        // do nothing
      } else {
        if (vx.hasProp(target, p)) {
          newDict[p] = source[p];
        }
      }
    }
  }
  return newDict;
};
// 获取属性值列表
vx.getPropertyValueList = function (sources, propName) {
  var results = [];
  if (sources) {
    for (var k in sources) {
      var v = sources[k][propName];
      if (v) {
        results.push(v);
      }
    }
  }
  return results;
};
// 判断是否是手机端
vx.isMobile = function () {
  if (!navigator) throw "Not Supported!";
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    return true;
  } else {
    return false;
  }
};

// 是否是图片文件
vx.isImageFile = function (fileName) {
  var regex = new RegExp("(jpeg|png|gif|jpg)$", "i");
  return regex.test(fileName);
};
// 是否是字符串
vx.isString = function (str) {
  return typeof str === "string" && str.constructor === String;
};
// 是否是数字
vx.isNumber = function (obj) {
  return typeof obj === "number" && obj.constructor === Number;
};
// 是否是时间
vx.isDate = function (obj) {
  return typeof obj === "object" && obj.constructor === Date;
};
// 是否是函数
vx.isFunction = function (obj) {
  return typeof obj === "function" && obj.constructor === Function;
};
// 是否是对象
vx.isObject = function (obj) {
  return typeof obj === "object" && obj.constructor === Object;
};


// 获取时间
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}
// 取整时间
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
// 模板时间
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 验证邮箱
export function isEmail(rule, value, callback) {
  if (!value) {
    callback();
  } else {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    const email = reg.test(value);
    if (!email) {
      callback(new Error("邮箱格式如:admin@163.com"));
    } else {
      callback();
    }
  }
};
// 验证身份证
export function validateCard(rule, value, callback) {
  if (!value) {
    return callback();
  } else {
    if (!IdentityCodeValid(value)) {
      callback(new Error("请输入正确的身份证号码"));
    } else {
      callback();
    }
  }
}

//验证身份证合法性
function IdentityCodeValid(code) { 
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
  var tip = "";
  var pass = true;
  var patt1 = new RegExp("(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)");
  if (!code || !patt1.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
  }
  else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  }
  else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++)
      {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  return pass;
}

// 验证 数字格式，最多保留2位小数
export function checkNumberFixed2 (rule, value, callback) {
  if (!value) {
    return callback();
  } else {
    const reg = /^\d+(\.\d{1,2})?$/
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('最多输入2位小数'));
    }
  }
};


// 验证 营业执照
export function checkSocialCreditCode (rule, value, callback) {
  if (!value) {
    return callback();
  } else {
    const reg = /^[a-zA-Z0-9]{10,20}$/
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的营业执照编号'));
    }
  }
};

// 验证手机号
export function checkPhone (rule, value, callback) {
  if (!value) {
    return callback();
  } else {
    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/

    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的手机号'));
    }
  }
};

// 验证密码格式 数字、字母
export function checkPassword (rule, value, callback) {
  if (!value) {
    return callback();
  } else {
    const reg = /^[a-zA-Z0-9]\w{2,16}$/
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入3-16位数字、大小写字母'));
    }
  }
};

// 验证密码格式 数字、字母
export function checkBandCard (rule, value, callback) {
  if (!value) {
    return callback();
  } else {
    const reg = /^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18})$/
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的银行卡号'));
    }
  }
};

// class添加
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export function filterParams(params){
  let obj = {}
  for(let key in params){
    if (params[key]!=undefined  && params[key] !== '' && params[key] != null) {
      obj[key] = params[key]
    }
  }
  return obj
}

export const ViewerOptions = {
  url: 'data-original',
  toolbar: {
    zoomIn: 4,
    zoomOut: 4,
    oneToOne: 4,
    reset: false,
    prev: 4,
    play: false,
    next: 4,
    rotateLeft: 4,
    rotateRight: 4,
    flipHorizontal: false,
    flipVertical: false,
  },
  zIndex: 9999,
  navbar:false
}

// element-ui里的DateTimePicker组件带快捷选项参数
export const pickerOptions = [
{
  text: '今天',
  onClick(picker) {
    const end = new Date()
    const start = new Date(new Date().toDateString())
    end.setTime(start.getTime())
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一周',
  onClick(picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}]

// 弹性
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 深度拷贝
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

// 对象转数组
export function switchArr(Obj) {
  let Arr = [];
  for (const key in Obj) {
    if (Obj.hasOwnProperty(key)) {
      const ele = Obj[key];
      Arr.push({ label: ele, value: key })
    }
  }
  return Arr
}

// 获取元素的style 样式值
export function getElStyleVal(el, attr) {
  var v = 0;
  if (el.currentStyle) {
    v = el.currentStyle[attr]
  } else {
    v = getComputedStyle(el, false)[attr];
  }
  return parseInt(v.replace("px", ""))
}


// 验证手机号码
export function regPhone(phone) {
  return (/^1[3456789]\d{9}$/.test(phone))
}
// 验证邮箱
export function regEmail(email) {
  return (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email))
}
// 验证身份证
export function regCard(ID) {
  return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(ID))
}

export function getBtnPower(metaValue, btnPower){
  let meta = metaValue;
  if (meta && Object.keys(meta).length) {
    function getArrDifference(arr1 = [], arr2 = []) {
      return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
      });
    }
    let arr = getArrDifference(meta.authorizationBtns, meta.needAuthorizationBtns)
    arr.forEach(ele => {
      btnPower[ele] = false
    })
  }
}

// localStorage存储
vx.localStorage = {
  setItem: function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },

  getItem: function (key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },

  removeItem: function (key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }
};

vx.sessionStorage = {
  setItem: function (key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },

  getItem: function (key) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },

  removeItem: function (key) {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {}
  }
};

export const pageParams = {
  set : (path,params)=>{
    try {
      vx.sessionStorage.setItem(path,params)
    } catch (error) {
      
    }
  },
  get : (path)=>{
    try {
      let params = vx.sessionStorage.getItem(path);
      return params || {}
    } catch (error) {
      
    }
  },
  remove : (path)=>{
    try {
      vx.sessionStorage.removeItem(path)
    } catch (error) {
      
    }
  }  
}

export default vx;