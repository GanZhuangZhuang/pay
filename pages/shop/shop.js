// pages/shop/shop.js
import ShopModel from "../../model/shop"
import {navigateTo} from '../../utils/navigate'
import {addCart} from '../../common/cart'
Page({
  /**
   * 调用轮播图接口方法
   */
  async getBanner() {
    const response = await ShopModel.getShopBanner()
    this.setData({
      bannerData: response.data
    })
  },
  /**
   * 获取商品信息的方法
   */
  async getShopCode(event) {
    //获取商品条形码 
    const qcode = event.detail
    // 如果条形码不存在 则不在继续进行
    if (!qcode) return
    try {
      const response = await ShopModel.getShopingInfo(qcode)
      // 如果商品信息获取失败 则不往下执行
      console.log("Response=>", response);
      if(!response.success) return
       // 获取商品信息
      const result=response.result
    
      // 获取商品的数据小于等于0  说明没有当前的条形码数据 则不往下执行
      if(result.length<=0) return 
      // 将商品添加到本地
      addCart(result[0])

      /**
       * 如何把商品的额数据在购物车进行显示
       * 
       * 通过路由传参 传递到购物车页面
       * 存在本地
       * 给后台也存储一份
       */

      // 跳转购物车页面
      navigateTo("/pages/cart/cart")
    } catch (err) {
      console.log(err);
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    bannerData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBanner()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})