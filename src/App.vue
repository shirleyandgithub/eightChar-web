<script setup lang="ts">
import FooterCom from './components/FooterCom.vue';
</script>

<template>
  <div class="container">


    <!-- <main class="box">
      <header class="header">头部</header>
      <div>主体内容</div>
    </main> -->

    <router-view v-slot="{ Component }">
      <!-- 添加切换页面的过渡效果 -->
      <transition name="fade">
        
        <!-- 添加组件的缓存 -->
        <!-- <keep-alive include="Home">
          <component :is="Component"></component>
        </keep-alive> -->

        <component :is="Component"></component>
      </transition>
    </router-view>

    <!-- <FooterCom /> -->
    <router-view name="FooterCom"></router-view>

    <!-- 提示用户不能横屏使用 -->
    <div class="tip"> 为了更好的用户体验，请切换为竖屏使用！ </div>

  </div>
</template>

<style lang="scss">
html,
body,
#app,
.container {
  height: 100%;
}

html {
  // 100vw 屏幕的宽度 100%
  /*
    目前百分之90以上的 UI 设计师会使用 iPhone6,7,8 的屏幕尺寸进行设计搞的设计
    如果设备是 iPhone6,7,8 为基础的设计图，那么我们应该通过 100 / 375 * 100 = 26.66666666vw
    如果设备是 iPhone 12Pro 为基础的设计图，那么我们应该通过 100 / 390 * 100 = 25.641vw
    如果设备是 iPhone 4 为基础的设计图，那么我们应该通过 100 / 320 * 100 = 31.25vw
  */
  font-size: 26.66666666666vw;
}

body {
  // 具体值要根据公司设计图来决定这里应该写多少，这里的值是设计图中出现次数最多的字号
  font-size: 12px;
}

.container {
  display: flex;
  flex-direction: column;
}

.box {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .header {
    height: 0.44rem;
    background-color: #eea153;
    // background-color:  #f89c3c;
    line-height: 0.44rem;
    text-align: center;
    color: white;

    span.header-title {
      position: relative;
      left: 30px;
    }

    .van-button {
      float: right;
      margin: 11px 12px 0 0;
    }
  }

  .content {
    overflow: auto;
    flex: 1;
    // 添加 css 平滑滚动，可以有动画的回到顶部
    scroll-behavior: smooth;
  }
}

.footer {
  // 0.5 rem 就是 50 px ，因为我们通过 vw 设置的所以这里会自适应
  height: 0.5rem;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;

  a {
    flex: 1;
    text-decoration: none;
    color: black;
    display: flex;
    // 修改主轴方向
    flex-direction: column;
    // 交叉轴方向对齐方式
    align-items: center;
    justify-content: flex-start;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    span {
      padding-top: 5px;
      box-sizing: border-box;
    }

    p {
      position: relative;
      bottom: 5px;
    }
  }
}

.footer .router-link-active {
  color: #f66;
}


// 进入激活
.fade-enter-active {
  transition: all 0.3s;
  opacity: 0;
  transform: translateX(100%);
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}


.tip {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 0.3rem;
  color: white;
  z-index: 99999999;
  user-select: none;
  // text-align: center;
  // display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}

@media (orientation: landscape) {
  .tip {
    display: flex;
  }
}

</style>