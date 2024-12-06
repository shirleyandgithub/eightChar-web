<script setup lang="ts">
import { useUserStore } from '@/stores/user';

// 因为在使用的时候 pinia 中的数据是响应式的
const user = useUserStore()
// 因为在使用本地存储的时候数据不是响应式
const token = localStorage.getItem('token') || ''
// 所以在使用的时候分情况选择使用 pinia 还是 本地存储，大多是使用 pinia


</script>

<template>

    <!-- router-link 声明式路由，用来控制页面显示用的 -->
    <footer class="footer">
        <!-- 声明式跳转页面也可以进行参数的传递 -->
        <router-link :query="{ name: '传递参数' }" to="/home">
            <span class="iconfont icon-shouye"></span>
            <p>八字</p>
        </router-link>
        
        <router-link to="/record">
            <span class="iconfont icon-fenlei"></span>
            <p>档案</p>
        </router-link>

        <router-link :to="user.loginState ? '/prolist' : '/login'">
            <span class="iconfont icon-gouwuche"></span>
            <p>{{ user.loginState ? '顺物' : '去(未)登录' }}</p>
        </router-link>


        <router-link to="/user">
            <span class="iconfont icon-My"></span>
            <p>我的</p>
        </router-link>

    </footer>
</template>
