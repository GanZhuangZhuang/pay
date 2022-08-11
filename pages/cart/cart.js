// pages/cart/cart.js
import Storage from "../../utils/storage"
import ShopModel from "../../model/shop"
import {addCart} from '../../common/cart'
Page({

  /**
   *  商品加加
   */
  handleIncrement(event) {
    this.handleComputedCount(event, 'increment')
    this.handleComputedPrice()
  },
  /**
   * 商品减减
   */
  handleDecrement(event) {
    this.handleComputedCount(event, 'decrement')
    this.handleComputedPrice()
  },

  /**
   * 封装加减
   */
  handleComputedCount(event, action) {
    const _index = event.currentTarget.dataset.index

    action === 'increment' ? this.data.cartList[_index].num += 1 : this.data.cartList[_index].num -= 1

    if (this.data.cartList[_index].num <= 0) {
      this.data.cartList[_index].num = 1
      this.handelModalAction(_index)
      return
    }

    // 存储数据
    this.setData({
      cartList: this.data.cartList
    })
    Storage.set("carts", this.data.cartList)
  },
  /**
   * 当页面数量少于1的时候的处理方式
   */
  handelModalAction(index) {
    wx.showModal({
      title: '提示',
      content: '您确定要删除商品吗',
      success: (res) => {
        if (res.confirm) {
          // 删除
          this.data.cartList.splice(index, 1)
          // 删除后 再一次存储
          this.setData({
            cartList: this.data.cartList
          })
          Storage.set("carts", this.data.cartList)
          this.handleComputedPrice()
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })


  },
  /**
   *计算总价的方法 
   */
  handleComputedPrice() {
    let totalPrice = 0
    this.data.cartList.forEach(item => {
      const total = (item.num * item.price).toFixed(2)
      totalPrice += Number.parseFloat(total)
    })
    this.setData({
      totalPrice
    })
  },
  /**
   * 点击继续添加按钮
   */
  handleAdd() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        const event={
          detail:res.result
        }
        this.getShopCode(event)
      }
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
      if (!response.success) return
      // 获取商品信息
      const result = response.result

      // 获取商品的数据小于等于0  说明没有当前的条形码数据 则不往下执行
      if (result.length <= 0) return
      // 将商品添加到本地
      addCart(result[0])
      this.getCartList()
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 更改标题
    wx.setNavigationBarTitle({
      title: '购物车',
    })
    this.getCartList()


  },
  /**
   *获取本地存储的购物车数据
   */
  getCartList() {
    const cartList = Storage.get("carts")
    // console.log("dsada",cartList);
    if (cartList.length < 0) return
    this.setData({
      cartList
    })
    this.handleComputedPrice()
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