import axios from '@/utils/request'
import type{ iRecord } from "@/types/recordType";


// 获取档案列表
export function recordListFn() {
    return axios({
        url: '/api/record/list',
        method: 'get',
    })
}

// 新增档案
export function addRecordFn(data:iRecord) {
    return axios({
        url: '/api/record/add',
        method: 'post',
        data
    })
}

// 编辑档案
export function editRecordFn(data:iRecord) {
    return axios({
        url: '/api/record/update',
        method: 'post',
        data
    })
}

// 删除档案

export function delRecordFn(id: number) {
    return axios({
        url: '/api/record/delete?id=' + id,
        method: 'delete'
    });
}

// 获取档案id集合
export function getRecordIdListFn() {
    return axios({
        url: '/api/record/recordIdList',
        method: 'get'
    })
}