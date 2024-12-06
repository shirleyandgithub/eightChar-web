import axios from 'axios'

import type { AxiosInstance } from 'axios'
import { showLoadingToast, closeToast } from 'vant'


// 判断当前的环境是否为开发环境
const isDev: boolean = process.env.NODE_ENV == 'development'

const request: AxiosInstance = axios.create({
    // baseURL: isDev ? 'http://10.31.155.4:3000/api' : 'http://10.31.155.4:3000/api',
    baseURL: '/',
    timeout: 60000,
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    }
})


// 添加请求拦截器
request.interceptors.request.use(function (config) {

    // 开启加载
    // showLoadingToast({
    //     message: '加载中...',
    //     forbidClick: true,
    //     loadingType: 'spinner',
    //     duration: 60000
    // });

    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    config.headers.token = token;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {

    // 关闭加载
    closeToast()

    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log(response);

    if (response.data.data) {
        // console.log(response);
        return response.data
    } else {
        return response;
    }


}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


interface iConfig {
    url: string;
    method?: string;
    data?: any;
    headers?: any;
    params?: any
}

// 自定义各种请求方法
export default function ajax(config: iConfig) {

    // 1. 获取到请求的必要参数
    const { url = '', method = 'get', data = {}, headers = {} } = config

    // 2. 判断请求类型
    switch (method.toUpperCase()) {
        case 'GET':
            return request.get(url, { params: data })
        case 'POST':
            // 判断是表单数据
            if (headers['content-type'] == 'application/x-www-form-urlencoded') {
                const obj = new URLSearchParams()
                for (const key in data) {
                    obj.append(key, data[key])
                }
                return request.post(url, obj, { headers })
            }
            // 判断是文件数据
            if (headers['content-type'] == 'multipart/form-data') {
                const obj = new FormData()
                for (const key in data) {
                    obj.append(key, data[key])
                }
                return request.post(url, obj, { headers })
            }
            return request.post(url, data)
        case "DELETE":
            return request.delete(url, { data })
        case "PUT":
            return request.put(url, data)
        case "PATCH":
            return request.patch(url, data)
        default:
            return request.request(config)
    }


}

