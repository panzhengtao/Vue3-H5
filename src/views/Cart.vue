<script setup lang="ts">
import { getCurrentInstance, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()
const route = useRoute()
const state = reactive({
  goods: '',
  allGoods: JSON.parse(localStorage.getItem('allGoods')) || [],
  totalCount: 0,
  totalPrice: 0
})
let goods = route.query
if (goods.name) {
  state.goods = goods
  state.allGoods.push(state.goods)
  localStorage.setItem('allGoods', JSON.stringify(state.allGoods))
}

const onClickCount = (count) => {
  proxy.$toast(`一共选择了${count}件商品`)
}
const onClickPrice = (price) => {
  proxy.$toast(`您需支付${price}元`)
}
const onClickBuy = () => {
  proxy.$toast('购买成功')
  localStorage.removeItem('allGoods')
  state.allGoods = []
  state.totalCount = 0
  state.totalPrice = 0
}
const computeTotal = () => {
  state.totalCount = state.allGoods.length
  state.totalPrice = 0
  state.allGoods.forEach((item) => {
    state.totalPrice += item.price ? parseInt(item.price) : 0
  })
  localStorage.setItem('allGoods', JSON.stringify(state.allGoods))
}
computeTotal()

const handleAdd = (item) => {
  state.allGoods.push({ ...item, name: item.name + 1 })
  computeTotal()
  console.log(state.allGoods)
}
const handleDel = (item) => {
  const index = state.allGoods.indexOf(item)
  state.allGoods.splice(index, 1)
  computeTotal()
}
</script>

<template>
  <div class="cart">
    <div v-if="state.allGoods.length">
      <div v-for="(item, index) in state.allGoods" :key="index">
        <div class="goods-item">
          <div class="left">
            <img :src="item.img" />
          </div>
          <div class="right">
            <div class="title">商品名称：{{ item.name }}</div>
            <div class="price">商品价格：{{ item.price }}</div>
          </div>
          <div class="action">
            <div class="add">
              <van-button icon="plus" size="mini" type="primary" @click="handleAdd(item)" />
            </div>
            <div class="del">
              <van-button icon="minus" size="mini" type="primary" @click="handleDel(item)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <van-empty description="购物车空空如也" />
    </div>
    <div class="action-btns">
      <van-action-bar>
        <van-action-bar-icon
          icon="cart-o"
          text="总数"
          :badge="state.totalCount"
          @click="onClickCount(state.totalCount)"
        />
        <van-action-bar-icon
          icon="shop-o"
          text="总价"
          :badge="state.totalPrice"
          @click="onClickPrice(state.totalPrice)"
        />
        <van-action-bar-button type="danger" text="立即购买" @click="onClickBuy" />
      </van-action-bar>
    </div>
  </div>
</template>

<style scoped>
.cart {
  padding-bottom: 6.25rem;
}
.goods-item {
  display: flex;
  padding: 0.625rem;
  border: 1px solid #eee;
}
.left {
  flex: 1;
  height: 6.25rem;
}
.left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.right {
  flex: 3;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.right .title,
.right .price {
  margin-left: 1.25rem;
  margin-bottom: 1.25rem;
  color: #666;
}
.action {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.action-btns .van-action-bar {
  bottom: 50px;
}
</style>
