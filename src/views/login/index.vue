<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { showToast } from 'vant'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import {loginFn} from '@/api/login'

const router = useRouter()
const route = useRoute()

// 获取全局状态和修改方法
const user = useUserStore()
console.log(user);

const loginname: Ref<string> = ref('')
const password: Ref<string> = ref('')

const flag = computed(() => {
    // return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(loginname.value) != true
    return false;
})

// 登录按钮的点击事件
function onSubmit() {
    loginFn({
        username: loginname.value,
        password: password.value
    }).then(res => {
        if (res.data.token) {
            // 保存用户信息
            user.changeUserState({
                loginState: true,
                token: res.data.token,
                userid: res.data.userId
            })
            // 如果从详情页面进入的登录，那么就回到详情页面
            if (route.query.type == 'back') {
                router.back()
            } else {
                router.push('/')
            }
        } else {
            showToast(res.data.message)
        }
    })
}


</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">登录</header>
        <div class="content">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field style="height: 60px;" v-model="loginname" name="用户名" label="用户名" placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]" />
                    <van-field style="height: 60px;" v-model="password" type="password" name="密码" label="密码"
                        placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
                </van-cell-group>
                <div class="button">
                    <div style="margin: 16px;">
                        <van-button :disabled="flag" round block color="#eda15a" native-type="submit">
                            登录
                        </van-button>
                    </div>
                    <div style="margin: 16px;">
                        <van-button @click='$router.push("/register")' round block color="#eda15a" native-type="submit">
                            注册
                        </van-button>
                    </div>
                </div>
            </van-form>
        </div>
    </main>
</template>
<style lang="scss" scoped>
.content {
    margin-top: 80px;
}
.button {
    padding-left: 50px;
    padding-right: 50px;
}
</style>