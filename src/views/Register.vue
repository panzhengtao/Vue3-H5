<template>
  <div class="register">
    <div class="title">欢迎注册</div>
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
          { validator: validatePsw, message: '密码长度6位！' }
        ]"
      />
      <van-field
        v-model="password1"
        type="password1"
        name="password1"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '重复密码不能为空' },
          { validator: validatePsw1, message: '前后两次密码不一致' }
        ]"
      />
      <div style="margin-top: 16px">
        <van-button type="primary" @click="onRegister" round block>注册</van-button>
      </div>
      <div class="footer">
        <span>已有账号，</span><span class="register" @click="toLogin">去登录</span>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import router from '../router'

const { proxy } = getCurrentInstance()
const username = ref('')
const password = ref('')
const password1 = ref('')
let loginInfo
const validatePsw = (val) => /\d{6}/.test(val)
const validatePsw1 = (val) => {
  if (val !== password.value) {
    return false
  }
  return true
}
const trim = (val: string) => {
  return val.replace(/(^\s*)|(\s*$)/g, '')
}
const onRegister = () => {
  let data = { username: username.value, password: password.value }
  let psw = trim(password.value)
  let psw1 = trim(password1.value)
  if (trim(username.value) && psw && psw1 && psw === psw1) {
    proxy.$axios.post('/register', data).then((res) => {
      proxy.$toast('注册成功')
      router.push('/login')
    })
  } else {
    proxy.$toast('请按要求输入')
  }
}
const toLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  height: 100%;
}
.title {
  font-size: 1.75rem;
  color: #ccc;
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
