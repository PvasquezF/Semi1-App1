'use strict';
const express = require('express');
const app = express();
const request = require('request');
const url = 'https://92rjxexbvf.execute-api.us-east-1.amazonaws.com/get/getCharacters';

var PROTO_PATH = __dirname + '/hello.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
var client = new hello_proto.Greeter('34.70.39.209:50051', grpc.credentials.createInsecure());
var user;

app.use(express.static(__dirname + '/css'));
app.set("view engine", "ejs");
app.listen(3000, () => {
    console.log(`Running on http://localhost:3000`);
});
app.get('/', (req, res) => {
    request(url, function(error, response, body) {
        body = JSON.parse(body);
        user = req.params.id;
        client.sayHello({ name: 'Hola Mundo' }, function(err, responseA2) {
            console.log(responseA2);
            console.log(responseA2.message1);
            console.log(responseA2.message2);
            res.render('index', {
                "data": body,
                "respuestaApp2": responseA2.message1,
                "respuestaApp3": responseA2.message2
            });
        });
    });
});