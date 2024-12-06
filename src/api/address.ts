import axios from '@/utils/request'
import type{ iAddress } from "@/types/addressType";


//获取地址列表
export function getAddressListFn() {
    return axios({
        url: '/api/address/list',
        method: 'get',
    })
}

// 获取地址详情
export function getAddressDetailFn(id:number) {
    return axios({
        url: '/api/address/getById?id='+id,
        method: 'get'
    })
}

// 新增地址
export function addAddressFn(data:iAddress) {
    return axios({
        url: '/api/address/create',
        method: 'post',
        data
    })
}

// 编辑地址
export function editAddressFn(data:iAddress) {
    return axios({
        url: '/api/address/update',
        method: 'post',
        data
    })
}

// 删除地址
export function delAddressFn(id:number) {
    return axios({
        url: '/api/address/delete?id='+id,
        method: 'delete',
    })
}