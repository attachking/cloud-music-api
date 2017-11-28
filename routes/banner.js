let router = require('express').Router()
let {http} = require('../utils')

router.post('/', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {}
    http({
        url: 'https://music.163.com/weapi/v2/banner/get',
        method: 'post',
        data: data,
        cookie: cookie
    }).then(data => {
        res.send({
            data: data.data,
            cookies: data.headers['set-cookie']
        })
    }).catch(err => {
        next(err)
    })
})

module.exports = router