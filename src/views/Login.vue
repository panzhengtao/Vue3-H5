<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import router from '../router'

const { proxy } = getCurrentInstance()
const username = ref('')
const password = ref('')
let loginInfo
const validatePsw = (val) => /\d{6}/.test(val)
const onSubmit = async () => {
  let data = { username: username.value, password: password.value }
  loginInfo = await proxy.$axios.post('/login', data)

  if (username.value != loginInfo.username || password.value != loginInfo.password) {
    proxy.$toast('用户名或密码错误')
  } else {
    localStorage.setItem('isLogin', JSON.stringify(true))
    localStorage.setItem('user', username.value)
    proxy.$toast('登录成功')
    router.push('/home')
  }
}
const toRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="login">
    <div class="title">欢迎登录</div>
    <van-form>
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { validator: validatePsw, message: '密码长度至少6位！' }
        ]"
      />
      <div style="margin-top: 16px">
        <van-button type="primary" @click="onSubmit" round block>登录</van-button>
      </div>
      <div class="footer">
        <span>没有账号，</span><span class="register" @click="toRegister">去注册</span>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  height: 100%;
}
.title {
  font-size: 1.75rem;
}
.van-form {
  height: 18.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.van-cell--large {
  margin: 0.625rem 0;
  border-radius: 0.5rem;
}
.footer {
  color: #ccc;
  text-align: center;
  font-size: 0.875rem;
  padding: 0.625rem 0;
}
.register {
  color: #aaa;
  font-weight: bold;
}
</style>
​​
