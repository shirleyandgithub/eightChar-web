// 接口的定义文件

import Mock from "mockjs";
import img1 from '../assets/proimg/1.jpg'
import img2 from '../assets/proimg/2.jpg'
import img3 from '../assets/proimg/3.jpg'
import img4 from '../assets/proimg/4.jpg'

const { proList } = Mock.mock({
    'proList': [
        {
            proid: '123456',
            title: '流年财帛宫进陀罗、擎羊星',
            proname: '泰山玉貔貅吊坠 肚大腰圆好寓意',
            img: [img1,img2,img3,img4],
            desc: '【吉时】推荐第一次使用时间公历11月13日卯时(5:00-7:00) 未时(13:00-15:00) 申时(15:00-17:00)、'+
             '11月15日辰时(7:00-9:00) 巳时(9:00-11:00)、11月16日卯时(5:00-7:00) 辰时(7:00-9:00) 申时(15:00-17:00)、'+
             '11月17日卯时(5:00-7:00) 辰时(7:00-9:00)。吉时寓意吉利的开始(每日更新)',
            label: '财帛宫',
            price: 269,
            
        },
        {
            proid: '123450',
            title: '先天命盘贪狼星落陷、天府星落陷',
            proname: '正安 红糖山楂条 红糖红枣山楂块酸甜口感浓郁250g',
            img: [img1,img2,img3,img4],
            desc: '',
            label: '',
            price: 29.9,
           
        }
    ]
})
//获取商品列表接口
Mock.mock('/api/pro/prolist', 'get', () => {
    const res = Mock.mock({
        code: 200,
        msg: '获取数据成功',
        data: proList
    })
    return res
})

// userList为app用户
const { userList } = Mock.mock({
    'userList': [
        {
            userid:'123456',
            username: 'shirley',
            password: '1'
        }
    ]
})


// 根据proid获取商品详情
Mock.mock('/api/pro/detail', 'post', (config) => {
    const proid = JSON.parse(config.body).proid
    const res = {
        code: 200,
        msg: '获取商品详情成功',
        data: null
    }
    for (let i = 0; i < proList.length; i++) {
        if(proList[i].proid == proid){
            res.data = proList[i]
        }
    }
    return res;
})

// 购物车数据
const { cartList } = Mock.mock({
    'cartList': [
        {
            cartid: 'cart_123456',
            pro: {
                proid: '123456',
                title: '流年财帛宫进陀罗、擎羊星',
                proname: '泰山玉貔貅吊坠 肚大腰圆好寓意',
                img: [img1,img2,img3,img4],
                desc: '【吉时】推荐第一次使用时间公历11月13日卯时(5:00-7:00) 未时(13:00-15:00) 申时(15:00-17:00)、'+
                '11月15日辰时(7:00-9:00) 巳时(9:00-11:00)、11月16日卯时(5:00-7:00) 辰时(7:00-9:00) 申时(15:00-17:00)、'+
                '11月17日卯时(5:00-7:00) 辰时(7:00-9:00)。吉时寓意吉利的开始(每日更新)',
                label: '财帛宫',
                price: 269
            },
            num: 1,
            checked: true
        },
        {
            cartid: 'cart_123450',
            pro: {
                proid: '123450',
                title: '先天命盘贪狼星落陷、天府星落陷',
                proname: '正安 红糖山楂条 红糖红枣山楂块酸甜口感浓郁250g',
                img: [img1,img2,img3,img4],
                desc: '',
                label: '',
                price: 29.9
            },
            num: 1,
            checked: false
        }
    ]
})

// 购物车列表接口
Mock.mock('/api/cart/cartList', 'get', () => {
    return {
        code: 200,
        msg: '获取购物车列表成功',
        data: cartList
    }
})
// 购物车新增接口
Mock.mock('/api/cart/addCart', 'post', (config) => {
    // console.log('新增购物车mock.js',JSON.parse(config.body));
    const cart = JSON.parse(config.body).cart
    const res = {
        code: 200,
        msg: '添加购物车失败',
        data: null
    }
    for(let i=0;i<cartList.length;i++){
        if(cartList[i].cartid === cart.cartid){
            res.msg = '添加购物车成功'
            cartList[i].num++;
            res.data = cartList
            return res
        }
    }
    cartList.push(cart),
    res.data = cartList
    res.msg = '添加购物车成功'
    return res
})

// 购物车编辑接口
Mock.mock('/api/cart/editCart', 'post', (config) => {
    const cart = JSON.parse(config.body)
    const res = {
        code: 200,
        msg: '编辑购物车失败',
        data: null
    }
    for (let i = 0; i < cartList.length; i++) {
        if(cartList[i].cartid == cart.cartid){
            if(cart.num!=undefined){
                cartList[i].num = cart.num
            }
            // cartList[i].num = cart.num
            if(cart.checked!=undefined){
                cartList[i].checked = cart.checked
            }
            res.msg = '编辑购物车成功'
            res.data = cartList
        }
    }
    return res
})

