module.exports = function (app) {
	app.get("/", function(req, res) {
		res.render("index");
	});
	app.get("/notes", function (req, res) {
		res.render("notes");
	});
}