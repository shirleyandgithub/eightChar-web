<script lang="ts">
// 目的是需要缓存该组件，所以给该组件添加一个 name 属性
export default {
    name: 'Home'
}
</script>
<script setup lang="ts">
import { getPersonEightFn } from '@/api/home'
import {getRecordIdListFn} from '@/api/record'
import { onActivated, onDeactivated, onMounted, ref,watch,computed } from 'vue'
import type { Ref } from 'vue'
import type { iEight } from '@/types/eightType'
import { useRoute } from 'vue-router'

const route = useRoute()

// ------------------- 点击回到顶部 -----------------------
const contentRef: Ref<any> = ref()

// 监听页面的滚动距离
const top: Ref<number> = ref(0)
function scrollTop(event: any) {
    // console.log(event.target.scrollTop);
    top.value = event.target.scrollTop
}

// ------------------ 缓存组件的滚动距离
onActivated(() => {
    // 将滚动距离设置在页面的 content 上面
    contentRef.value.scrollTop = Number(localStorage.getItem('top'))
    // 清除保存的滚动距离
    localStorage.removeItem('top')

})

// 当组件被离开的时候调用
onDeactivated(() => {
    // 将滚动距离记录下来
    localStorage.setItem('top', String(top.value))
})

const showLeft = ref(false);


const personEightData:Ref<iEight|null> = ref(null)


const personList = ref<Array<{name: string, id: string}>>([])

// 修改获取用户列表的函数，添加加载状态控制
const isLoading = ref(false)


async function getPersonList() {
    if (isLoading.value) return
    
    try {
        isLoading.value = true
        const res = await getRecordIdListFn()
        // console.log('获取用户列表接口返回：',res);
        // @ts-ignore
        if (res.code == 200) {
            personList.value = res.data
        }
    } catch (error) {
        console.error('获取用户列表失败:', error)
    } finally {
        isLoading.value = false
    }
}

function getPersonEight(personid:String) {
    getPersonEightFn(Number(personid)).then(res => {
        if(res.status == 200) {
            personEightData.value = res.data
            if(personEightData.value!=null){
                personEightData.value.major = JSON.parse(res.data.major)
                personEightData.value.deputyStar = JSON.parse(res.data.deputyStar)
                personEightData.value.earth = JSON.parse(res.data.earth)
                personEightData.value.heaven = JSON.parse(res.data.heaven)
                personEightData.value.shenSha = JSON.parse(res.data.shenSha)
                personEightData.value.naYin = JSON.parse(res.data.naYin)
                personEightData.value.kongWang = JSON.parse(res.data.kongWang)
                personEightData.value.hidden = JSON.parse(res.data.hidden)
                personEightData.value.starFortune = JSON.parse(res.data.starFortune)
            }
        }
    })
}


// 修改 onMounted 钩子
onMounted(async () => {
    await getPersonList()

    // 优先使用路由参数中的 personid
    const routePersonId = route.query.personid as string
    if (routePersonId) {
        getPersonEight(routePersonId)
    } else if (personList.value.length > 0) {
        // 只有在没有路由参数时才加载第一个用户
        getPersonEight(personList.value[0].id)
    }
})


// 修改路由监听，避免重复加载
watch(route, (newRoute) => {
    const personid = newRoute.query.personid as string
    if (personid) {
        getPersonEight(personid)
    }
})


// 修改切换用户的函数，添加更多日志和错误处理
async function changeUser() {
    try {
        // 强制更新状态
        showLeft.value = !showLeft.value

        
        // 如果列表为空，先获取数据
        if (personList.value.length === 0) {
            await getPersonList()
        }
    } catch (error) {
        console.error('切换用户异常:', error)
    }
}

// 修改点击事件的绑定方式
function handleChangeUserClick(event: Event) {
    event.stopPropagation() // 阻止事件冒泡
    changeUser()
}

function selectUser(personid:String){
    getPersonEight(personid)
    showLeft.value = false
}


const rowClass = (index: number) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row'
}



// 定义颜色映射
const colorMap: Record<string, string> = {
    '甲': 'green', '乙': 'green', '寅': 'green', '卯': 'green',
    '丙': 'red', '丁': 'red', '巳': 'red', '午': 'red',
    '戊': 'brown', '己': 'brown', '辰': 'brown', '戌': 'brown', '丑': 'brown', '未': 'brown',
    '庚': 'gold', '辛': 'gold', '申': 'gold', '酉': 'gold',
    '壬': 'blue', '癸': 'blue', '子': 'blue', '亥': 'blue'
}

// 计算属性：根据天干地支返回颜色类型
const getColorClass = computed(() => {
    return (value: string) => {
        return colorMap[value] || ''
    }
})

