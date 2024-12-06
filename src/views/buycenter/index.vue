<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref,onMounted,computed } from 'vue'

const route = useRoute()
const router = useRouter()


</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">
            <span  class="back" @click="router.back"> 返回 </span>我的顺物
        </header>
        <div class="content">
            <div @click="router.push({path:'/order'})" class="myorder">
                <img src="../../assets/settings/我的订单.png">
                <div >我的订单</div>
            </div>
            
            <div @click="router.push({path:'/cart'})" class="mycart">
                <img src="../../assets/settings/购物车.png">
                <div >购物车</div>
            </div>
                
            <div @click="router.push({path:'/order'})"  class="own">
                <img src="../../assets/settings/小和尚.png">
                <div >已加持</div>
            </div>
            <div @click="router.push('/collect')" class="collect">
                <img src="../../assets/settings/我的收藏.png">
                <div >我的收藏</div>
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
    background-color: #f7f8fa;
    padding: 10px;
    div {
        width: 1.55rem;
        height:1.55rem;
        background-color:white;
        float: left;
        margin: 10px;
    }
    .collect {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
            width: 1rem;
            height: 0.8rem;
            // background-color: red;
        }
        div {
            width: 0.7rem;
            height: 0.2rem;
            font-size: 16px;
            // background-color: red;
        }
    }
    .own {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
            width: 1rem;
            height: 0.8rem;
            // background-color: red;
        }
        div {
            width: 0.5rem;
            height: 0.2rem;
            font-size: 16px;
            // background-color: red;
        }
    }
    .mycart {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
            width: 0.8rem;
            height: 0.6rem;
            // background-color: red;
        }
        div {
            width: 0.5rem;
            height: 0.2rem;
            font-size: 16px;
            // background-color: red;
        }
    }
    .myorder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
            width: 1rem;
            height: 0.6rem;
        }
        div {
            width: 0.7rem;
            height: 0.2rem;
            font-size: 16px;
        }
    }
}
</style>