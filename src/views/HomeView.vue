<script setup lang="ts">
import { getCurrentInstance, reactive, toRefs } from 'vue'
import router from '@/router'

const { proxy } = getCurrentInstance()
const images = [
  'https://s3.bmp.ovh/imgs/2021/12/f331c7187943665a.jpg',
  'https://s3.bmp.ovh/imgs/2021/11/64cfa1ef2341e90d.jpg',
  'https://s3.bmp.ovh/imgs/2021/11/c6858edf939088a3.jpg',
  'https://s3.bmp.ovh/imgs/2021/11/06ed6b0016a211c5.jpeg'
]
const state = reactive({
  homeData: []
})
const getHomeData = () => {
  proxy.$axios.get('/homeData').then((res) => {
    console.log(res, 'rrr')

    state.homeData = res.dataList || []
    localStorage.setItem('homeData', JSON.stringify(res.dataList))
  })
}
if (localStorage.getItem('homeData')) {
  state.homeData = JSON.parse(localStorage.getItem('homeData'))
} else {
  getHomeData()
}

const toDetail = (data) => {
  if (localStorage.getItem('isLogin')) {
    router.push({
      name: 'Detail',
      query: data
    })
  } else {
    proxy.$toast('请先登录')
    setTimeout(() => {
      router.push({
        path: '/login'
      })
    }, 500)
  }
}
</script>

<template>
  <main class="home">
    <div>
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="item" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="con">
      <div class="con-wrap" v-for="item1 in state.homeData" :key="item1.cateId">
        <div class="con-title">{{ item1.cateName }}</div>
        <div class="content-wrap">
          <div
            class="con-content"
            v-for="item2 in item1.cateData"
            :key="item2.name"
            @click="toDetail(item2)"
          >
            <div class="content-name">{{ item2.name }}</div>
            <div class="content-img">
              <img :src="item2.img" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  height: 100vh;
  overflow-y: scroll;
}
.van-swipe-item {
  height: 15rem;
}
.van-swipe-item img {
  width: 100%;
  height: 100%;
}
.con {
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.con-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.con-title {
  width: 100%;
  color: rebeccapurple;
  padding: 0.625rem;
  font-size: 1.375rem;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.625rem;
}
.content-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0.625rem 0.9375rem;
}
.con-content {
  width: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.content-name {
  width: 6.25rem;
  font-size: 0.875rem;
  color: #ccc;
  padding: 0.625rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.content-img {
  width: 6.25rem;
  height: 6.25rem;
}
.content-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
