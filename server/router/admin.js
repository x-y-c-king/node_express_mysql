const express = require("express");
const dbService = require('../dbService');
const Methods = require("../utils/methods")
const router = express.Router();

router.post("/login", (request, response) => {
    const { name, pwd } = request.body;

    if (["", null, undefined].includes(name)) {
        response.json(Methods.getError("用户名不能为空"))
        return
    }
    if (["", null, undefined].includes(pwd)) {
        response.json(Methods.getError("密码不能为空"))
        return
    }

    const db = dbService.getDbServiceInstance();


    const result = db.login(name, pwd);
    result.then((res) => {
        response.json(
            res ? Methods.getSuccess(res) : Methods.getError("用户名或密码错误")
        )
    })
})

module.exports = router;
