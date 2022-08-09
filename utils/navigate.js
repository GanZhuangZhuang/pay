import {
  pathWhiteList,
  field
} from "../config/config"
/**
 * 普通跳转  不需要权限
 */
export const navigateTo = (url) => {
  wx.navigateTo({
    url,
  })
}
/**
 * 需要登录之后  才可以跳转
 */
export const navigateAuthTo = (url) => {
  const path = pathWhiteList.includes(url)
  if (path) {
    wx.navigateTo({
      url,
    })
    return
  }
  //获取token
 const token = wx.getStorageSync(field.loginCredentials)
  if (token) {
    wx.navigateTo({
      url,
    })
    return
  }
  wx.navigateTo({
    url: '/pages/login/login',
  })
}