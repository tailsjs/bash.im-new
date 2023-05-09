const cheerio = require("cheerio")
const fetch = require("node-fetch")
const iconv = require('iconv-lite');
const formData = require('form-data');

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

    /**
     * Получить цитату по её ID
     * 
     * @param { Number } id ID цитаты
     * @returns Object Объект с цитатой.
     */
    async getByID(id){
        const responce = (await fetch("http://" + this.url + "/quote/" + id))
       
        const $ = cheerio.load(decode(await responce.arrayBuffer()))
        
        try{
            return {
                quote: parseText($("div.q div")[1].children).trim(),
                likes: Number($(".vote span")[0].children[0].data),
                url: "http://" + this.url + $(".vote a")[4].attribs.href.replace("/bayan", ""),
                author: {
                    nickname: $(".vote a")[5].children[0].data,
                    url: $(".vote a")[5].attribs.href
                }
            }
        }catch(e){
            throw new Error("Цитата не найдена!")
        }
    }

    /**
     * Поиск по сайту
     * 
     * @param { Object } params Объект с параметрами.
     * @param { String } params.search Запрос
     * @param { Number } params.page? Номер страницы
     * @param { Boolean } params.fullSearch? Использовать расширенный поиск?
     * @returns Array Массив с цитатами.
     */
    async search(params){
        if(!params.search)throw new Error("Не указан параметр \"search\"!")
        let data = formData()

        data.append("do", "search")
        data.append("subaction", "search")
        data.append("search_start", params.page ? params.page : 1)
        data.append("full_search", params.fullSearch ? 1 : 0)
        data.append("result_from", 1 + (70 * (params.page ? params.page - 1 : 0)))
        data.append("story", encode(params.search))
        data.append("dosearch", encode("Привет мир"))

        const responce = (await fetch("http://" + this.url + "/index.php?do=search", {
            method: "POST",
            body: data
        }))

        const $ = cheerio.load(decode(await responce.arrayBuffer()))

        let quotes = []

        $("table tr td.news").each((e, q) => {
            quotes.push({
                quote: parseText(q.children),
                author: "",
                views: -1,
                date: "",
                comments: -1,
                url: ""
            })
        })

        $("table tr td.slink").each((e, q) => {
            const fullParsableText = parseText(q.children).split("|")
            const author = fullParsableText[0].split("\n")[1].trim()
            const date = fullParsableText[1].trim()
            const views = Number(fullParsableText[2].replace(" Просмотров: ", ""))
            quotes[e].author = author
            quotes[e].date = date
            quotes[e].views = views
        })

        $("table tr td.stext").each((e, q) => {
            quotes[e].comments = Number(parseText(q.children).split("\n")[0].replace("Комментарии (", "").replace(") ", ""))
        })

        $("table tr td.stext a").filter((e, a) => a.attribs.href).each((e, q) => {
            quotes[e].url = q.attribs.href
        })

        return quotes
    }
}

function decode(body, from = 'win1251') {
    const buffer = Buffer.from(body, 'binary');
  
    return iconv.decode(buffer, from);
};

function encode(string, from = 'win1251') {
    return iconv.encode(string, from);
};

function parseText(childrens){
    text = ""
    for(let i of childrens){
        text += i.data ? i.data + "\n" : parseText(i.children).trim()
    }
    return text
}

module.exports = BashIm