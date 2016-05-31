var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'hotels',
	});
app.use(bodyParser.urlencoded({ extended: true }));
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

/* Получить информацию об определенном отеле */
app.get('/restapi/country/hotels/:id', function(req, res) {
	/* TODO: replace country by it's ID */
	var hotelId = req.params.id;
	var data = {
		"error":1,
		"Hotels":""
	};
	if (!!hotelId) {
		var queryString = "SELECT * from Hotel WHERE `id`=?";
		var queryKeys = [hotelId];

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
		data["Hotels"] = "Please provide all required data (i.e : id )";
		res.json(data);
	}
});

/* Добавить страну */
app.post('/restapi/country', function(req, res) {
	var countryName = req.body.Name;
	var countryDesc = req.body.Description;
	var data = {
		"error":1,
		"Countries":""
	};
	if(!!countryName && !!countryDesc) {
		var queryString = "INSERT INTO Country VALUES(?,?)";
		var queryKeys = [countryName, countryDesc];

		connection.query(queryString, queryKeys, function(err, rows, fields) {
			if (!!err) {
				data["Countries"] = "Error occured while adding data";
			} else {
				data["error"] = 0;
				data["Countries"] = "Country Added Successfully";
			}
			res.json(data);
		});
	} else {
		data["Countries"] = "Please provide all required data (i.e : NOT EMPTY country name, country description)";
		res.json(data);
	}
});

/* Добавить отель в страну */
app.post('/restapi/country/hotels', function(req, res) {
	var hotelName = req.body.Name;
	var countryName = req.body.Country;
	var hotelDesc = req.body.Description;
	console.log(hotelName, countryName, hotelDesc);
	var data = {
		"error":1,
		"Result":""
	};
	if(!!hotelName && !!countryName && !!hotelDesc) {
		var queryString = "INSERT INTO Hotel(`Name`,`Country`,`Description`) VALUES(?,?,?)";
		var queryKeys = [hotelName, countryName, hotelDesc];

		connection.query(queryString, queryKeys, function(err, rows, fields) {
			console.log(err);
			if (!!err) {
				data["Result"] = "Error occured while adding data";
			} else {
				data["error"] = 0;
				data["Result"] = "Hotel Added Successfully";
			}
			res.json(data);
		});
	} else {
		data["Result"] = "Please provide all required data (i.e : NOT EMPTY name, country, description)";
		res.json(data);
	}
});

/* Обновить информацию об определенном отеле */
app.put('/restapi/country/hotels', function(req, res) {
	var hotelId = req.body.id;
	var hotelName = req.body.Name;
	var countryName = req.body.Country;
	var hotelDesc = req.body.Description;
	var data = {
		"error":1,
		"Countries":""
	};
	if (!!hotelName && !!countryName && !!hotelDesc) {
		var queryString = "UPDATE Hotel SET Name=?, Country=?, Description=? WHERE id=?";
		var queryKeys = [hotelName, countryName, hotelDesc, hotelId];

		connection.query(queryString, queryKeys, function(err, rows, fields) {
			if (!!err) {
				data["Hotels"] = "Error Updating data";
			} else {
				data["error"] = 0;
				data["Hotels"] = "Hotel [" + hotelName + "](" + hotelId + ") Updated Successfully";
			}
			res.json(data);
		});
	} else {
		data["Hotels"] = "Please provide all required data (i.e : id, name, country name, description)";
		res.json(data);
	}
});

/* Удалить определенный отель */
app.delete('/restapi/country/hotels', function(req,res) {
	var hotelId = req.body.id;
	var data = {
		"error":1,
		"Hotels":""
	};
	if (!!hotelId) {
		connection.query("DELETE FROM Hotel WHERE id=?", [hotelId], function(err, rows, fields) {
			if (!!err) {
				data["Hotels"] = "Error deleting data";
			} else {
				data["error"] = 0;
				data["Hotels"] = "Hotel #(" + hotelId + ") Deleted Successfully";
			}
			res.json(data);
		});
	} else {
		data["Hotels"] = "Please provide all required data (i.e : id )";
		res.json(data);
	}
});

http.listen(8080, function() {
	console.log("Connected & Listen to port 8080");
});
