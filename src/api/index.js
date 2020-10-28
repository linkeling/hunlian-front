import fetch from './fetch'

export default {
  // 登录
  userLogin(params) {
    return fetch('/basic-info/v1/basic-info/basic-sys-user/login',
      params,
      'post',
      'json',
    )
  },

  getCustomBaseInfoPage(params){
    return fetch('/v1/match-admin/custom-base-info',
      params,
      'get',
      'json',
    )
  }
}
