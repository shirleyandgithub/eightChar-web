<script setup lang="ts">
import type { iPro } from '@/types/homeType'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { proDetailFn} from '@/api/pro'
import { useRouter } from 'vue-router'

const router = useRouter()

const { proList } = defineProps({
    proList: Array<iPro>
})


const iconName: Ref<string> = ref('bars')

function changeIconClick() {
    iconName.value = iconName.value == 'bars' ? "apps-o" : "bars"
}

const classType = computed(() => {
    return iconName.value == 'bars' ? 2 : 1
})


function clickDetail(proid:string){
    
    proDetailFn(proid).then(res=>{
        console.log(res);
        router.push({ path: '/pro', query: { proid: proid} })
    })
}

</script>
<!-- 
<van-icon name="bars" />
<van-icon name="apps-o" />
-->
<template>
    <!-- 
     cols_1: 左图右文
     cols_2: 上图下文
      -->
    <ul :class="'proList cols_' + classType">
        <li class="proItem" v-for="item in proList" :key="item.proid" @click="clickDetail(item.proid)">
            <div class="itemImage">
                <van-image style="width: 100%; height: 100%;" :src="item.img1" />
            </div>
            <div class="itemInfo">
                <div class="proname van-multi-ellipsis--l2">{{ item.proname }}</div>
                <div class="price">￥{{ item.originprice }}</div>
            </div>
        </li>


        <div @click="changeIconClick" class="changeIcon">
            <van-icon size="26" :name="iconName"></van-icon>
        </div>
    </ul>
</template>

<style lang="scss" scoped>
.cols_1 .proItem {
    height: 1rem;
    display: flex;
    border: 1px solid #f66;
}

.cols_1 .proItem .itemImage {
    height: 1rem;
    width: 1rem;
    padding: 5px;
    box-sizing: border-box;
}

.cols_1 .proItem .itemInfo {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.proname {
    font-size: 0.14rem;
}

.price {
    color: #f66;
}

// 上图下文
.cols_2 {
    display: flex;
    flex-wrap: wrap;
}

.cols_2 .proItem {
    width: 48%;
    border: 1px solid #f66;
    margin: 5px 1%;
    box-sizing: border-box;
}

.cols_2 .proItem .itemImage {
    width: 100%;
    height: 2rem;
}

.cols_2 .proItem .itemInfo {
    line-height: 22px;
    padding: 5px 10px;
    box-sizing: border-box;
}

.changeIcon {
    position: fixed;
    right: 12px;
    bottom: 62px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #f66;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>