// const os = require('os')

export const double = function (x) {
  console.log('double')
  return x + x
}

export const treble = function (x) {
  console.log('treble')
  return x + x + x
}


// 获取token
export const getToken = function () {
  // $.ajax({
  //   type: 'GET',
  //   url: 'https://ai.china.com.cn/api/qn/token',
  //   success: data => {
  //     console.log(data)
  //     // App.baidu_token = data.bdtoken
  //     // App.qiniu_token = data.qntoken
  //   },
  //   error: err => {
  //     console.log(err)
  //   }
  // })
}

export const URLParser = function (link) {
  const obj = {}
  obj.u = new URL(link)

  obj.hash = ''
  if (obj.u.hash) {
    const h = obj.u.hash.replace(/^#/, '').split('=')
    obj.hash[h[0]] = h[1]
  }
  

  return obj
}

// export default {
//   double,
//   treble,
//   URLParser
// }