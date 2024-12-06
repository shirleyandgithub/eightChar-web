import ajax from "@/utils/request";
import type{ iCart } from "@/types/cartType";
import type{ iOrder } from "@/types/orderType"
import type{ iCollect } from "@/types/collectType";
// 一定要导入接口文件
import '../mock/proMock'



// 获取商品列表
export function prolist() {
    return ajax({
        url: 'api/pro/prolist',
        method: 'get'
    })
}



// 根据proid获取商品详情
export function proDetailFn(data:{proid:String}) {
    return ajax({
        url: 'api/pro/detail',
        method: 'post',
        data
    })
}

// 获取购物车列表
export function cartListFn() {
    return ajax({
        url: 'api/cart/cartList',
        method: 'get'
    })
}
// 新增购物车接口
export function addCartFn(data:{cart:iCart}) {
    return ajax({
        url: 'api/cart/addCart',
        method: 'post',
        data
    })
}

//编辑购物车接口
export function editCart(data:{cartid:String,num?:number,checked?:boolean}) {
    return ajax({
        url: 'api/cart/editCart',
        method: 'post',
        data
    })
}

// 更新购物车为全选or全不选
export function checkedAll(data:{allChecked:boolean}) {
    return ajax({
        url: 'api/cart/checkedAll',
        method: 'post',
        data
    })
}

// 删除购物车接口
export function delCart(data:{cartid:String}) {
    return ajax({
        url: 'api/cart/delCart',
        method: 'post',
        data
    })
}

// 获取订单列表接口
export function orderList() {
    return ajax({
        url: 'api/order/orderList',
        method: 'get'
    })
}

// 新增订单接口
export function addOrder(data:{order:iOrder}) {
    return ajax({
        url: 'api/order/addOrder',
        method: 'post',
        data
    })
}

// 关闭订单接口
export function closeOrder(data:{orderid:string}) {
    return ajax({
        url: 'api/order/closeOrder',
        method: 'post',
        data
    })
}

// 获取收藏列表接口
export function getCollectList() {
    return ajax({
        url: 'api/collect/collectList',
        method: 'get'
    })
}

// 新增收藏接口
export function addCollect(data:{collect:iCollect}) {
    return ajax({
        url: 'api/collect/addCollect',
        method: 'post',
        data
    })
}

// 取消收藏
export function delCollect(data:{collectid:string}) {
    return ajax({
        url: 'api/collect/delCollect',
        method: 'post',
        data
    })
}

