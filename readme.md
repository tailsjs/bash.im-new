# bash.im-new
Модуль для парса цитат с bash.im

* Модули `bash.im` и `bash-new` не работают.

## Установка:
* NPM - `npm install bash.im-new`
* YARN - `yarn add bash.im-new`

## Пример работы:
```js
const BashIM = require("bash.im-new");
const bash = new BashIM(uri) // Можно вставить сюда URL зеркала bash.im. По умолчанию стоит bashorg.org

let quote = await bash.randomQuote()

console.log(quote) // { quote: "...", likes: 0, url: "..." }
```

## Методы:
```js
bash.randomQuote() // Возвращает рандомную цитату. { quote: "...", likes: 0, url: "..." }
bash.randomQuotes() // Возвращает рандомные цитаты. [{ quote: "...", likes: 0, url: "..." }, { quote: "...", likes: 0, url: "..." }]
bash.best(page) // Возвращает цитаты из раздела "Лучшие". В page надо передавать страницу. [{ quote: "...", likes: 0, url: "..." }, { quote: "...", likes: 0, url: "..." }]
bash.rating(page) // Возвращает цитаты из раздела "По рейтингу". В page надо передавать страницу. [{ quote: "...", likes: 0, url: "..." }, { quote: "...", likes: 0, url: "..." }]
bash.pit(page) // Возвращает цитаты из раздела "Яма". В page надо передавать страницу. [{ quote: "...", likes: 0, url: "..." }, { quote: "...", likes: 0, url: "..." }]
bash.pitTop(page) // Возвращает цитаты из раздела "Топ ямы". В page надо передавать страницу. [{ quote: "...", likes: 0, url: "..." }, { quote: "...", likes: 0, url: "..." }]
bash.getByID(id) // Получает цитату по её ID. В id надо передавать ID цитаты. { quote: "...", likes: 0, url: "...", author: { nickname: "...", url: "..." } }
bash.search(params) // Поиск по сайту. В params надо передавать Объект типа { search: "Запрос", page?: 1, fullSearch?: true }. [{ quote: "...", author: "...", views: 0, date: "...", comments: 0, url: "..." }, ...]
```

## Планы:
* Пока планов нет.