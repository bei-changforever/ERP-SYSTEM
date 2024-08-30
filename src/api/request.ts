import axios from 'axios';
import constant from '@/utils/constant'

const service = axios.create({
    baseURL: constant.apiUrl,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
   
    
    const { data: res, request } = response
    if (request.status === 200 && request.statusText == 'OK') {
        return res
    }

    
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 导出 axios 实例
export default service