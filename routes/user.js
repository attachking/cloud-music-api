let router = require('express').Router()
let {http} = require('../utils')

// 用户歌单
router.post('/playlist', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        offset: 0,
        uid: req.body.uid,
        limit: 1000,
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/user/playlist',
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