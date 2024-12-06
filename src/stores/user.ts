import { defineStore } from "pinia";
import { ref } from 'vue'
import type { Ref } from 'vue'


interface iUser {
    loginState: boolean;
    userid: string;
    token: string;
}

export const useUserStore = defineStore('user', () => {
    // 定义全局状态
    // 用户是否登录
    const loginState: Ref<boolean> = ref(localStorage.getItem('loginState') == 'true')
    // 用户 id 
    const userid: Ref<string> = ref(localStorage.getItem('userid') || '')
    // 用户的 token 
    const token: Ref<string> = ref(localStorage.getItem('token') || '')

    // 定义一个修改全局状态的方法
    function changeUserState(userInfo: iUser) {
        loginState.value = userInfo.loginState
        userid.value = userInfo.userid
        token.value = userInfo.token

        // 将状态存储到本地
        localStorage.setItem('loginState', String(userInfo.loginState))
        localStorage.setItem('userid', userInfo.userid)
        localStorage.setItem('token', userInfo.token)
    }

    // 将全局状态中的属性和方法暴露出去
    return {
        loginState,
        userid,
        token,
        changeUserState
    }
})