</script>
<template>
    <main class="box">
        <header class="header">
            <div class="nav-name">
                <van-icon @click.stop="handleChangeUserClick" size="30" name="bars" />
                <span class="person-name">{{ personEightData?.name }}</span>
                <van-popup
                    v-model:show="showLeft"
                    position="left"
                    :style="{ width: '40%', height: '100%' }"
                    :overlay="true"
                    :close-on-click-overlay="true"
                    :safe-area-inset-bottom="true"
                >
                    <div class="popup-content">
                        <main>
                            <div class="popup-header">
                                <div>
                                    <div class="div-one">{{ personEightData?.name }}</div>
                                    <div class="div-two">{{ personEightData?.baseInfo.lunarCalendar }}</div>
                                </div>
                            </div>
                            <div class="popup-title">
                                <van-icon color="#e99f4f" name="exchange" size="20" />
                                <span>切换用户</span>
                            </div>

                            <div v-if="isLoading" class="loading">
                                加载中...
                            </div>
                            <template v-else>
                                <van-cell 
                                    class="user-cell" 
                                    v-for="item in personList" 
                                    :key="item.id"
                                >
                                <template #title>
                                    <div @click="selectUser(item.id)" class="user">
                                    {{ item.name }}
                                    </div>
                                </template>
                                </van-cell>
                            </template>

                            
                        </main> 
                    </div>
                </van-popup>
            </div>
        </header>

        <div @scroll="scrollTop" ref="contentRef" class="content">
        
            <table border="0" cellspacing="0" cellpadding="0">
                <tr class="title">
                    <th>年柱</th><th>月柱</th><th>日柱</th><th>时柱</th><th>日期</th>
                </tr>

                <tr :class="rowClass(1)">
                <td>{{ personEightData?.major.year }}</td>
                <td>{{ personEightData?.major.month }}</td>
                <td>{{ personEightData?.major.day }}</td>
                <td>{{ personEightData?.major.hour }}</td>
                <td>主星</td>
                </tr>
                
                <tr :class="rowClass(2)">
                <td style="font-size: 20px;" :class="getColorClass(personEightData?.heaven.year||'')">{{ personEightData?.heaven.year }}</td>
                <td style="font-size: 20px;" :class="getColorClass(personEightData?.heaven.month||'')">{{ personEightData?.heaven.month }}</td>
                <td style="font-size: 20px;" :class="getColorClass(personEightData?.heaven.day||'')">{{ personEightData?.heaven.day }}</td>
                <td style="font-size: 20px;" :class="getColorClass(personEightData?.heaven.hour||'')">{{ personEightData?.heaven.hour }}</td>
                <td>天干</td>
                </tr>

                <tr :class="rowClass(3)">
                <td style="font-size: 20px;" :class="getColorClass(personEightData?.earth.year||'')">{{ personEightData?.earth.year }}</td>
                <td style="font-size: 20px;" :class="getColorClass(personEightData?.earth.month||'')">{{ personEightData?.earth.month }}</td>
                <td style="font-size: 20px;" :class="getColorClass(personEightData?.earth.day||'')">{{ personEightData?.earth.day }}</td>
                <td style="font-size: 20px;" :class="getColorClass(personEightData?.earth.hour||'')">{{ personEightData?.earth.hour }}</td>
                <td>地支</td>
                </tr>

                <tr :class="rowClass(4)">
                    <td><div v-for="(item, index) in personEightData?.hidden.year" :key="index">{{ item }}</div></td>
                    <td><div v-for="(item, index) in personEightData?.hidden.month" :key="index">{{ item }}</div></td>
                    <td><div v-for="(item, index) in personEightData?.hidden.day" :key="index">{{ item }}</div></td>
                    <td><div v-for="(item, index) in personEightData?.hidden.hour" :key="index">{{ item }}</div></td>
                    <td>藏干</td>
                </tr> 

                <tr :class="rowClass(5)">
                    <td><div v-for="(item, index) in personEightData?.deputyStar.year" :key="index">{{ item }}</div></td>
                    <td><div v-for="(item, index) in personEightData?.deputyStar.month" :key="index">{{ item }}</div></td>
                    <td><div v-for="(item, index) in personEightData?.deputyStar.day" :key="index">{{ item }}</div></td>
                    <td><div v-for="(item, index) in personEightData?.deputyStar.hour" :key="index">{{ item }}</div></td>
                    <td>副星</td>
                </tr> 

                <tr :class="rowClass(6)">
                    <td>{{ personEightData?.naYin.year }}</td>
                    <td>{{ personEightData?.naYin.month }}</td>
                    <td>{{ personEightData?.naYin.day }}</td>
                    <td>{{ personEightData?.naYin.hour }}</td>
                    <td>纳音</td>
                </tr> 

                <tr :class="rowClass(7)">
                    <td>{{ personEightData?.starFortune.year }}</td>
                    <td>{{ personEightData?.starFortune.month }}</td>
                    <td>{{ personEightData?.starFortune.day }}</td>
                    <td>{{ personEightData?.starFortune.hour }}</td>
                    <td>星运</td>
                </tr> 

                <tr :class="rowClass(8)">
                    <td>{{ personEightData?.kongWang.year }}</td>
                    <td>{{ personEightData?.kongWang.month }}</td>
                    <td>{{ personEightData?.kongWang.day }}</td>
                    <td>{{ personEightData?.kongWang.hour }}</td>
                    <td>空亡</td>
                </tr>

                <tr :class="rowClass(9)">
                    <td><div v-for="(item, index) in personEightData?.shenSha.year" :key="index">{{ item }}</div></td>
                    <td><div v-for="(item, index) in personEightData?.shenSha.month" :key="index">{{ item }}</div></td>
                    <td><div v-for="(item, index) in personEightData?.shenSha.day" :key="index">{{ item }}</div></td>
                    <td><div v-for="(item, index) in personEightData?.shenSha.hour" :key="index">{{ item }}</div></td>
                    <td>神煞</td>
                </tr>

                <tr class="base-info">
                    <td colspan="5" style="text-align:left">命盘基本信息 </td>
                </tr>
                <tr :class=rowClass(11)>
                    <td colspan="5" style="text-align:left">姓名：{{ personEightData?.name }} </td>
                </tr>
                <tr :class=rowClass(12)>
                    <td colspan="5" style="text-align:left">公历：{{ personEightData?.baseInfo.gcalendar }} </td>
                </tr>
                <tr :class=rowClass(13)>
                    <td colspan="5" style="text-align:left">农历：{{ personEightData?.baseInfo.lunarCalendar }} </td>
                </tr>
                <tr :class=rowClass(14)>
                    <td colspan="5" style="text-align:left">节气：{{ personEightData?.baseInfo.solarTerms }} </td>
                </tr>
                <tr :class=rowClass(15)>
                    <td colspan="5" style="text-align:left">星座：{{ personEightData?.baseInfo.constellation }} </td>
                </tr>

                <tr :class=rowClass(16)>
                    <td colspan="5" style="text-align:left">空亡(时)：{{ personEightData?.baseInfo.kongWang }} </td>
                </tr>
                <tr :class=rowClass(17)>
                    <td colspan="5" style="text-align:left">命宫：{{ personEightData?.baseInfo.lifePalace }} </td>
                </tr>

            </table>
        </div>
    </main>
