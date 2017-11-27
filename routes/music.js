let router = require('express').Router()
let {http} = require('../utils')

router.post('/url', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        ids: [req.body.id],
        br: req.body.br || 999000,
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/song/enhance/player/url',
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

router.post('/lyric', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        os: 'osx',
        id: req.body.id,
        lv: -1,
        kv: -1,
        tv: -1
    }
    http({
        url: 'https://music.163.com/weapi/song/lyric',
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