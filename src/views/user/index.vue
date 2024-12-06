<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ref,onMounted } from 'vue';
import { showConfirmDialog } from 'vant';
import {getUserinfoFn} from '@/api/login';
const router = useRouter()
const user = useUserStore()
function clickLogout(){

    showConfirmDialog({
    title: '退出登录',
    message:
        '确认要退出登录吗？',
    })
    .then(() => {
        localStorage.removeItem('userid');
        user.changeUserState({
            loginState: false,
            userid: '',
            token: ''
        })
        router.push('/login')
    }).catch(() => {});
}

const username = ref('')
const userid = ref('')
onMounted(()=>{
    userid.value = localStorage.getItem('userid') || '',
    getUserinfoFn(Number(userid.value)).then(res=>{
        if(res.status==200){
            username.value = res.data.username
        }
    })
})

function clickAddress(){
    router.push('/address')
}
function clickBuyCenter(){
    router.push('/buycenter')
}

function showMQ() {
    // console.log(window);

    window._MEIQIA('metadata', {
        address: '杭州', // 地址
        age: '20', // 年龄
        comment: '有钱', // 备注
        email: '888888@163.com', // 邮箱
        gender: '男', // 性别
        name: '老王', // 名字
        qq: '88888888', // QQ
        tel: '18888888888', // 电话
        weibo: '无', // 微博
        weixin: '18888888888', // 微信
        contact: '18888888888', // 联系人
    })

    window._MEIQIA('showPanel');
}

</script>
<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">我的</header>
        <div class="content">
            <section class="head">
                <img src="../../assets/settings/头像.png" alt="">
                <div class="phone">
                    <van-icon size="16" color="#dc8644" name="manager" />
                     {{username}}
                </div>
                <div class="id">ID: {{userid}}</div>
            </section>

            <van-cell @click="clickBuyCenter" title="单元格" is-link >
                <template #title>
                    <van-icon style="margin-right: 10px;" name="cart-o" color="#dc8644" />
                    我的顺物
                </template>
            </van-cell>
            <van-cell @click="showMQ" title="单元格" is-link >
                <template #title>
                    <van-icon style="margin-right: 10px;" name="chat-o" color="#dc8644" />
                    客服中心
                </template>
            </van-cell>
            <van-cell @click="clickAddress" title="单元格" is-link >
                <template #title>
                    <van-icon style="margin-right: 10px;" name="logistics" color="#dc8644" />
                    地址管理
                </template>
            </van-cell>
            <van-cell @click="clickLogout" title="单元格" is-link >
                <template #title>
                    <img  class="logout" src="../../assets/settings/退出.png" alt="">
                    退出登录
                </template>
            </van-cell>
        </div>
    </main>
</template>

<style scoped lang="scss">
.head {
    height: 170px;
    // border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
        width: 60px;
        height: 60px;
    }
    .phone {
        font-size: 16px;
        // color: #666;
        margin-top: 30px;
        margin-bottom: 8px;
        .van-icon {
            margin-right: 5px;
        }
    }
    .id {
        font-size: 14px;
        color: #666;
    }
}

.logout {
    width: 17px;
    height: 17px;
    vertical-align: middle;
    margin-right: 8px;
}
</style>