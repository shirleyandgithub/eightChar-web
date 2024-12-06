<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { dofinishregister } from '@/api/login'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
const route = useRoute()
const router = useRouter()

const password: Ref<string> = ref('')
const psw: Ref<string> = ref('')

const flag = computed(() => {
    // return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(password.value) != true
    if (password.value.length < 6) {
        return true
    } else {
        return password.value != psw.value
    }
})

function onSubmit() {
    // 将手机号保存，发送验证码的时候需要使用
    // localStorage.setItem('tel', tel.value)

    // console.log(route, router);
    // 跳转到发送验证码页面
    // router.push('/register/step2')
    dofinishregister({
        tel: localStorage.getItem('tel') || '',
        password: password.value
    }).then(res => {
        // console.log(res.data);
        showToast(res.data.message)
        router.push('/login')
    })

}
</script>
<template>
    <van-form>
        <van-cell-group inset>
            <van-field style="height: 60px;" v-model="password" name="密码" label="密码" placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field style="height: 60px;" v-model="psw" name="密码" label="密码" placeholder="请再次输入密码"
                :rules="[{ required: true, message: '请再次填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button @click="onSubmit" :disabled="flag" round block color="#f66" native-type="submit">
                注册
            </van-button>
        </div>
    </van-form>
</template>