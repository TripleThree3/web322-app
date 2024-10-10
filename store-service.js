const fs = require('fs')
const path = require('path')

let items = []
let categories = []

module.exports = {
    initialize: function () {
        return new Promise((resolve) => {
            fs.readFile(path.join(__dirname, './data/items.json'), 'utf8', (err, data) => {
                items = JSON.parse(data)
                fs.readFile(path.join(__dirname, './data/categories.json'), 'utf8', (err, data) => {
                    categories = JSON.parse(data)
                    resolve()
                })
            })
        })
    },

    getAllItems: function () {
        return new Promise((resolve) => {
            resolve(items)
        })
    },

    getPublishedItems: function () {
        return new Promise((resolve) => {
            const publishedItems = items.filter(item => item.published === true)
            resolve(publishedItems)
        })
    },

    getCategories: function () {
        return new Promise((resolve) => {
            resolve(categories)
        })
    }
}
