const cheerio = require("cheerio")
const fetch = require("node-fetch")
const iconv = require('iconv-lite');

class BashIm{
    /**
     * bash.im-new
     * 
     * Модуль для парса цитат с bash.im
     * @param { String } url URL для зеркала bash.im. По умолчанию стоит bashorg.org
     */
    constructor(url = "bashorg.org"){
        this.url = url
    }

    /**
     * Получить рандомную цитату.
     * 
     * @returns Object Объект с цитатой.
     */
    async randomQuote(){
        const responce = (await fetch("http://" + this.url + "/casual"))
       
        const $ = cheerio.load(decode(await responce.arrayBuffer()))
 
        return {
            quote: parseText($("div.q div")[1].children).trim(),
            likes: Number($(".vote span")[0].children[0].data),
            url: $(".vote a")[4].attribs.href
        }
    }

    /**
     * Получить рандомные цитаты.
     * 
     * @returns Array Массив с цитатами.
     */
    async randomQuotes(){
        const responce = (await fetch("http://" + this.url + "/random"))

        const $ = cheerio.load(decode(await responce.arrayBuffer()))

        let quotes = []

        $(".quote").each((e, q) => {
            quotes.push({
                quote: parseText(q.children).trim(),
                likes: -1,
                url: ""
            })
        })
        
        $("div.q div span").filter((e, a) => a.attribs.id).each((e, q) => {
            quotes[e].likes = Number(parseText(q.children).trim())
        })

        $("div.q div a").filter((e, a) => a.attribs.href && a.attribs.href.includes("/quote") && a.children[0].data.includes("#")).each((e, q) => {
            if(e > quotes.length - 1)return;
            quotes[e].url = this.url + q.attribs.href
        })

        return quotes
    }

    /**
     * Получить цитаты из раздела "Лучшие"
     * 
     * @param { Number } page Номер страницы
     * @returns Array Массив с цитатами.
     */
    async best(page){
        const responce = (await fetch("http://" + this.url + "/best" + (page ? `/page/${page}` : "")))

        const $ = cheerio.load(decode(await responce.arrayBuffer()))

        let quotes = []

        $(".quote").each((e, q) => {
            quotes.push({
                quote: parseText(q.children).trim(),
                likes: -1,
                url: ""
            })
        })
        
        $("div.q div span").filter((e, a) => a.attribs.id).each((e, q) => {
            quotes[e].likes = Number(parseText(q.children).trim())
        })

        $("div.q div a").filter((e, a) => a.attribs.href && a.attribs.href.includes("/quote") && a.children[0].data.includes("#")).each((e, q) => {
            if(e > quotes.length - 1)return;
            quotes[e].url = this.url + q.attribs.href
        })

        return quotes
    }

    /**
     * Получить цитаты из раздела "По рейтингу"
     * 
     * @param { Number } page Номер страницы
     * @returns Array Массив с цитатами.
     */
    async rating(page){
        const responce = (await fetch("http://" + this.url + "/byrating" + (page ? `/page/${page}` : "")))

        const $ = cheerio.load(decode(await responce.arrayBuffer()))

        let quotes = []

        $(".quote").each((e, q) => {
            quotes.push({
                quote: parseText(q.children).trim(),
                likes: -1,
                url: ""
            })
        })
        
        $("div.q div span").filter((e, a) => a.attribs.id).each((e, q) => {
            quotes[e].likes = Number(parseText(q.children).trim())
        })

        $("div.q div a").filter((e, a) => a.attribs.href && a.attribs.href.includes("/quote") && a.children[0].data.includes("#")).each((e, q) => {
            if(e > quotes.length - 1)return;
            quotes[e].url = this.url + q.attribs.href
        })

        return quotes
    }

    /**
     * Получить цитаты из раздела "Яма"
     * 
     * @param { Number } page Номер страницы
     * @returns Array Массив с цитатами.
     */
    async pit(page){
        const responce = (await fetch("http://" + this.url + "/pit" + (page ? `/page/${page}` : "")))

        const $ = cheerio.load(decode(await responce.arrayBuffer()))

        let quotes = []

        $(".quote").each((e, q) => {
            quotes.push({
                quote: parseText(q.children).trim(),
                likes: -1,
                url: ""
            })
        })
        
        $("div.q div span").filter((e, a) => a.attribs.id).each((e, q) => {
            quotes[e].likes = Number(parseText(q.children).trim())
        })

        $("div.q div a").filter((e, a) => a.attribs.href && a.attribs.href.includes("/quote") && a.children[0].data.includes("#")).each((e, q) => {
            if(e > quotes.length - 1)return;
            quotes[e].url = this.url + q.attribs.href
        })

        return quotes
    }

    /**
     * Получить цитаты из раздела "Топ ямы"
     * 
     * @param { Number } page Номер страницы
     * @returns Array Массив с цитатами.
     */
    async pitTop(page){
        const responce = (await fetch("http://" + this.url + "/pittop" + (page ? `/page/${page}` : "")))

        const $ = cheerio.load(decode(await responce.arrayBuffer()))

        let quotes = []

        $(".quote").each((e, q) => {
            quotes.push({
                quote: parseText(q.children).trim(),
                likes: -1,
                url: ""
            })
        })
        
        $("div.q div span").filter((e, a) => a.attribs.id).each((e, q) => {
            quotes[e].likes = Number(parseText(q.children).trim())
        })

        $("div.q div a").filter((e, a) => a.attribs.href && a.attribs.href.includes("/quote") && a.children[0].data.includes("#")).each((e, q) => {
            if(e > quotes.length - 1)return;
            quotes[e].url = this.url + q.attribs.href
        })

        return quotes
    }
}

function decode(body, from = 'win1251') {
    const buffer = Buffer.from(body, 'binary');
  
    return iconv.decode(buffer, from);
};

function parseText(childrens){
    text = ""
    for(let i of childrens){
        text += i.data ? i.data + "\n" : parseText(i.children).trim()
    }
    return text
}

module.exports = BashIm