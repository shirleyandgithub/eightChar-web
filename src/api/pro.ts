import axios from '@/utils/request'




export function proDetailFn(proid:String) {
    return axios({
        url: '/pro/detail/'+proid,
        method: 'get'
    })
}