<script setup lang="ts">
import { getCurrentInstance, reactive, toRefs } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()
const state = reactive({
  goods: {}
})
const route = useRoute()
let goods = route.query
const getDetail = () => {
  proxy.$axios.post('/detail', { ...goods }).then((res) => {
    console.log(res, 'goods')

    state.goods = res
  })
}
getDetail()
const addToCart = () => {
  router.push({ name: 'Cart', query: state.goods })
}
</script>

<template>
  <div class="detail">
    <div class="img-wrap">
      <img :src="state.goods.img" />
    </div>
    <div class="name">
      <div class="title">
        商品名称：<span class="title">{{ state.goods.name }}</span>
      </div>
      <div class="price">
        总价：<span class="price">{{ state.goods.price }} 元</span>
      </div>
    </div>
  </div>
  <div class="detail">
    <p>商品详情：</p>
    {{ state.goods.desc }}
  </div>
  <div class="add-cart">
    <van-button @click="addToCart()">加入购物车</van-button>
  </div>
</template>

<style scoped>
.img-wrap {
  width: 100%;
  height: 18.75rem;
}
.img-wrap img {
  width: 100%;
  height: 100%;
}
.name {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.625rem;
}
.name .title,
.name .price {
  color: red;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 2rem;
}
.detail {
  padding: 0.625rem;
  font-size: 1rem;
  color: #666;
}
.detail p {
  font-size: 1.125rem;
  font-weight: 600;
}
.add-cart {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
