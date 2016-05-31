var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
http.listen(8080,function(){
var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'hotels',
	});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // or maybe you prefer XML? ;)

var defaultRequest = function(req, res){
	var data = {
		"Data":""
	};
	data["Data"] = "REST API: Hotels";
	res.json(data);
};	
app.get('/', defaultRequest);
app.get('/restapi', defaultRequest);

app.get('/restapi/country', function(req, res) {
	var data = {
		"error":1,
		"Hotels":""
	};
	
	connection.query("SELECT * from Hotel", function(err, rows, fields) {
		if (rows.length != 0) {
			data["error"] = 0;
			data["Hotels"] = rows;
			res.json(data);
		} else {
			data["Hotels"] = 'No hotels found..';
			res.json(data);
		}
	});
});

	console.log("Connected & Listen to port 8080");
});
