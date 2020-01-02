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
var client = new hello_proto.Greeter('35.222.94.108:50051', grpc.credentials.createInsecure());
var client2 = new hello_proto.Greeter('34.70.189.149:50052', grpc.credentials.createInsecure());
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
            client2.sayHello({ name: 'Adios Mundo' }, function(err, responseA3) {
                console.log(responseA2.message);
                console.log(responseA3.message);
                res.render('index', {
                    "data": body,
                    "respuestaApp2": responseA2.message,
                    "respuestaApp3": responseA3.message
                });
            });
        });
    });
});

app.get('/:valor', function(req, res) {
    user = req.params.valor;
    request(url, function(error, response, body) {
        body = JSON.parse(body);
        user = req.params.id;
        client.sayHello({ name: user }, function(err, responseA2) {
            client2.sayHello({ name: 'App3 -> ' + user }, function(err, responseA3) {
                console.log(responseA2.message);
                console.log(responseA3.message);
                res.render('index', {
                    "data": body,
                    "respuestaApp2": responseA2.message,
                    "respuestaApp3": responseA3.message
                });
            });
        });
    });
});