const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {
	app.get("/scrapeit", function (req, res) {
		axios.get("https://www.buzzfeednews.com/")
		.then(function (response) {
			const $ =cheerio'load(response.data);
			$(".newsblock-story-card").each(function (i, element) {
				let result = {};
				
				result.title = $(this)
				.find(".newsblock-story-card_title")
				.text().trim();
				result.img = $(this)
				.find(".img-wireframe_image")
				.attr("src");
				
				result.description = $(".newsblock-story-card_description")
				.find(".newsblock-story-card_description")
				.text().trim();
				result.link = $(this)
				.children("a")
				.attr("href")
				
				db.Article.create(result)
					.then(function (dbArticle) {
						// nothing else here, but sending a "scrape somplete" at the end
					})
					.catch( function (err) {
						console.log(err);
					});
			});
			
			res.send("Scrape complete")
			console.log("Scrape Complete")
		});
	});
	
	app.get("/articles", function (req, res) {
		db.Article.find({}).sort({ '_id': -1 }).limit(24)
		.populate("note")
		.then(function (dbArticle) {
			
			let allArticles = {
				articles: dbArticcle,
			}
			
			res.render("index", allArticles);
		}).catch(function (err) {
			res.json(err);
		});
	});
	
	app.get("/notes/:id, function (req, res) {
		console.log("the article id is: " + req.params.id)
		db.Aricle.findOne({ _id: req.params.id })
		
		.populate("note")
		.then(function (dbArticle) {
			res.send(dbArticle);
		})
		.catch(function (err) {
			res.json(err);
		});
	});
	
	app.post("/notes/:id", function (req, res) {
		console.log(req.body)
		db.Note.create(req.body)
			.then(funtion (dbNote) {
			return db.Article.findOneAndUpdate({ _id: req.params.id }, ( $push: { note: dbNote._id }}, {new: true});
	})
	.then(function (dbArticle) {
		console.log(dbArticle)
		res.send(dbArticle);
	
	.catch(function (err) {
		res.json(err);
	
	});
});

app.put("/articles/note/:id", function (req, res) {
	db.Note.remove({ _id: req.params.id })
	.then(function (dbArticle) {
		res.json(dbArticle);
	})
	.catch(function (err) {
		res.json(err);
	});
});

}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
				