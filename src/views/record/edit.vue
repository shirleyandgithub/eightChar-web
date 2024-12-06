<script setup lang="ts">
import { ref,onMounted } from 'vue'
import {editRecordFn,recordListFn} from '@/api/record'
import {useRouter,useRoute} from 'vue-router'
import { networkInterfaces } from 'os';

const router = useRouter()
const route = useRoute()


const dateResult = ref('');
const timeResult = ref('');
const showDataPicker = ref(false);
const showTimePicker = ref(false);
const currentTime = ref(['12', '00']);

const formdata = ref({
    id: route.query.personid as string,
    name:'',
    sex: '',
    birthday: dateResult.value+' '+timeResult.value
})
const formatter = (type:any, option:any) => {
      if (type === 'hour') {
        option.text += '时';
      }
      if (type === 'minute') {
        option.text += '分';
      }
      return option;
    };


function timeDisplay(){
    const arr = formdata.value.birthday.split(' ')
    dateResult.value = arr[0];
    timeResult.value = arr[1];
}


onMounted(() => {
    const persionid = route.query.personid as string
    recordListFn().then(res=>{
        for (let i = 0; i < res.data.length; i++) {
            if(res.data[i].id==persionid){
                formdata.value = res.data[i]
                formdata.value.sex = res.data[i].sex+''
                timeDisplay()
            }
        }
    })
})

const onConfirmDate = (value:any) => {
    dateResult.value = value.selectedValues.join('/');
    showDataPicker.value = false;
    };
const onConfirmTime = (value:any) => {
    timeResult.value = value.selectedValues.join(':');
    showTimePicker.value = false;
};
function onSubmit() {
    editRecordFn(formdata.value).then(res=>{
        console.log('编辑档案接口返回：', res);
        // @ts-ignore
        if(res.code == 200) {
            router.push('/record/list')
        }
    })
}

const minDate = new Date(1925, 0, 1)
const maxDate = new Date(2049, 11, 1)   
const currentDate = ref(['1990', '01']);

</script>
<template>
    <main>
        <header class="header" >
            <van-icon @click="router.back()" name="arrow-left" size="20"/>
            <span style="font-size: 16px;">编辑档案</span>
        </header>
        <div>
            <van-form >
                <van-cell-group inset>
                    <van-field 
                        v-model="formdata.name"
                        name="名称"
                        label="名称"
                        />

                    <van-field name="radio" label="性别">
                        <template #input>
                            <van-radio-group v-model="formdata.sex" direction="horizontal">
                            <van-radio name="1">男</van-radio>
                            <van-radio name="0">女</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>


                    <van-field
                        v-model="dateResult"
                        is-link
                        readonly
                        name="datePicker"
                        label="出生日期"
                        @click="showDataPicker = true"
                    />
                    <van-popup v-model:show="showDataPicker" position="bottom">
                        <van-date-picker 
                            v-model="currentDate"
                            :min-date="minDate"
                            :max-date="maxDate"
                            @confirm="onConfirmDate" 
                            @cancel="showDataPicker = false" 
                        />
                    </van-popup>


                    <van-field
                        v-model="timeResult"
                        is-link
                        readonly
                        name="timePicker"
                        label="出生时辰"
                        @click="showTimePicker = true"
                    />
                    <van-popup v-model:show="showTimePicker" position="bottom">
                        <van-time-picker
                        v-model="currentTime"
                        title="选择时间"
                        :formatter="formatter"
                        @confirm="onConfirmTime" @cancel="showTimePicker = false"
                        />
                    </van-popup>
                </van-cell-group>
                <div class="button-confirm">
                    <van-button @click="onSubmit" size="small" round block color="#eda15a">
                    确定
                    </van-button>
                </div>
            </van-form>
        </div>
    </main>
</template>
<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    .van-icon {
        // background-color: red;
        margin-left: 10px;
        margin-right: 25px;
    }
}
.button-confirm {
    // background-color: red;
    padding: 10px 50px;;
    margin-top: 50px;
}

</style>

