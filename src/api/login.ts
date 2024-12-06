import axios from '@/utils/request'

interface iData {
    tel?: string;
    telcode?: string;
    password?: string;
    username?: string
}

// 验证手机号是否被注册
export function docheckPhoneFn(data: iData) {
    return axios({
        url: '/user/docheckphone',
        method: 'post',
        data
    })
}

// 发送验证码的方法
export function dosendmsgcode(data: iData) {
    return axios({
        url: '/user/dosendmsgcode',
        method: 'post',
        data
    })
}


// 验证 验证码是否正确
export function docheckcodeFn(data: iData) {
    return axios({
        url: '/user/docheckcode',
        method: 'post',
        data
    })
}

// 提交注册
export function dofinishregister(data: iData) {
    return axios({
        url: '/user/dofinishregister',
        method: 'post',
        data
    })
}

// 登录的接口
export function loginFn(data: iData) {
    return axios({
        url: '/api/user/login',
        method: 'post',
        data
    })
}

// 根据id获取用户信息
export function getUserinfoFn(id:Number) {
    return axios({
        url: '/api/user/getUserById?id='+ id,
        method: 'get'
    })
}

// 修改密码
export function updatePasswordFn(data: {
    oldpassword: String,
    newpassword: String,
    userid: String
}) {
    return axios({
        url: '/user/updatePassword',
        method: 'get',
        data
    })
}