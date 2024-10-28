const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.json()) //  even though the express uses body-parse library under hood so it is same as "app.use(bodyParser.json())"

app.get('/', function(req, res){

})

app.post('/', function(req, res){

})