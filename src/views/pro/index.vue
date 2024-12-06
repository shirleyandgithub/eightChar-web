<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { proDetailFn,addCartFn,addCollect,delCollect} from '@/api/mock'
import { ref,onMounted } from 'vue'
import type{Ref} from 'vue'
import { showToast } from 'vant'
import { useUserStore } from '@/stores/user';
import type{ iCart } from "@/types/cartType";
import type{ iCollect } from "@/types/collectType";
import { availableMemory } from 'process'


// 在 pinia 中获取用户数据
const user = useUserStore()
const route = useRoute()
const router = useRouter()
const id = ref('')
id.value = route.query.proid as string;

// const countAddCart = ref(0)

const proDetail = ref({
    proid: '',
    title: '',
    proname: '',
    img: ['','','',''],
    desc: '',
    label: '',
    price: 0,
    collectid:''
});


const cart:Ref<iCart> = ref({
    cartid: '',
    num: 1,
    pro: proDetail.value
})

const collect = ref<iCollect>({
    collectid: '',
    pro:{
        proid: '',
        title: '',
        proname: '',
        img: ['','','',''],
        desc: '',
        label: '',
        price: 0
    }
});

const iconCollect = ref('')

onMounted (()=>{
    getProDetailRefresh()  
})

function getProDetailRefresh(){
    proDetailFn({proid:id.value}).then(res=>{
        if(res.code == 200){
            proDetail.value = res.data,
            cart.value.pro = res.data
            cart.value.cartid = 'cart_'+res.data.proid
            collect.value.pro= res.data
            // console.log('看收藏：', res.data);
            if(collect.value.pro.collectid!=undefined || collect.value.pro.collectid!=null){
                iconCollect.value = 'star'
            }else{
                iconCollect.value = 'star-o'
            }
        }
    })
}



function clickCollect(){
    if(iconCollect.value=='star-o'){
        addCollect({collect:collect.value}).then(res=>{
            if(res.code==200){
                showToast('收藏成功')
                // 改变图标为已收藏
                iconCollect.value = 'star'
                getProDetailRefresh()
            }
        })
    } else {
        delCollect({collectid:proDetail.value.collectid}).then(res=>{
            if(res.code==200){
                showToast('取消收藏成功')
                iconCollect.value = 'star-o'
                getProDetailRefresh()
            }
        })
    }
    
}


function addCart(){
    addCartFn({cart:cart.value}).then(res=>{
        // console.log('新增购物车返回：',res);
        if(res.code == 200){
            showToast('添加购物车成功')
        } 
    })
}


// --------------- 打开聊天
function showMQ() {
    // console.log(window);

    window._MEIQIA('metadata', {
        address: '杭州', // 地址
        age: '20', // 年龄
        comment: '有钱', // 备注
        email: '888888@163.com', // 邮箱
        gender: '男', // 性别
        name: '老王', // 名字
        qq: '88888888', // QQ
        tel: '18888888888', // 电话
        weibo: '无', // 微博
        weixin: '18888888888', // 微信
        contact: '18888888888', // 联系人
    })

    window._MEIQIA('showPanel');
}

// ---------------- 进入购物车
function goToCartClick() {
    if (user.loginState) {
        router.push('/cart')
    } else {
        router.push({
            path: '/login',
            query: {
                type: 'back'
            }
        })
    }
}


</script>
<template>
    <main class="box">
        <header style="font-size: 16px;" class="header">
            <span  class="back" @click="router.back"> 返回 </span>商品详情
        </header>
        <div class="content" >
            <div>
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item><img :src="proDetail.img[0]" ></van-swipe-item>
                    <van-swipe-item><img :src="proDetail.img[1]" ></van-swipe-item>
                    <van-swipe-item><img :src="proDetail.img[2]" ></van-swipe-item>
                    <van-swipe-item><img :src="proDetail.img[3]" ></van-swipe-item>
                </van-swipe>
                <div class="name-price">
                    <h2>{{ proDetail.proname }}</h2>
                    <h1 class="price">¥{{ proDetail.price }}</h1>
                </div>
                <div class="desc">{{ proDetail.desc}}</div>
                <div class="img-list">
                    <img :src="proDetail.img[0]" >
                    <img :src="proDetail.img[1]" >
                    <img :src="proDetail.img[2]" >
                    <img :src="proDetail.img[3]" >
                </div>
            </div>
            
            <van-action-bar>
                <van-action-bar-icon icon="chat-o" text="客服" @click="showMQ" dot />
                <van-action-bar-icon @click="clickCollect" :icon="iconCollect" text="收藏"  />
                <!-- <van-icon name="star" /> -->
                <van-action-bar-button @click="addCart" type="warning" text="加入购物车" />
                <van-action-bar-button type="danger" text="立即购买" />
            </van-action-bar>

            <div @click="router.push({path:'/cart'})" class="cart-logo">
                <van-icon name="cart-o" size="20" color="white" />
                <span>购物车</span>
            </div>

        </div>
    </main>
</template>
<style lang="scss" scoped>
.back {
    position: absolute;
    left: 10px;
}
.content {
    background-color: #eeeef3;
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 10px;
        text-align: center;
        background-color: #39a9ed;
        img{
            width: 100%;
            height: 3rem;
        }
    }
    .name-price {
        padding: 5px 10px;
        background-color: white;
        .price {
            color: #eda15a;
            font-size: 20px;
        }
    }
    .desc {
        margin: 0.15rem 0;
        padding: 10px;
        background-color: white;
        font-size: 14px;
        color: #eda15a;
    }
    .img-list {
        img {
            width: 100%;
            height: 4rem;
        }
    }
    .cart-logo {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: #eda15a;
        position: fixed;
        bottom: 1rem;
        right: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
    }
}

</style>