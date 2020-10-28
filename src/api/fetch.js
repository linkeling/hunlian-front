import axios from 'axios'
import { message, notification } from 'ant-design-vue'

axios.defaults.timeout = 30000
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// axios.defaults.baseURL = ''

// type默认为form，如果要在请求体里传json，则传json，如果要上传文件，传file
function fetch(url = '', params = {}, method = 'get', contentType = 'form',token) {
  contentType === 'form' && (contentType = 'application/x-www-form-urlencoded')
  contentType === 'json' && (contentType = 'application/json; charset=utf-8')
  contentType === 'file' && (contentType = 'multipart/form-data')
  let query = []
  for (let k in params) {
    query.push(k + '=' + params[k])
  }
  let qs = query.join('&')
  if (method.toLowerCase() === 'get' && query.length > 0) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + qs
  }
  if (contentType !== 'application/x-www-form-urlencoded' && method !== 'get') {
    qs = params
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: params,
      headers: {
        Authorization: token || window.sessionStorage.getItem('token'),
        'Content-Type': contentType,
      }
    }).then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        if (response.data.code === 401) { // 未登录
          this.$router.push('/Login')
          return
        }
        if (response.data.code === 403) { // 无权限
          message.warning('你没有权限进行此操作，如需开权限，请联系管理员')
          return
        }
        if (response.data.code === 400 || response.data.code === 405) { // 提示
          notification['warning']({
            message: '提示信息',
            description: response.data.userMsg || response.data.msg || '请求错误，请重试！'
          })
        }
        resolve(response.data)
      } else {
        if (response.status === 401) {
          this.$router.push('/Login')
          return
        }
        message.error(response.statusText)
      }
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
}

export default fetch
