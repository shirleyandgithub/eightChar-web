<script setup lang="ts">
import { ref,onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import type{iRecord} from '../../types/recordType'
import { recordListFn,delRecordFn} from '@/api/record'
import{delPersonEightFn} from '@/api/home'
import { showToast,showConfirmDialog } from 'vant'

const router = useRouter()
const route = useRoute()


let records:Ref<Array<iRecord>> = ref([])

function getRecordList() {
    recordListFn().then(res => {
        console.log('获取档案列表接口返回：',res);
        
        records.value = res.data
    })
}

onMounted(() => {
    getRecordList()
})

function delRecord(personid:string) {
    showConfirmDialog({
    title: '删除档案',
    message:
        '确认要删除该档案吗？',
    })
    .then(() => {
        delRecordFn(Number(personid)).then(res=>{
            // console.log('删除档案',res)
            //@ts-ignore
            if (res.code==200) {
                // 删除八字数据
                delPersonEightFn(Number(personid)).then(res=>{
                    //@ts-ignore
                    if(res.code==200){
                        // console.log('删除八字成功');
                    }
                })
                getRecordList()
            }
        })
    }).catch(() => {});
}

function showEight(personid:string) {
    router.push({ path: '/home', query: { personid: personid } })
}

</script>

<template>
    <main class="box">
        <header class="header" style="font-size: 16px;">档案列表</header>
        <div>
            <van-cell-group >
                <van-cell v-for="item in records" :key="item.id" class="custom-cell" icon="user-o"  >
                    <template #title>
                        <div class="custom-title">
                            {{ item.name }}
                        </div>
                    </template>

                    <div class="btn">
                        <img @click="showEight(item.id|| '')" class="bazi-img" src="@/assets/bazi.png" alt="">
                        <van-icon @click="router.push({ path: '/record/edit', query: { personid: item.id } })" name="edit" color="#eda15a" size="20" />
                        <van-icon @click="delRecord(item.id || '')"  name="delete-o" color="#eda15a" size="20" />
                    </div>
                </van-cell>
            </van-cell-group>
            <div class="add-user-btn" @click="router.push('/record/add')">+</div>

        </div>
    </main>
</template>
<style lang="scss" scoped>


.van-cell-group {
    // position: relative;
    .custom-cell {
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
        .custom-title {
            margin-left: 10px;
            font-size: 15px;
        }
        .delete {
            // background-color: red;
            
        }
    }
    .btn {
        display: flex;
        justify-content: flex-end;
        .bazi-img {
            width: 20px;
            height: 20px;
            // background-color: red;
        }
        .van-icon {
            margin-left: 20px;
        }
    }
}


.add-user-btn {
        box-sizing: border-box;
        padding-bottom: 6px;
        width: 40px;
        height: 40px;
        background-color: hsla(24, 72%, 56%, 0.8);
        border-radius: 50%;
        color: white;
        font-size: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        right: 25px;
        top: 5.5rem  
    }

</style>