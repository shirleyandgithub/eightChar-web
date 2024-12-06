<template>
    <main class="box">
        <header class="header">头部-404</header>
        <div class="content">
            <van-empty image="error" description="没有找到页面哟亲" />
            <van-button @click="$router.push('/')">返回首页</van-button>
            <van-button @click="$router.back()">返回上一页面</van-button>
        </div>
    </main>
</template>
