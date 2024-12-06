<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'    
import { ref,onMounted,computed } from 'vue'
import type{ iOrder } from '@/types/orderType'
import type { iPro } from '@/types/homeType';

const route = useRoute()
const router = useRouter()

const orderList = ref<iOrder[]>([])
// const order= ref<iOrder>(
//     {
//         orderid:'',
//         pro:[
//             {
//                 proid:'',
//                 title:'',
//                 proname:'',
//                 img:[],
//                 desc:'',
//                 price:0,
//                 num:0
//             }
//         ],
//         totalNum:0,
//         totalPrice:0
//     }
// )
// const eachPro = ref<{}>(
//     {
//         proid:'',
//         title:'',
//         proname:'',
//         img:[],
//         desc:'',
//         price:0,
//         num:0
//     }
// )
onMounted (()=>{
    // 获取购物车传递过来的数据
    // const cartListChecked = JSON.parse(localStorage.getItem('cartListChecked')||'') 
    // console.log('cartListChecked:',cartListChecked);
    // if(cartListChecked){
    //     for (let i = 0; i < cartListChecked.length; i++) {
    //         eachPro.value =  cartListChecked[i].pro;
    //         order.value.pro.push(eachPro.value)
    //         order.value.totalNum += cartListChecked[i].num
    //         order.value.totalPrice += cartListChecked[i].pro.price*cartListChecked[i].num
            
    //     }
    // }
})

function addressClick(){
    router.push('/address')
}


</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">
            <span  class="back" @click="router.back"> 返回 </span>
        </header>
        <div class="content">
           
            <div @click="addressClick" class="address">
                <van-cell :border="false" center is-link>
                    <template #title>
                        <span class="addr-1">浙江省杭州市西湖区</span>
                        <div style="font-weight: bold;">黄龙万科中心</div>
                        <div class="addr-contact">杨女士 13567181652</div>
                    </template>
                </van-cell>

                <div class="transfer">
                    <span>配送方式</span>
                    <span style="font-weight:bold;color:#323233">快递  免运费</span>
                </div>
            </div>

            <div class="card-safebuy">
                <van-card
                num="1"
                price="2.00"
                desc="描述信息"
                title="商品标题"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
                />
                <van-card
                num="1"
                price="2.00"
                desc="描述信息"
                title="商品标题"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
                />
            
                <van-cell-group :border="false">
                    <van-cell  is-link :border="false">
                        <template #title>
                            <div class="safebuy">
                                <img src="../../assets/settings/放心购.png">
                                <span>放心购</span>
                            </div>
                        </template>
                        <template #value>
                            <span style="font-weight:bold;color:#323233">商家赠送</span>
                        </template>
                    </van-cell>
                    <van-cell  is-link :border="false">
                        <template #title>
                            <span class="free-return">免费上门退</span>
                        </template>
                        <template #value>
                            <span style="font-weight:bold;color:#323233">商家赠送</span>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>

            <div class="order-detail">
                <van-cell :border="false">
                    <template #title>
                        <span>商品总价</span>
                        <span class="order-num">共3件商品</span>
                    </template>
                    <template #value>
                        <span class="order-price">¥876.00</span>
                    </template>
                </van-cell>
                <van-cell is-link title="优惠券" value="暂无可用" />
                <van-cell>
                    <template #value>
                        <span style="color:black">合计：</span>
                        <span class="order-price">¥876.00</span>
                    </template>
                </van-cell>
            </div>

            <div class="order-mark">
                <van-field v-model="value" label="订单备注" placeholder="备注建议提前协商(250字以内)" />
            </div> 
            <van-submit-bar
            :price="87600"
            button-text="提交订单"
            tip-icon="info-o"
            />


        </div>
    </main>
</template>

<style scoped lang="scss">

.back {
    position: absolute;
    left: 10px;
}
.content {
    background: #f7f8fa;
    padding: 0 10px;
    .address {
        background: white;
        .addr-1{
            font-size:12px;
        }
        .addr-contact {
            font-size: 12px;
        }
        .transfer {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            padding: 5px 20px;
        }
    }
    .card-safebuy{
        // margin-top: 50px;
        background: white;
        padding-top:10px;
        .safebuy {
            display: flex;
            justify-content: center;
            align-items:center;
            // background: red;
            width: 0.7rem;
            height: 0.3rem;
            img {
                width: 0.18rem;
                height: 0.18rem;
                margin-right: 5px;
            }
        }
        .free-return {
            margin-left: 5px
        }
    }
    .order-detail {
        margin-top:10px;
        .order-num {
            color: grey;
            margin-left:5px;
            font-size:14px;
        }
        .order-price {
            color: black;
            font-weight:bold;
        }
    }
    .order-mark {
        background: white;
        // background:red;
        margin-top:10px;
        height: 200px;
    }
}



</style>