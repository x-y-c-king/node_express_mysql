const express = require("express");
const db = require('../dbService');
const Methods = require("../utils/methods")
const router = express.Router();

router.get("/getUserInfo", (request, response) => {
	const { code } = request.query;

	if (["", null, undefined].includes(code)) {
		response.json(Methods.getError("code不能为空"))
		return
	}

	const { appid, secret, js_code, grant_type } = {
		appid: process.env.APPID,
		secret: process.env.SECRET,
		js_code: code,
		grant_type: process.env.GRANTTYPE
	}
	const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=${grant_type}`

	get(url).then((res) => {
		const { session_key, openid } = res.data
		if (openid) {
			db.getUserInfo(openid).then((res) => {
				if (res && res.length !== 0) {
					response.json(Methods.getSuccess({ ...res[0], isSuccess: true }))
				} else {
					response.json(Methods.getSuccess({
						userid: openid,
						isSuccess: false
					}))
				}
			}).catch((err) => {
				response.json(Methods.getError(err));
			})
		} else {
			response.json(Methods.getError("openid获取失败"))
		}
	})
})

router.post("/setUserInfo", (request, response) => {
	const { userId, name, avatar } = request.body;

	if ([userId, name, avatar].every(item => !["", null, undefined].includes(item))) {
		db.setUserInfo(userId, name, avatar).then((res) => {
			response.json(Methods.getSuccess(true))
		}).catch((err) => {
			response.json(Methods.getError(err))
		})
	} else {
		response.json(Methods.getError("参数不能为空"))
	}
})

router.get("/getShoppingCat", (request, response) => {
	const { userId, page, size } = request.query

	if (['', null, undefined].includes(userId)) {
		response.json(Methods.getError("userid不能为空！"))
		return
	}

	db.getOrder(userId, 0, page, size).then(res => {
		response.json(Methods.getSuccess(res))
	}).catch((err) => {
		response.json(Methods.getError(err))
	})
})

router.get("/getAllOrder", (request, response) => {
	const { userId, page, size } = request.query;
	if (['', null, undefined].includes(userId)) {
		response.json(Methods.getError("userid不能为空！"))
		return
	}

	db.getOrder(userId, 3, page, size).then(res => {
		response.json(Methods.getSuccess(res))
	}).catch((err) => {
		response.json(Methods.getError(err))
	})
})

router.get("/getGoods", (request, response) => {
	const { userId, page, size } = request.query;
	// if (['', null, undefined].includes(userId)) {
	// 	response.json(Methods.getError("userid不能为空！"))
	// 	return
	// }
	const carousel = db.getCarousel();
	const goods = db.getGoods(page, size);
	Promise.all([carousel, goods]).then(([carousel, goods]) => {
		response.json(Methods.getSuccess({
			carousel,
			goods
		}))
	}).catch((err) => {
		response.json(Methods.getError(err))
	})

	// db.getGoods(page, size).then(res => {
	// 	response.json(Methods.getSuccess(res))
	// }).catch((err) => {
	// 	response.json(Methods.getError(err))
	// })
})

router.get("/goodsDeails:id", (request, response) => {
	const { id } = request.params;
	const { userId } = request.query;


})

module.exports = router;
