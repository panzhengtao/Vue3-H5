import Mock from 'mockjs'

// 保存注册用户数据
const registerData = []
// 返回注册id
const registerId = Mock.mock({
  'registerId|+1': 1
})
// 注册接口
Mock.mock('/register', 'post', (config) => {
  let data = JSON.parse(config.body)
  let registerUser = {
    username: data.username,
    password: parseInt(data.password)
  }
  registerData.push(registerUser)
  return registerId
})

// 返回默认登录信息
const loginInfo = Mock.mock({
  username: 'admin',
  password: 123456
})
// 登录接口
Mock.mock('/login', 'post', (config) => {
  let data = JSON.parse(config.body)
  let res = registerData.filter(
    (item) => item.username === data.username && item.password === parseInt(data.password)
  )
  if (res.length) {
    return Mock.mock(res[0])
  } else {
    return loginInfo
  }
})
// 首页数据
Mock.mock('/homeData', 'get', {
  dataList: [
    {
      cateName: '服装类',
      cateId: 1,
      cateData: [
        {
          name: '牛仔裤1',
          img: 'https://s3.bmp.ovh/imgs/2021/12/f331c7187943665a.jpg'
        },
        {
          name: '牛仔裤2',
          img: 'https://s3.bmp.ovh/imgs/2021/12/f331c7187943665a.jpg'
        },
        {
          name: '牛仔裤3',
          img: 'https://s3.bmp.ovh/imgs/2021/12/f331c7187943665a.jpg'
        }
      ]
    },
    {
      cateName: '食品类',
      cateId: 2,
      cateData: [
        {
          name: '菠萝包1',
          img: 'https://s3.bmp.ovh/imgs/2021/12/f331c7187943665a.jpg'
        },
        {
          name: '菠萝包2',
          img: 'https://s3.bmp.ovh/imgs/2021/12/f331c7187943665a.jpg'
        },
        {
          name: '菠萝包3',
          img: 'https://s3.bmp.ovh/imgs/2021/12/f331c7187943665a.jpg'
        }
      ]
    },
    {
      cateName: '箱包类',
      cateId: 3,
      cateData: [
        {
          name: '公文包1',
          img: 'https://s3.bmp.ovh/imgs/2021/12/f331c7187943665a.jpg'
        },
        {
          name: '公文包2',
          img: 'https://s3.bmp.ovh/imgs/2021/12/f331c7187943665a.jpg'
        },
        {
          name: '公文包3',
          img: 'https://s3.bmp.ovh/imgs/2021/12/f331c7187943665a.jpg'
        }
      ]
    }
  ]
})

// 详情页数据
Mock.mock('/detail', 'post', (config) => {
  let res = JSON.parse(config.body)
  return Mock.mock({
    'id|+1': '@id',
    desc: '@csentence(20, 100)',
    address: '@county(true)',
    'price|45-2000': 100,
    ...res
  })
})

export default Mock
