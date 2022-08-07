import {
	APIConfig
} from "../config/config"
class Http {
	request() {
		return new Promise((resolve, reject) => {
			wx.request({
				url: APIConfig.baseURL + '/api/app/nav',
				method: 'GET',
				success: (res) => {
					resolve()
					console.log(res);
				},
				fail: (err) => {
					reject()
					console.log(err)
				}
			})
		})

	}
}
export default Http
