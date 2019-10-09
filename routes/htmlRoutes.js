module.exports = function (app) {
	app.get("/", function(req, res) {
		res.render("index");
	});
	app.get("/tags", function (req, res) {
		res.render("tags");
	});
}