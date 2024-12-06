<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { dosendmsgcode, docheckcodeFn } from '@/api/login'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()

const code: Ref<string> = ref('')

const flag = computed(() => {
    return code.value.length != 5
})


// 该变量用来记录倒计时时间用的
const time: Ref<number> = ref(10)
// 该变量用来显示按钮文本用的
const text: Ref<string> = ref('发送验证码')

/*
    防抖：一定的时间内，触发只会执行一次，按钮一直点，只会执行一次
    节流：一定时间内点击 10 次，触发函数只会执行指定时间次数
*/

let timeout: any = null
// 记录有没有正在发生验证码
let isSend = false

// 发送验证码按钮点击事件
function sendCodeClick() {

    if (isSend == true) {
        return
    }
    isSend = true

    // 发送验证码
    dosendmsgcode({ tel: localStorage.getItem('tel') || '' }).then(res => {
        // console.log(res);
        if (res.data) {
            showToast('验证码发送成功:' + res.data)
        }
    })


    // 当前已经有被点击，被点击了之后下次点击就不做处理了
    // if (timeout != null) {
    //     return
    // }

    // 开启延迟
    // timeout = setTimeout(() => {
    // }, 1000)

    // console.log('验证码发送了');

    const timer = setInterval(() => {
        isSend = false
        time.value--
        text.value = time.value + 's 后获取'
        if (time.value == 0) {
            // 倒计时结束
            time.value = 10
            text.value = '重新获取'
            // 关闭定时器
            clearInterval(timer)
        }
    }, 1000);
}

// 下一步按钮的点击事件
function onSubmit() {
    // $router.push('/register/step3')
    // 验证验证码是否正确
    docheckcodeFn({
        tel: localStorage.getItem('tel') || '',
        telcode: code.value
    }).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
            router.push('/register/step3')
        } else {
            showToast(res.data.message)
        }
    })
}

</script>
<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field style="height: 60px;" v-model="code" name="验证码" label="验证码" placeholder="请输入验证码"
                :rules="[{ required: true, message: '请填写验证码' }]">
                <template #button>

                    <!-- 点击后进行倒计时，倒计时结束后变成 重新发送 -->
                    <van-button :disabled="time < 10" class="send-code" @click="sendCodeClick" size="mini"> {{ text }}
                    </van-button>
                </template>
            </van-field>

        </van-cell-group>
        <div style="margin: 16px;">
            <van-button @click="onSubmit" :disabled="flag" round block color="#f66" native-type="submit">
                下一步
            </van-button>
        </div>
    </van-form>
</template>
<style lang="scss" scoped>
.send-code {
    position: relative;
    top: -3px;
}
</style>