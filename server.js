const express = require('express')
const app = express()

app.use(express.json()) // penggunaan untuk format data json

// handler function express js
/*
    function (req, res)
*/

// middlewre hanlder function express js
/* 
    function (req, res, next)
*/

function middlewre1(req, res, next) {
    if (req.query.name == 'admin') {
        next()        
    }

    let data = {
        code: res.status(401),
        status: "unauthorized"
    }
    res.status(401)
    res.json(data)
    // res.send('unauthorized')s
}

app.use(middlewre1)

app.get('/', (req, res) => { // req dan res adalah http request untuk req, dan http response untuk res
    res.send("hello world")
})

app.get('/articles/:id', (req, res) =>{ // request dengan params bisa di ambil dengan cara req.params
    let articleId = parseInt(req.params.id)
    console.info(articleId)
    console.info(typeof(articleId))

    res.send(`ini adalah article id dengan id =  ${articleId}`)
})

app.post('/other', (req, res)=>{
    let response = req.body.email // request body dengan key json
    console.info(req.body)
    res.json(response) // res.json untuk kembalian sebagai json format
})

app.get('/user', (req, res) => { // request body dengan query params dan mengambil value pada key query params
    let response = req.query
    let name = response.name
    console.info(req.query)
    console.info(name)
    res.json(response)
})

app.get('/api/todos', (req, res) => { // get todos 
    let data = {
        1: {
            text: "workout",
            done: false
        },
        2: {
            text: "go to work",
            done: true,
            work: [{title: "gym"}, {title: "run"}]
            }
        }
    
    res.json(data)
})

app.post('/api/todos', (req, res) => { // post todos
    let data = req.body
    let id = Math.floor(Math.random() * 12345)
    let response = {}
    response[id] = data
    res.json(response)
})

console.info("listen")
app.listen(3000)