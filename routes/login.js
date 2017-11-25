let router = require('express').Router()
let crypto = require('crypto')
let {http} = require('../utils')

// 手机登录
router.post('/phone', (req, res, next) => {
    const phone = req.body.phone
    const cookie = req.body.cookies
    const md5sum = crypto.createHash('md5')
    md5sum.update(req.body.password)
    const data = {
        phone: phone,
        password: md5sum.digest('hex'),
        rememberLogin: true
    }
    http({
        url: 'https://music.163.com/weapi/login/cellphone',
        method: 'post',
        data: data,
        cookie: cookie
    }).then((data) => {
        res.send({
            data: data.data,
            cookies: data.headers['set-cookie']
        })
    }).catch((err) => {
        next(err)
    })
})

// 刷新登录
router.post('/refresh', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/login/token/refresh',
        method: 'post',
        data: data,
        cookie: cookie
    }).then(data => {
        res.send(data)
    }).catch(err => {
        next(err)
    })
})

module.exports = router