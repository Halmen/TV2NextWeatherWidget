const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        server.get('/p/:id', (req, res) => {
            const page = '/post'
            const params = {title: req.params.id}
            app.render(req, res, page, params)
        })

        server.get('/', (req, res) => {
            const page = '/'

            const params = {city: req.query.city}
            app.render(req, res, page, params)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })