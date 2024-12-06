<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref,onMounted,computed } from 'vue'
import { getAddressListFn } from '@/api/address'
const router = useRouter()

const chosenAddressId = ref('1');

const addressList = ref([{
    id: '',
    name: '',
    tel: '',
    address: '',
    isDefault: true,
}])

onMounted(()=>{
    getAddressListFn().then((res:any)=>{
        console.log('获取地址列表接口返回：',res);
        if(res.code==200){
            addressList.value = res.data.map((item: any) => ({
                id: item.id?.toString() || '',
                name: item.username, 
                tel: item.phone,
                address: item.address + ' ' + item.detailAddress,
                isDefault: item.setDefault === 1,
            }))
            .sort((a:any, b:any) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));
           
            for (let i = 0; i < addressList.value.length; i++) {
                if(addressList.value[i].isDefault){
                    chosenAddressId.value = addressList.value[i].id
                    break
                }
            }
        }
    })
})


function onEdit(item: any) {
    router.push({ path: '/address/edita', query: { id: item.id } })
}
function onAdd(){
    router.push('/address/adda')
}

</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">
            <span  class="back" @click="router.back"> 返回 </span>地址列表
        </header>
        <div class="content">
            <van-address-list
            v-model="chosenAddressId"
            :list="addressList"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
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