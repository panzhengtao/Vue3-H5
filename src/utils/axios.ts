// 封装 axios
import axios from 'axios'
const ins = axios.create({
  // baseURL: 'http://localhost:8080/',
  timeout: 5000
})
ins.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

ins.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default ins
