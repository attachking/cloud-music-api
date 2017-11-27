let router = require('express').Router()
let {http} = require('../utils')

// 用户歌单
router.post('/playlist', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        offset: 0,
        uid: req.body.uid,
        limit: req.body.limit || 1000,
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

// 用户详情
router.post('/detail', (req, res, next) => {
    const cookie = req.body.cookies
    const id = req.body.uid
    const data = {
        csrf_token: ''
    }
    http({
        url: `https://music.163.com/weapi/v1/user/detail/${id}`,
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

// 获取用户信息,歌单，收藏，mv, dj 数量
router.post('/subCount', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        csrf_token: ''
    }
    http({
        url: `https://music.163.com/weapi/subcount`,
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

// 喜欢
router.post('/like', (req, res, next) => {
    const cookie = req.body.cookies
    const trackId = req.body.id
    const like = req.body.like || true
    const alg = req.body.alg || 'itembased'
    const time = req.body.time || 25
    const data = {
        csrf_token: '',
        trackId,
        like,
        alg,
        time
    }
    http({
        url: `https://music.163.com/weapi/radio/like?alg=${alg}&trackId=${trackId}&like=${like}&time=${time}`,
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