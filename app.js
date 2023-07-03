const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function getRecipeByID(id) {
	var config = {
		method: "get",
		url:
			"https://api.spoonacular.com/recipes/" +
			id +
			"/information?includeNutrition=false&apiKey=" +
			API_KEY,
		headers: {},
	};

	return axios(config)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getRecipe(query, limit) {
	var config = {
		method: "get",
		url:
			"https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
			query +
			"&number=" +
			limit +
			"&apiKey=" +
			API_KEY,
		headers: {},
	};

	return axios(config)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
}

app.get("/", (req, res) => {
	res.render("index", { responseData: null });
});

app.get("/recipe", (req, res) => {
	res.render("recipe", { responseData: responseData2 });
});

app.get("/recipes", (req, res) => {
	res.render("recipe-list", { responseData: responseData5 });
});

app.get("/recipe/:name-:id", (req, res) => {
	const { id } = req.params;
	// res.render("recipe", { responseData: responseData4 });
	getRecipeByID(id)
		.then((responseData) => {
			res.render("recipe", { responseData: responseData });
		})
		.catch((error) => {
			console.error(error.message);
		});
});

app.get("/ingredient=:query", (req, res) => {
	const { query } = req.params;
	const limit = 10;
	// res.render("index", { responseData: responseData });

	getRecipe(query, limit)
		.then((responseData) => {
			res.render("index", { responseData: responseData });
		})
		.catch((error) => {
			console.error(error.message);
		});
});

app.post("/", (req, res) => {
	const query = req.body.recipe;
	const limit = req.body.limit;
	// res.render("index", { responseData: responseData5 });
	getRecipe(query, limit)
		.then((responseData) => {
			res.render("index", { responseData: responseData });
		})
		.catch((error) => {
			console.error(error.message);
		});
});

app.listen(port, () => {
	console.log("Server started at port :", port);
});
