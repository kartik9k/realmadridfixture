var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    url = 'https://www.realmadrid.com/en/football/schedule';
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var next_date, venue, home_team, away_team;
            var json = { next_date : "", venue : "", home_team : "", away_team : ""};

            $('.m_highlighted_next_game_header').filter(function(){
	            var data = $(this);	
	            next_date = data.children().first().next().children().first().next().next().text();
	            json.next_date = next_date;
	            console.log(next_date);
            })

            $('.m_highlighted_next_game_location').filter(function(){
	            var data = $(this);	
	            venue = data.text();
	            json.venue = venue;
	            console.log(venue);
            })

            $('.m_highlighted_next_game_team').filter(function(){
	            var data = $(this);	
	            home_team = data.text().slice(6, data.text().length - 2);
	            json.home_team = home_team;
	            console.log(home_team);
            })

            $('.m_highlighted_next_game_team m_highlighted_next_game_second_team').filter(function(){
	            var data = $(this);	
	            away_team = data.text().slice(6, data.text().length - 2);
	            // away_team = data.text();
	            json.away_team = away_team;
	            console.log(away_team);
            })
        }
    })
})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;