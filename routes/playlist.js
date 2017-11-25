let router = require('express').Router()
let {http} = require('../utils')

// 歌单详情
router.post('/detail', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        uid: req.body.uid,
        id: req.body.id,
        offset: 0,
        total: true,
        limit: 1000,
        n: 1000,
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/v3/playlist/detail',
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