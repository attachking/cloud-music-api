let router = require('express').Router()
let {http} = require('../utils')

// 推荐歌单（无需登录）
router.post('/personalized', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        offset: req.body.offset || 0,
        total: true,
        limit: req.body.limit || 20,
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/personalized/playlist',
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

// 每日推荐歌曲（需要登录）
router.post('/songs', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        offset: 0,
        total: true,
        limit: 20,
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/v1/discovery/recommend/songs',
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

// 每日推荐歌单（需要登录）
router.post('/playlist', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/v1/discovery/recommend/resource',
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