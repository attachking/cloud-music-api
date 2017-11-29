let router = require('express').Router()
let axios = require('axios')
let cheerio = require('cheerio')

let TOP_LIST = []

function getTopList() {
    axios.get('http://music.163.com/discover/toplist', {
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Cookie': '_ntes_nnid=ca3e5d6db98c308dea9041e73c4679e8,1511858305875; _ntes_nuid=ca3e5d6db98c308dea9041e73c4679e8; JSESSIONID-WYYY=A93CU8n9xV56w0I4XG%2F4WB45FK2Klt%5CPQtw4N%2FcsJ1NuV1Mg9Ju5Sdq2T9ihmu83%2F1aOeqP9v8mmA4u5ug4Rf4iTAPcx09SaJ%2B3FFacj8vFW%5Cxem4bZMEd%5CUM%2FAvKHZWY5maeKc37qJjqNeV7jhj9WrCvt6G9fT%5CC%2BzJU8lUuku3gINw%3A1511928446333; _iuqxldmzr_=32; __utma=94650624.925995988.1511858307.1511858307.1511926647.2; __utmb=94650624.3.10.1511926647; __utmc=94650624; __utmz=94650624.1511926647.2.2.utmcsr=baidu|utmccn=(organic)|utmcmd=organic',
            'Host': 'music.163.com',
            'Referer': 'http://music.163.com/',
            'Upgrade-Insecure-Requests':1,
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.3427.400 QQBrowser/9.6.12513.400'
        }
    }).then(data => {
        let $ = cheerio.load(data.data)
        $('#toplist .g-sd3 li').each((index, item) => {
            TOP_LIST.push({
                id: $(item).attr('data-res-id'),
                img: $(item).find('img').attr('src').replace('40y40', '150y150'),
                name: $(item).find('.name a').text(),
                desc: $(item).find('.s-fc4').text()
            })
        })
    }).catch(err => {
        console.log(err)
    })
}
getTopList()

// 排行榜列表
router.post('/list', (req, res, next) => {
    res.send(TOP_LIST)
})

module.exports = router