const express = require('express')
const path = require('path')
const app = express()
const port = 8080;
const storeService = require('./store-service.js')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/about')
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

// --------------------------------------------------------------------------------------
// Left off finishing step 5. Walk through code 2 times and ensure you fully understand what is done up until now before continuing
// Reference old class examples in "Practices" folder if you forgot some stuff, goodluck future me.

app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then((items) => {
            res.json(items)
        })
})

app.get('/items', (req, res) => {
    storeService.getAllItems()
        .then((items) => {
            res.json(items)
        })
})

app.get('/categories', (req, res) => {
    storeService.getCategories()
        .then((categories) => {
            res.json(categories)
        })
})

app.use((req, res) => {
    res.status(404).send('Page Not Found')
})

storeService.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.error('Failed to initialize store-service:', err)
    })