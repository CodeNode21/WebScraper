// Dependencies
// Cheerio for parsing HTML page
const cheerio = require("cheerio");
// Axios to make HTTP request for HTML page
const axios = require("axios");

console.log(`
***************************************************

Grabbing business info from Yelp or yellowpages.com

****************************************************
`);
var searchTerm = "butcher";
var zipCode = "11211";

// Making a request from yellowbook.com
axios.get("https://www.yellowbook.com/s/" + searchTerm + "/" + zipCode)
    .then(function(response) {
        var $ = cheerio.load(response.data);

        var results = [];

        $(".c .listing-info").each(function(i, element) {
            var title = $(element).find(".info").find("h2").text();
            var website = $(element).find(".s_website").attr("href");
            
            var address = $(element).find(".address").text();

            var contact = $(element).find(".phone-number").text();


            results.push({
                name: title,
                url: website,
                address: address,
                phoneNumber: contact
            });
        });
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

