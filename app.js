const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const fs = require('fs');

const CONNECTION_URL = "mongodb+srv://Test:test@denzel-cluster-zrisw.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "Denzel-DataBase";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection,collectionAwesome;
var jsonData = JSON.parse(fs.readFileSync("filmsBDD.json"));
var jsonAwesome = JSON.parse(fs.readFileSync("AwesomefilmsBDD.json"));

app.listen(9292, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("Denzel-Collection");
		collectionAwesome = database.collection("Awesome-Collection");
        console.log("Connected to " + DATABASE_NAME + "!");
    });
});


//Populate the database with all the Denzel's movies from IMDb.
//Shell Request
//curl -H "Accept: application/json" http://localhost:9292/movies/populate
app.get("/movies/populate", (request, response) => {
    //One collection for all denzel movies 
	jsonData;
	collection.insertMany(jsonData, function(err, res){
		if (err) 
		{return response.status(500).send(err);}
		console.log("Number of documents inserted: " + res.insertedCount +" in movie collection.");
	});
	//one collection for awesome denzel movie (will be useful for the second request
	jsonAwesome;
	collectionAwesome.insertMany(jsonAwesome, function(err, res){
		if (err) 
		{return response.status(500).send(err);}
		console.log("Number of documents inserted: " + res.insertedCount+" in AwesomeMovies collection.");
	});
});
