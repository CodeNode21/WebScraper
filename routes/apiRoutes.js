// Dependencies
const db = require("../models");
// Cheerio for parsing HTML page
const cheerio = require("cheerio");
// Axios to make HTTP request for HTML page
const axios = require("axios");

console.log(`
***************************************************

Grabbing business info from Yelp or yellowpages.com

****************************************************
`);
var searchTerm = "bakery";
var zipCode = "11222";
module.exports = function(app) {
    app.get("/scrapeit", function (req, res){
        // Making a request from yellowbook.com
        axios.get("https://www.yellowbook.com/s/" + searchTerm + "/" + zipCode)
            .then(function(response) {
                var $ = cheerio.load(response.data);

                var results = [];

                $(".c .listing-info").each(function(i, element) {
                    var title = $(element).find(".info").find("h2").text().trim();
                    var website = $(element).find(".s_website").attr("href");
                    
                    var address = $(element).find(".address").text();

                    var contact = $(element).find(".phone-number").text();


                    results.push({
                        name: title,
                        url: website,
                        address: address,
                        phoneNumber: contact
                    });
                    db.Business.create(results)
                    .then(function (dbBusiness) {

                    })
                    .catch( function (err) {
                        console.log(err)
                    })
                });
                res.send("Scrape complete")
                console.log(results);
            })

        // Making a request from Yelp.com
        // axios.get("https://www.yelp.com/search?find_desc=" + searchTerm + "&find_loc=" + zipCode + "&ns=1")
        //     .then(function(response) {
        //         var $ = cheerio.load(response.data);

        //         var results = [];

        //         $("h3").each(function(i, element) {
        //             var title = $(element).text();
                
        //             var link = $(element).children().attr("href");

        //             results.push({
        //                 title: title,
        //                 link: link
        //             });
        //         });
        //         console.log(results);
        //     });
    })
    app.get("/Business" , function (req, res) {
        db.Business.find({}).sort({ '_id': -1 }).limit(24)
        .populate("note")
        .then(function (dbBusiness) {

            let allBusinesses = {
                businesses: dbBusiness,
            }
            res.render("index", allBusinesses);
        }).catch(function (err) {
            res.json(err);
        });
    });
    app.get("/tags/:id", function (req, res) {
        console.log("The tag id is: " + req.params.id)
        db.Business.findOne({ _id: req.params.id })

        .populate("tags")
        .then(function (dbBusiness) {
            res.send(dbBusiness);
        })
        .catch(function (err) {
            res.json(err);
        });
    });
    app.post("/tags/:id", function (req, res) {
        console.log(req.body)
        db.Tags.create(req.body)
            .then(function (dbTags) {
                return db.Business.findOneAndUpdate({ _id: req.params.id }, { $push: { tag: dbTags._id }}, {new: true});
            })
    })
    app.put("/business/tags/:id", function (req,res) {
        db.Tags.remove({ _id: req.params.id })
        .then(function (dbBusiness) {
            res.json(dbBusiness);
        })
        .catch(function (err) {
            res.json(err);
        })
    })
}
