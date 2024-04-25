<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
const state = reactive({
  username: ''
})
state.username = localStorage.getItem('user')
</script>

<template>
  <div class="my">
    <div class="first">
      <p class="personal-info">我的信息</p>
      <div class="card">
        <div class="avatar">
          <img src="@/assets/avatar.png" alt="" />
        </div>
        <div class="nickname">{{ state.username }}</div>
        <div class="address">
          <van-cell title="地址" icon="location-o" />
        </div>
      </div>
    </div>
    <div class="content">
      <van-cell title="完善信息" is-link />
      <van-cell title="订单记录" is-link />
      <van-cell title="意见反馈" is-link />
    </div>
  </div>
</template>

<style scoped>
.first {
  width: 100%;
  height: 18.75rem;
  position: relative;
  background-color: rgb(183, 165, 248);
  display: flex;
  justify-content: center;
}
.personal-info {
  text-align: center;
  color: #fff;
  font-size: 20px;
}
.card {
  width: 80%;
  height: 15.625rem;
  border-radius: 0.625rem;
  background-color: #fff;
  position: absolute;
  bottom: -30px;
  box-shadow: 10px 10px 20px rgb(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  overflow: hidden;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.nickname {
  color: rgb(204, 202, 202);
  margin-top: 0.625rem;
}
.content {
  margin-top: 5rem;
}
</style>
