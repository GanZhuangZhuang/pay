/**
 * 将数据添加到本地
 */
import Storage from "../utils/storage"
const addCart = (data) => {
  console.log("data=>", data);
  console.log("hasLocalData", hasLocalData());
  const carsArray = []
  if (!hasLocalData()) {
    data.num = 1
    carsArray.push(data)
    Storage.set("carts", carsArray)
  } else {
    const localData = Storage.get("carts")
    if (hasShopData(data, localData)) {
      localData.forEach(item => {
        if (item._id === data._id) {
          item.num += 1
        }
      })
    }else{
      data.num=1
      localData.push(data)
    }
    Storage.set("carts", localData)
  }
}
  /**
   * 检测是不是第一次存储 
   */
const hasLocalData = () => {
  const carts = Storage.get('carts')
  const status = carts ? true : false
  return status
}

/**
 * 判断当前要添加的商品是否在本地存在
 */
const hasShopData = (data, locaData) => {
  const _data = locaData.filter(item => {
    return item._id === data._id
  })
  return _data.length > 0 ? true : false
}

export {
  addCart
}