// 更新购物车为全选or全不选
Mock.mock('/api/cart/checkedAll', 'post', (config) => {
    const allChecked = JSON.parse(config.body).allChecked
    const res = {
        code: 200,
        msg: '更新失败',
        data: null
    }
    for (let i = 0; i < cartList.length; i++) {
        cartList[i].checked = allChecked
        res.msg = '更新成功'
        res.data = cartList
    }
    return res
})

// 删除购物车接口
Mock.mock('/api/cart/delCart', 'post', (config) => {
    const cartid = JSON.parse(config.body).cartid
    const res = {
        code: 200,
        msg: '删除购物车失败',
        data: null
    }
    for (let i = 0; i < cartList.length; i++) {
        if(cartList[i].cartid == cartid){
            cartList.splice(i,1)
            res.msg = '删除购物车成功'
            res.data = cartList
        }
    }
    return res
})

// 订单数据
const { orderList } = Mock.mock({
    'orderList': [
        {
            orderid: 'order_123456',
            pro: 
            [
                {
                    proid: '123456',
                    title: '流年财帛宫进陀罗、擎羊星',
                    proname: '泰山玉貔貅吊坠 肚大腰圆好寓意',
                    img: [img1,img2,img3,img4],
                    desc: '【吉时】推荐第一次使用时间公历11月13日卯时(5:00-7:00) 未时(13:00-15:00) 申时(15:00-17:00)、'+
                    '11月15日辰时(7:00-9:00) 巳时(9:00-11:00)、11月16日卯时(5:00-7:00) 辰时(7:00-9:00) 申时(15:00-17:00)、'+
                    '11月17日卯时(5:00-7:00) 辰时(7:00-9:00)。吉时寓意吉利的开始(每日更新)',
                    label: '财帛宫',
                    price: 269,
                    num: 1
                },
                {
                    proid: '123450',
                    title: '先天命盘贪狼星落陷、天府星落陷',
                    proname: '正安 红糖山楂条 红糖红枣山楂块酸甜口感浓郁250g',
                    img: [img1,img2,img3,img4],
                    desc: '',
                    label: '',
                    price: 29.9,
                    num: 1
                }
            ],
            totalNum: 1,
            totalPrice: 269
        }
    ]
})

// 获取订单列表接口
Mock.mock('/api/order/orderList', 'get', () => {
    return {
        code: 200,
        msg: '获取订单列表成功',
        data: orderList
    }
})

// 新增订单接口
Mock.mock('/api/order/addOrder', 'post', (config) => {
    console.log('新增订单mock.js',JSON.parse(config.body));
    const order  = JSON.parse(config.body).order
    const res= {
        code: 200,
        msg: '新增订单失败',
        data: null
    }
    orderList.push(order)
    res.data = orderList
    res.msg = '新增订单成功'
})

// 关闭订单接口
Mock.mock('/api/order/closeOrder', 'post', (config) => {
    const orderid = JSON.parse(config.body).orderid
    const res = {
        code: 200,
        msg: '关闭订单失败',
        data: null
    }
    for (let i = 0; i < orderList.length; i++) {
        if(orderList[i].orderid == orderid){
            orderList.splice(i,1)
            res.msg = '关闭订单成功'
            res.data = orderList
        }
    }
})

// 我的收藏数据
const { collectList } = Mock.mock({
    'collectList': [
        // {
        //     collectid: 'collect_123450',
        //     pro:{
        //         proid: '123450',
        //             title: '先天命盘贪狼星落陷、天府星落陷',
        //             proname: '正安 红糖山楂条 红糖红枣山楂块酸甜口感浓郁250g',
        //             img: [img1,img2,img3,img4],
        //             desc: '',
        //             label: '',
        //             price: 29.9
        //     }
        // }
    ]
})

// 获取收藏列表接口
Mock.mock('/api/collect/collectList', 'get', () => {
    return {
        code: 200,
        msg: '获取收藏列表成功',
        data: collectList
    }
})
// 新增收藏接口
Mock.mock('/api/collect/addCollect', 'post', (config) => {
    const collect = JSON.parse(config.body).collect;
    const res = {
        code: 200,
        msg: '添加收藏失败',
        data: null
    }
    collect.collectid = 'collect_'+Math.random().toString().substr(3,10);
    collectList.push(collect);

    // 商品添加collectid
    for(let i=0;i<proList.length;i++){
        if(proList[i].proid === collect.pro.proid){
            proList[i].collectid = collect.collectid;
        }
    }
    res.msg = '添加收藏成功';
    res.data = collectList;
    return res;
})

// 取消收藏接口
Mock.mock('/api/collect/delCollect', 'post', (config) => {
    const collectid = JSON.parse(config.body).collectid;
    const res = {
        code: 200,
        msg: '取消收藏失败',
        data: null
    }
    for (let i = 0; i < collectList.length; i++) {
        if(collectList[i].collectid == collectid){
            collectList.splice(i,1);
            // 取消商品的collectid
            for (let j = 0; j < proList.length; j++) {
                if(proList[j].collectid!=undefined || proList[j].collectid!=null){
                    if(proList[j].collectid == collectid){
                        proList[j].collectid = null;
                    }
                }
            }
            res.msg = '取消收藏成功';
            res.data = collectList;
        }
    }
    return res;
})










