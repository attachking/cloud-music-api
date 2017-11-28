let router = require('express').Router()
let {http} = require('../utils')

// 热门歌手
router.post('/hot', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        offset: req.body.offset || 0,
        total: true,
        limit: req.body.limit || 100,
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/artist/top',
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

// 歌手列表
router.post('/list', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        offset: req.body.offset || 0,
        total: true,
        limit: req.body.limit || 100,
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/artist/list',
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

//  歌手榜
router.post('/top', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        offset: req.body.offset || 0,
        total: true,
        limit: req.body.limit || 100,
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/artist/top?csrf_token=',
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