<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'    
import { ref,onMounted,computed } from 'vue'
import type{ iOrder } from '@/types/orderType'
import type { iPro } from '@/types/homeType';
import { orderList} from '@/api/mock'

const route = useRoute()
const router = useRouter()



onMounted(()=>{
    // orderList().then(res=>{
    //     console.log(res);
    // })
})

</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">
            <span  class="back" @click="router.back"> 返回 </span>我的订单
        </header>
        <div class="content">
           <div class="search">
                <input type="text" placeholder="搜索订单" v-model="search" />
           </div>
           <div class="title">
                <div>
                    <span>全部</span>
                    <span>待付款</span>
                    <span>待发货</span>
                    <span>待评价</span>
                </div>  
           </div>
           <div class="orderlist">
            <div class="order">
                <div class="order-header">
                    <div class="first-row">
                        <span>紫薇小店 
                            <van-icon name="arrow" />
                        </span>
                        <span>等待买家付款</span>
                    </div>
                    <div class="second-row">订单编号：E20241115104313021400078</div>
                </div>
                <van-card
                    desc=""
                    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
                    >
                    <template #tags>
                        <van-tag plain type="primary">财帛宫</van-tag>
                    </template>
                    <template #footer>
                        <div class="pay-info">
                            <span class="pay-price">需付款
                                <span style="font-weight: bold;font-size: 13px;">¥338.00</span></span>
                            <div class="pay-btn">
                                <van-button round size="small">取消订单</van-button>
                                <van-button round size="small">立即付款</van-button>
                            </div>
                        </div>
                    </template>

                    <template #price>
                        <span class="price">¥338.0</span>
                    </template>
                    <template #num>
                        <span class="num">x2</span>
                    </template>
                    <template #title>
                        <div class="proname">
                            <span >泰山玉貔貅吊坠 肚大腰圆好寓意</span>
                        </div>
                    </template>
                </van-card>

                
            </div>
             
           </div>
        </div>
    </main>
</template>

<style scoped lang="scss">

.back {
    position: absolute;
    left: 10px;
}
.content {
    background-color: #f6f7f9 ;
    padding: 0 10px;
    .search {
        width:100%;
        height: 0.4rem;
        // background-color: red;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
            width: 90%;
            height: 0.3rem;
            border: none;
            border-radius: 0.1rem;
            background-color: #f6f7f9;
            padding-left: 0.2rem;
        }
    }
    .title {
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        font-size: 14px;
        // background-color: red;
        background-color: white;
        div {
            padding: 0 10px;
            display: flex;
            justify-content: space-between;  
        }   
    }
    .orderlist {
        .order {
            // background-color: red;
            margin-bottom: 0.1rem;
            .order-header{
            padding: 0.1rem 0.1rem 0 0.1rem;
            // background-color: red;
            height: 0.4rem;
            .first-row{
                // background-color: green;
                margin-bottom: 0.1rem;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .van-icon {
                    color: #a7a7a7;
                }
            }
            .second-row {
                font-size: 12px;
                color: #a7a7a7;
            }
        }
        .van-card{
            background-color: white;
            position: relative;
            .price{
                position: absolute;
                right: 0px;
                bottom: 0.65rem;
            }
            .num {
                position: absolute;
                right: 0px;
                bottom: 0.4rem;
            }
            .proname {
                // background-color: green;
                width: 1.4rem;
                height: 0.5rem;
                padding-top: 0.1rem;
            }
        }
        .pay-info {
            // background-color: red;
            height: 0.7rem;
            .pay-price {
                font-size: 11px;
                // background-color: green;
                margin-bottom: 10px;
            }
            .pay-btn {
                // background-color: blue;
                margin-top: 10px;
                
            }

        }

        }
        margin-top: 10px;
        background-color: white;
    }
}



</style>