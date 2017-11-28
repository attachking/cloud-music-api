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

// 收藏/删除歌单歌曲
router.post('/track', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        // op为'add'或'del'
        op: req.body.op,
        // 歌单id
        pid: req.body.pid,
        // 歌曲id
        tracks: req.body.tracks,
        trackIds: JSON.stringify([req.body.tracks]),
        csrf_token: ''
    }
    http({
        url: 'https://music.163.com/weapi/playlist/manipulate/tracks',
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

// 精品歌单
router.post('/highQuality', (req, res, next) => {
    const cookie = req.body.cookies
    const data = {
        // cat: tag, 比如 "华语"、"古风" 、"欧美"、"流行",默认为"全部"
        cat: req.body.cat || "全部",
        offset: req.body.offset || 0,
        limit: req.body.limit || 20,
        csrf_token: ""
    }
    http({
        url: 'https://music.163.com/weapi/playlist/highquality/list',
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