<script setup lang="ts">
import { prolist } from '@/api/mock'
import { ref,computed,reactive } from 'vue'
import type { Ref} from 'vue'
import {showToast} from 'vant'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user';
import type {iPro} from '@/types/proType'
import {useRouter,useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()


const user = useUserStore()

const state: {proList: iPro[]} = reactive({
    proList: []
})


onMounted(()=>{
    prolist().then(res=>{
        // console.log(res.data);
        state.proList = res.data
    })
})


</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">顺物</header>
        <div class="content">
            <div @click="router.push({ path: '/pro', query: { proid: item.proid} })" class="pro-item" v-for="(item,index) in state.proList" :key="index">
                <div class="pro-title">
                    <span>｜</span>
                    {{item.title}}
                </div>
                <span class="pro-recommend">——紫薇大师推荐以下好物——</span>

                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item><img src='@/assets/proimg/1.jpg'></van-swipe-item>
                    <van-swipe-item><img src='@/assets/proimg/2.jpg'></van-swipe-item>
                    <van-swipe-item><img src='@/assets/proimg/3.jpg'></van-swipe-item>
                    <van-swipe-item><img src='@/assets/proimg/4.jpg'></van-swipe-item>
                </van-swipe>

                <div class="pro-name">{{item.proname}}</div>
                <div class="pro-desc">{{item.desc}}</div>
                <div class="pro-price">￥{{item.price}}</div>
                <div class="pro-buynum">已有1109人加持</div>
            </div>
           
        </div>
    </main>
</template>
<style lang="scss" scoped>

    .content {
        background-color: #f0f0f0;
        padding: 0px 10px;
        .pro-item {
            position: relative;
            width: 100%;
            height: 4rem;
            background-color: white;
            margin-bottom: 10px;
            padding-top: 10px;
            .pro-title {
                font-size: 16px;
                font-weight: bold;
                margin: 0px 0 60px 0;
                span {
                    color: #eda15a;
                }
            }
            .pro-recommend{
                color: #eda15a;
                margin-left: 80px;
                // background-color: red;
            }
            .my-swipe .van-swipe-item {
                margin-top: 10px;
                margin-bottom: 8px;
                color: #fff;
                font-size: 20px;
                line-height: 15px;
                text-align: center;
                background-color: #39a9ed;
                img {
                    width: 100%;
                    height: 1.6rem;
                } 
            }
            .pro-name {
                font-size: 16px;
                font-weight:500;
            }
            .pro-price {
                font-size: 16px;
                color: #eda15a;
                margin-top: 10px;
            }
            .pro-buynum {
                position: absolute;
                right: 10px;
                bottom: 20px;
                font-size: 14px;
                color: #989898;
            }
            .pro-desc {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                color: #989898;
                // background-color: #eda15a;
                margin-top: 10px
            }
        }
    }
  
</style>
