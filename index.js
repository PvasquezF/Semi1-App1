'use strict';
const express = require('express');
const app = express();
const request = require('request');
const url = 'https://92rjxexbvf.execute-api.us-east-1.amazonaws.com/get/getCharacters';
app.use(express.static(__dirname + '/css'));
app.set("view engine", "ejs");
app.listen(3000, () => {
    console.log(`Running on http://localhost:3000`);
});

app.get('/', (req, res) => {
    request(url, function(error, response, body) {
        body = JSON.parse(body);
        res.render('index', {
            "data": body
        });
    });
});