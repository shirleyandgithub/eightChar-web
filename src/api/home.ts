import ajax from "@/utils/request";
import axios from '@/utils/request'


// 新增八字
export function addPersonEightFn(data:{
    recordId:Number
    name:String
    gender:Number
    birthday:String
}) {
    return ajax({
        url: '/api/person-eight/create',
        method: 'post',
        data
    })
}


// 删除八字
export function delPersonEightFn(
    recordId:Number
) {
    return ajax({
        url: '/api/person-eight/deleteByRecordId?recordId=' + recordId,
        method: 'delete'
    })
}


// 获取个人八字
export function getPersonEightFn(recordId:Number) {
    return axios({
        url: '/api/person-eight/getByRecordId?recordId=' + recordId,
        method: 'get'
    })
}

