import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({showSpinner: false});
let apiInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 6000,
    withCredentials: true,
});

apiInstance.cancelToken = axios.CancelToken

// 请求拦截器
apiInstance.interceptors.request.use(config => {
    NProgress.start();
    return config;
}, error => {
    return Promise.reject(error);
});



// 响应拦截器
apiInstance.interceptors.response.use(response => {
    NProgress.done();
    if(response.data.code === 'BIZ.BUSSINESS_EXCEPTION') {

    }
    if(response.data.code === 'PARAM.EXCEPTION') {

    }
    if(response.data.code === 'SYS.UNKNOWN_EXCEPTION') {

    }
    return response.data;
}, error => {
    NProgress.done();
    return Promise.reject(error);
});

export default apiInstance;
