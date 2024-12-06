<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref} from 'vue'
import { addAddressFn } from '@/api/address'
import { areaList } from '@vant/area-data';

const router = useRouter()
const showArea = ref(false)


function clickArea(){
    showArea.value = true
}

function onSave(content: any){
    const data = {
        userId: Number(localStorage.getItem('userid') || ''),
        username: content.name, 
        phone: content.tel,
        address: content.province +' '+ content.city +' '+ content.county,
        detailAddress: content.addressDetail,
        setDefault: content.isDefault ? 1 : 0
    }
    addAddressFn(data).then(res=>{
        console.log('res:',res);
        // @ts-ignore
        if(res.code==200){
            router.back()
        }
    })
}

</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">
            <span  class="back" @click="router.back"> 返回 </span>新增地址
        </header>

        <div class="content">
            <van-address-edit
            show-set-default
            :show-area="true"
             :area-list="areaList"
            @save="onSave"
            @click-area="clickArea"
            />
        </div>
    </main>
</template>

<style scoped lang="scss">
.back {
    position: absolute;
    left: 10px;
}
</style>