</template>

<style lang="scss" scoped> 
.popup-content{
    main {
        // background-color: red;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .popup-header {
            background-color: #dc8644;
            width: 100%;
            height: 1rem;
            margin-bottom: 15px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
                .div-one {
                width:0.5rem;
                height: 0.2rem;
                margin-bottom: 10px;
                }
                .div-two {
                    font-size: 13px;
                    width: 1.1rem;
                    height: 0.3rem;
                }
        }
        .popup-title {
            // background-color: pink;
            width: 1rem;
            height: 30px;
            // font-weight: bold;
            .van-icon {
                margin-right: 8px;
            }
        }
        .user-cell{
            .user{
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
            }
        }
    }
}
.van-action-bar-icon {
    width: 10px;
    height: 10px;
    position: absolute;
    left: 10px;
    bottom: 60px;
}

table {
  width: 100%;
  margin-bottom: 20px;
}
th, td {
  padding: 8px;
  text-align: center;
}
.title {
    color: white;
    background-color: #dc8644;
}
.header {
    position: relative;
    display: flex;
    justify-content: space-around;
    .nav-name {
        position: absolute;
        left: 10px;
        // background-color: red;
        width: 2rem;
        height: 0.3rem;
        display: flex;
        justify-content:flex-start;
        padding-top: 10px;
        // 确保元素可以正常接收点击事件
        pointer-events: auto;
        z-index: 1;
        .van-icon {
            cursor: pointer; // 添加鼠标手型
            // 确保图标可以正常接收点击事件
            pointer-events: auto;
        }
       .person-name {
            margin-left: 0.1rem;
            width: 1.5rem;
            height: 0.3rem;
            line-height: 0.3rem;
            text-align: left;
            font-size: 16px;
            // background-color: green;
       }
    }
    .van-button {
        position: absolute;
        right: 10px;
    }
}
.even-row {
    background-color: #f0f0f0; // 浅灰色
}

.odd-row {
    background-color: white; // 白色
}
.base-info {
    background-color: #dc8644;
    color: white;
    font-weight: bold;
}

.green {
  color: green;
}

.red {
  color: red;
}

.brown {
  color: brown;
}

.gold {
  color: #e8ab2b;
}

.blue {
  color: #4e6fe5;
}

// 修改弹窗相关样式
:deep(.van-popup) {
    z-index: 2000 !important;
    position: fixed;
}
// 添加遮罩层样式
:deep(.van-overlay) {
    z-index: 1999 !important;
}
.box {
    position: relative;
    z-index: 1;
}
</style>