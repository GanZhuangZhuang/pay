/**
 * 配置api
 */
const APIConfig = {
  "api1": {
    baseURL: 'https://admin.hxwendeng.com'
  },
  "api2": {
    baseURL: 'http://weixin.itying.com'
  }
}

// 白名单
const pathWhiteList = ["/login", "/404", "/401", "settings"]

const field = {
  loginCredentials: 'token',
  userInfoKey:'userInfo'
}

export {
  APIConfig,
  pathWhiteList,
  field
}