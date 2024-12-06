import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ++++++++++++
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';


// https://vite.dev/config/
export default defineConfig({
  mode: 'development',
  // 修改打包后路径为相对路径
  // base: './',
  // mode: 'production',
  server: {
    // host: '127.0.0.1',
    // port: 8080,
    proxy: {
      // 配置服务器代理解决跨域问题
      // '/api': {
      //   // 代理的目标地址
      //   target: 'http://open.douyucdn.cn',
      //   // 覆盖 host 头部
      //   changeOrigin: true
      // }

      '/api': {
        // 代理的目标地址
        target: 'http://127.0.0.1:5173',
        // 覆盖 host 头部
        changeOrigin: true
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
