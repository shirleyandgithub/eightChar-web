<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref,onMounted,computed } from 'vue'
import { getCollectList } from '../../api/mock'
import type{ iCollect} from '@/types/collectType'

const route = useRoute()
const router = useRouter()

const collectList = ref<iCollect[]>([])

onMounted(()=>{
    getCollectList().then(res=>{
        // console.log('收藏列表结果返回：',res);
        if(res.code==200){
            collectList.value = res.data
        }
    })    
})

</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">
            <span  class="back" @click="router.back"> 返回 </span>我的收藏
        </header>
        <van-card @click="router.push({ path: '/pro', query: { proid:item.pro.proid} })"
        v-if="collectList.length>0"
        v-for="(item,index) in collectList" :key="index"
        :price=item.pro.price
        :thumb=item.pro.img[0]
        :desc=item.pro.desc
        :title=item.pro.proname
        >
        <template #tags>
            <van-tag v-if="item.pro&&item.pro.label" plain type="primary">{{ item.pro.label }}</van-tag>
        </template>
        </van-card>
        <div v-else class="no-collect">
            <img src="../../assets/settings/空空.png" alt="">
            <p>暂无收藏宝贝，再逛逛吧！</p>
        </div>
    </main>
</template>

<style scoped lang="scss">
.back {
    position: absolute;
    left: 10px;
}
.no-collect {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60%;
    font-size: 16px;
    color: #eda15a;
    img {
        width: 30%;
    }
}
</style>