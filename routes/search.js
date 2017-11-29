let router = require('express').Router()
let {http} = require('../utils')

// 搜索
router.post('/', (req, res, next) => {
    const cookie = req.body.cookies
    // *(type)* 搜索单曲(1)，歌手(100)，专辑(10)，歌单(1000)，用户(1002)
    const data = {
        csrf_token: "",
        limit: req.body.limit || 20,
        type: req.body.type || 1,
        s: req.body.keywords,
        offset: req.body.offset || 0
    };
    http({
        url: 'https://music.163.com/weapi/search/get',
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

// 搜索建议
router.post('/suggest', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        csrf_token: "",
        limit: req.body.limit || 20,
        s: req.body.keywords,
        offset: req.body.offset || 0
    };
    http({
        url: 'https://music.163.com/weapi/search/suggest/web',
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