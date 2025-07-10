// console.log("Astik Nodes");

require('dotenv').config()
const express = require('express');
const app = express()
const PORT = 4000

app.get('/',(req,res) => {
    res.send("Hello World")
})

app.get('/twitter' , (req,res) => {
    res.send("Astikdotcom")
})

app.get('/login',(req,res) => {
    res.send('<h1>Welcome to login page</h1>')
})

app.get('/youtube', (req,res) => {
    res.send('https://youtube.com')
})

app.listen(process.env.PORT,
    () => console.log(`Server is running at ${PORT}`)
)