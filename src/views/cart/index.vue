<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { cartListFn,checkedAll,editCart,delCart} from '@/api/mock'
import { ref,onMounted,computed } from 'vue'
import { showToast } from 'vant'
import { useUserStore } from '@/stores/user';
import type{ iCart } from '@/types/cartType'

const route = useRoute()
const router = useRouter()

const cartList = ref([
    {
        cartid: '',
        pro: {
            proid: '',
            title: '',
            proname: '',
            img: [],
            desc: '',
            label: '',
            price: 0
        },
        num: 0,
        checked: false
    },
])

const cartListChecked = ref(
    [{
        cartid: '',
        pro: {
            proid: '',
            title: '',
            proname: '',
            img: [],
            desc: '',
            label: '',
            price: 0
        },
        num: 0,
        checked: false
    }]
)
// function checkedCartList(){
//     getCartList();
//     for (let i = 0; i < cartList.value.length; i++) {
//         if(cartList.value[i].checked!=undefined && cartList.value[i].checked){
//             cartListChecked.value.push(cartList.value[i])  
//         }
//    }
// }

function onSubmit(){
    // checkedCartList()
    // localStorage.setItem('cartListChecked',JSON.stringify(cartListChecked.value))
    router.push('/order/osubmit')
}

const checkAll = ref(true)

function getCartList(){
    cartListFn().then(res=>{
        if(res.code==200){
            cartList.value = res.data
            // 检查是否全选
            checkAll.value= true
            for (let i = 0; i < cartList.value.length; i++) {
                if(cartList.value[i].checked == false){
                    checkAll.value = false
                    break
                }
            }
        }
    })
}

onMounted (()=>{
    getCartList()  
})

const price = computed(()=>{
   let sum = 0;
   for (let i = 0; i < cartList.value.length; i++) {
        if(cartList.value[i].checked!=undefined && cartList.value[i].checked){
            sum += cartList.value[i].pro.price * cartList.value[i].num
        }
   }
   return sum*100
})

function editNum(cartid:String,num:number,type:number){
    if(type==0){
        num++;
    }else{
        num <2 ? 0:num--;
    }
    editCart({cartid:cartid,num:num}).then(res=>{
        if(res.code==200){
            showToast('编辑成功')
            getCartList()
        }
    })
}

function deleteCart(cartid:String){
    delCart({cartid:cartid}).then(res=>{
        if(res.code==200){
            showToast('删除成功')
            getCartList()
        }
    })
}

function clickAll(){
    checkedAll({allChecked:checkAll.value}).then(res=>{
        if(res.code==200){
            checkAll.value = checkAll.value
            getCartList()
        }
    })
}

function selectOne(cartid:string,checked:boolean){
    editCart({cartid:cartid,checked:checked}).then(res=>{
        if(res.code==200){
            getCartList()
        }
    })
}




</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">
            <span  class="back" @click="router.back"> 返回 </span>购物车
        </header>
        <div class="content">
        
            <van-swipe-cell v-for="item in cartList" :key="item.cartid">
                <div class="check-card">
                    <van-checkbox @click="selectOne(item.cartid,item.checked)" v-model="item.checked"></van-checkbox>
                    <van-card
                        :num="item.num"
                        :price="item.pro.price"
                        :desc="item.pro.desc"
                        :title="item.pro.proname"
                        :thumb="item.pro.img[0]"
                        class="goods-card"
                        >
                
                        <template #tags>
                            <van-tag v-if="item.pro&&item.pro.label" plain type="primary">{{ item.pro.label || '标签'}}</van-tag>
                        </template>
                        <template #footer>
                            <van-button @click="editNum(item.cartid,item.num,0)" size="mini"><div class="add">+</div> </van-button>
                            <van-button @click="editNum(item.cartid,item.num,1)" size="mini"><div class="sub">-</div> </van-button>
                        </template>
                    </van-card>
                </div>
                
                <template #right>
                    <van-button @click="deleteCart(item.cartid)" square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
            <van-submit-bar :price="price" button-text="提交结算" @submit="onSubmit" />
            <van-checkbox class="is-all" @click="clickAll" v-model="checkAll">全选</van-checkbox>
        </div>
    </main>
</template>

<style scoped lang="scss">
.content {
    
    .check-card {
        display: flex;
        justify-content: center;
        align-items: center;
        .van-checkbox {
            width: 20px;
            height: 20px;
            margin: 0 10px;
        }
        .van-card {
            width: 3.3rem;
        }
    }
    .van-submit-bar {
        position: fixed;
        bottom: 0.1rem;
    }
    .is-all {
        position: fixed;
        left: 0.15rem;
        bottom: 0.25rem;
        z-index:9999999;
        font-size: 14px;
    }
}
.back {
    position: absolute;
    left: 10px;
}
.add {
    width: 15px;
    height: 15px;
    line-height: 15px;
    font-size: 16px;
}
.sub {
    width: 15px;
    height: 15px;
    line-height: 15px;
    font-size: 20px;
}

.goods-card {
    margin: 0;
    // background-color: white;
  }

  .delete-button {
    height: 100%;
  }
    
</style>