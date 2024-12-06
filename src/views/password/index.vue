<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router'
import{updatePasswordFn} from '@/api/login'
import { ref } from 'vue'
import type { Ref} from 'vue'

const route = useRoute()
const router = useRouter()

let passwordOld = ref('');
let passwordNew = ref('');


function onSubmit() {
    console.log(1111);
    
    updatePasswordFn({oldpassword:passwordOld.value,
        newpassword:passwordNew.value,
        userid:userId}).then(res=>{
            console.log('修改密码接口：',res);
            
    })
}


</script>
<template>
    <main class="box">
        <header class="header">头部-修改密码</header>
        <div>
            <van-form @submit="onSubmit()">
                <van-cell-group inset>
                    <van-field
                    v-model="passwordOld"
                    type="password"
                    name="旧密码"
                    label="旧密码"
                    placeholder="旧密码"
                    :rules="[{ required: true, message: '请填写旧密码' }]"
                    />
                    <van-field
                    v-model="passwordNew"
                    type="password"
                    name="新密码"
                    label="新密码"
                    placeholder="新密码"
                    :rules="[{ required: true, message: '请填写新密码' }]"
                    />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                     修改密码
                    </van-button>
                </div>
            </van-form>

        </div>
    </main>
</template>
<style lang="scss" scoped>
    
</style>