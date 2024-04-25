<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, getCurrentInstance } from 'vue'
import router from './router'

const { proxy } = getCurrentInstance()

const active = ref(0)
const onChange = (index: number) => {
  enum routeMap {
    '/home' = 0,
    '/cart',
    '/my',
    '/login'
  }
  if (index != 0) {
    if (localStorage.getItem('isLogin')) {
      router.push(routeMap[index])
    } else {
      proxy.$toast('请先登录')
      setTimeout(() => {
        router.push(routeMap[3])
      }, 500)
    }
  }
}
</script>

<template>
  <RouterView />
  <van-tabbar route v-model="active" @change="onChange" active-color="green" inactive-color="#000">
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item
    ><van-tabbar-item icon="cart-o">购物车</van-tabbar-item
    ><van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
#app {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 100vh;
}
</style>
