var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});
