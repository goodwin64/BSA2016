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
	res.send("Please use \n/restapi/country or \n/restapi/country/hotels");
};	
app.get('/', defaultRequest);
app.get('/restapi', defaultRequest);

/* Получить список стран */
app.get('/restapi/country', function(req, res) {
	var data = {
		"error":1,
		"Countries":""
	};
	
	connection.query("SELECT * from Country", function(err, rows, fields) {
		if (rows.length != 0) {
			data["error"] = 0;
			data["Countries"] = rows;
			res.json(data);
		} else {
			data["Countries"] = 'No countries found..';
			res.json(data);
		}
	});
});

/* Получить список отелей в стране */
app.get('/restapi/country/hotels', function(req, res) {
	/* TODO: replace country by it's ID */
	var countryName = req.query['countryName'];
	var data = {
		"error":1,
		"Hotels":""
	};
	if (!!countryName) {
		var queryString = "SELECT * from Hotel WHERE Country=?";
		var queryKeys = [countryName];

		connection.query(queryString, queryKeys, function(err, rows, fields) {
			if (!!err) {
				data["Hotels"] = "Error occured while reading data";
			} else {
				data["error"] = 0;
				data["Hotels"] = rows;
			}
			res.json(data);
		});
	} else {
		data["Hotels"] = "Please provide all required data (i.e : Country name)";
		res.json(data);
	}
});

	console.log("Connected & Listen to port 8080");
});
