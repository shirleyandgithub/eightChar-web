<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref,onMounted } from 'vue'
import { getAddressDetailFn,editAddressFn,delAddressFn } from '@/api/address'
import type { AddressEditInfo } from 'vant'
import { areaList } from '@vant/area-data'

const route = useRoute()
const router = useRouter()
const addressInfo = ref<AddressEditInfo>({
    name: '',
    tel: '',
    addressDetail: '',
    isDefault: false,
    province: '',
    city: '',
    county: '', 
    country: '',
    areaCode: '',
})

// 获取地址详情
onMounted(async () => {
  if (route.query.id) {
    const res = await getAddressDetailFn(Number(route.query.id))
    // console.log('获取地址详情接口返回：',res);
    
    // @ts-ignore
    if (res.code === 200) {
      // @ts-ignore
      const detail = res.data
      addressInfo.value = {
        name: detail.username,
        tel: detail.phone,
        addressDetail: detail.detailAddress,
        isDefault: detail.setDefault === 1,
        province: detail.address?.split(' ')[0] || '',
        city: detail.address?.split(' ')[1] || '',
        county: detail.address?.split(' ')[2] || '',
        country: '', 
        areaCode: '',
      }
    }
  }
})

async function onSave(content: any) {
  const data = {
    id: Number(route.query.id),
    userId: Number(localStorage.getItem('userid') || ''),
    username: content.name,
    phone: content.tel,
    address: content.province + content.city + content.county,
    detailAddress: content.addressDetail,
    setDefault: content.isDefault ? 1 : 0
  }
 
  const res = await editAddressFn(data)
//   console.log('编辑接口返回：',res);
  
  // @ts-ignore
  if (res.code === 200) {
    router.back()
  }
}

async function onDelete() {
  const res = await delAddressFn(Number(route.query.id))
//   console.log('删除接口返回：',res);
  // @ts-ignore
  if (res.code === 200) {
    router.back()
  }
}


</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">
            <span  class="back" @click="router.back"> 返回 </span>编辑地址
        </header>
        <div class="content">
            <van-address-edit
            :address-info="addressInfo" 
            :area-list="areaList"
            show-delete
            show-set-default
            show-search-result
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
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