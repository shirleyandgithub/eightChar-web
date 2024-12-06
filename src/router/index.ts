import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '@/views/home/index.vue'
import Record from '@/views/record/index.vue'
import Address from '@/views/address/index.vue'
import Prolist from '@/views/prolist/index.vue'
import User from '@/views/user/index.vue'
import Pro from '@/views/pro/index.vue'
import Cart from '@/views/cart/index.vue'
import Order from '@/views/order/index.vue'
import Password from '@/views/password/index.vue'
import FooterCom from '@/components/FooterCom.vue'
import Buycenter from '@/views/buycenter/index.vue'
import Collect from '@/views/collect/index.vue'





const routes = [
  {
    // 配置 404 页面
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    // 路由元信息
    meta: {
      hidden: true,
      title: '404'
    },
    // 路由独享守卫
    beforeEnter: (to: any, from: any) => {
      // reject the navigation
      console.log(to, from);
      // 
      return false
    },
    component: () => import('../views/error/index.vue')
  },
  {
    path: '/',
    // redirect 路由重定向,当进入某个路由后，指定跳转到另一个路由中，通常在配置子路由的时候会使用到
    redirect: '/home'
  },
  {
    path: '/home',
    // 命名路由
    name: 'home',
    meta: {
      title: '八字'
    },
    // 命名视图,给<router-view>命名
    components: {
      default: Home,
      FooterCom: FooterCom
    }
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      title: '档案'
    },
    components: {
      default: Record,
      FooterCom
    },
    redirect: '/record/list',
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('../views/record/list.vue'),
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('../views/record/add.vue'),
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('../views/record/edit.vue'),
      }
    ]
  },
  {
    path: '/pro',
    name: 'pro',
    meta: {
      hidden: true,
      title: '详情'
    },
    component: Pro
  },
  {
    path: '/prolist',
    name: 'prolist',
    meta: {
      title: '顺物'
    },
    components: {
      default: Prolist,
      FooterCom
    }
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      hidden: true,
      title: '购物车'
    },
    component: Cart
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      hidden: true,
      title: '订单'
    },
    // component: Order
    components: {
      default: Order,
      FooterCom
    },
    redirect: '/order/olist',
    children: [
      {
        path: 'olist',
        name: 'olist',
        component: () => import('../views/order/olist.vue'),
      },
      {
        path: 'osubmit',
        name: 'osubmit',
        component: () => import('../views/order/osubmit.vue'),
      }
    ]
  },
  {
    path: '/collect',
    name: 'collect',
    meta: {
      hidden: true,
      title: '我的收藏'
    },
    component: Collect
  },
  {
    path: '/buycenter',
    name: 'buycenter',
    meta: {
      hidden: true,
      title: '我的顺物'
    },
    component: Buycenter
  },
  {
    path: '/address',
    name: 'address',
    meta: {
      hidden: true,
      title: '收货地址'
    },
    // component: Address
    components: {
      default: Address,
      FooterCom
    },
    redirect: '/address/lista',
    children: [
      {
        path: 'lista',
        name: 'lista',
        component: () => import('../views/address/lista.vue'),
      },
      {
        path: 'edita',
        name: 'edita',
        component: () => import('../views/address/edita.vue'),
      },
      {
        path: 'adda',
        name: 'adda',
        component: () => import('../views/address/adda.vue'),
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '我的'
    },
    components: {
      default: User,
      FooterCom
    }
  },
  {
    path: '/password',
    name: 'password',
    component: Password
  },
  {
    path: '/login',
    name: 'login',
    // 路由元信息
    meta: {
      hidden: true,// 用来判断是否隐藏 footer
      title: '登录'
    },
    component: () => import('../views/login/index.vue')
  }, {
    path: '/register',
    name: 'register',
    // 路由元信息
    meta: {
      // 用来判断是否隐藏 footer
      hidden: true,
      title: '注册'
    },
    component: () => import('../views/register/index.vue'),
    redirect: '/register/step1',
    children: [
      {
        path: 'step1',
        name: 'step1',
        component: () => import('../views/register/step1.vue'),
      },
      {
        path: 'step2',
        name: 'step2',
        component: () => import('../views/register/step2.vue'),
      },
      {
        path: 'step3',
        name: 'step3',
        component: () => import('../views/register/step3.vue'),
      }
    ]
  }
]


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})


/*
路由守卫：
  1. 全局守卫
    * beforeEach: 全局的前置守卫，可以做路由鉴权(路由的权限验证)，该守卫会在跳转之前执行(组件没加载的时候调用)
    beforeResolve: 全局的解析守卫，和 beforeEach 类似，区别是调用的时机不同(组件已经在加载了)
    * afterEach: 全局的后置守卫，跳转到页面路由之后执行的函数
   
  2. 独享守卫
    beforeEnter: 独享守卫，只有当前路由跳转才会被执行

  3. 组件内的守卫
    选项式API：
    beforeRouteEnter(to, from) {
      // 在渲染该组件的对应路由被验证前调用
      // 不能获取组件实例 `this` ！
      // 因为当守卫执行时，组件实例还没被创建！
    },
    beforeRouteUpdate(to, from) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
      // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
    },
    beforeRouteLeave(to, from) {
      // 在导航离开渲染该组件的对应路由时调用
      // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
    },


    组合式API：
    onBeforeRouteUpdate： 监听路由变化 
    onBeforeRouteLeave : 监听路由离开

*/


// 所谓的全局指的是所有页面跳转都会执行的方法叫全局
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // to: 我们将要去的页面信息
  // from: 当前的页面信息
  // console.log(to, from);

  // 要进入用户页面
  if (to.name == 'user') {
    if (localStorage.getItem('loginState') != 'true') {
      // 没有登录，不让他进来

      // return '/login'
      // 将用户的路径修改到登录页面
      next('/login')
    } else {
      // 如果用户已经登录了，那么就直接放行
      next()
    }
  } else {
    // 不是我的页面，直接放行
    next()
  }

  // ...
  // 返回 false 以取消导航
  // return false
})


// 路由全局解析守卫
router.beforeResolve(async to => {

})


// 路由全局后置守卫
router.afterEach((to, from) => {
  document.title = String(to.meta.title)
})


export default router
