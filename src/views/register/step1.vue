<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { docheckPhoneFn } from '@/api/login'
import { useRouter } from 'vue-router'
import { showToast } from 'vant';


const router = useRouter()

function onSubmit() { }
const tel: Ref<string> = ref('')

const flag = computed(() => {
    return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(tel.value) != true
})

function nextClick() {

    docheckPhoneFn({
        tel: tel.value
    }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
            // 将手机号保存，发送验证码的时候需要使用
            localStorage.setItem('tel', tel.value)
            // console.log(route, router);
            // 跳转到发送验证码页面
            router.push('/register/step2')
        } else {
            // 给用户提示
            showToast(res.data.message);
        }

    })



}
</script>
<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field style="height: 60px;" v-model="tel" name="手机号" label="手机号" placeholder="请输入手机号"
                :rules="[{ required: true, message: '请填写手机号' }]" />

        </van-cell-group>
        <div style="margin: 16px;">
            <van-button @click="nextClick" :disabled="flag" round block color="#f66" native-type="submit">
                下一步
            </van-button>
        </div>
    </van-form>
</template>