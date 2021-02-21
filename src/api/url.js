var Url = '',
  enumVersion = 'V 1.0.0' // 枚举类版本号，如果要不退出登录的情况下更新枚举类，请手动增加枚举类的版本号
if (process.env.NODE_ENV === 'development') {
  
  // Url = 'http://192.168.0.40:1198/';
  Url = 'http://kr.xiaopangche.cn:20043/';

} else {
  Url = window.g.Url
}

export {
  Url,
  enumVersion
}