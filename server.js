/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or
distributed to other students.
Name: Kian Mohammadzadeh Gharbi
Student ID: 111068227
Date: Oct 13th, 2024
Vercel Web App URL: N/A
GitHub Repository URL: https://github.com/TripleThree3/web322-app
********************************************************************************/

const { send } = require('micro');
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080;
const storeService = require('./store-service.js')

module.exports = app;

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/about')
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then((items) => {
            res.json(items)
        })
        .catch((err) => {
            res.status(500).json({ message: err })
        })
})

app.get('/items', (req, res) => {
    storeService.getAllItems()
        .then((items) => {
            res.json(items)
        })
        .catch((err) => {
            res.status(500).json({ message: err })
        })
})

app.get('/categories', (req, res) => {
    storeService.getCategories()
        .then((categories) => {
            res.json(categories)
        })
        .catch((err) => {
            res.status(500).json({ message: err })
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