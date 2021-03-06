import fetch from './fetch'

export default {
    // 公共接口
    common: {
        login(params) {
            console.log(params);
            return fetch('/v1/match-admin/sys-user-info/login',
                params,
                'post',
                'json',
            )
        },
        getCustomBaseInfoPage(params) {
            return fetch('/v1/match-admin/custom-base-info', params, 'get', 'json')
        },


        getCustomBaseInfoById(id) {
            return fetch(`/v1/match-admin/custom-base-info/${id}`)
        },

        insertCustomBaseInfo(params) {//获取药具类型
            return fetch(`/v1/match-admin/custom-base-info`, params, 'post', 'json')
        },
    },
}
