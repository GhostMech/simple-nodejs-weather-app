const express = require('express');
const request = require('request');
const fs      = require('fs');
const apiKey  = fs.readFileSync('./apiKey.txt', 'utf8');
const app     = express();

app.get('/weather', (req, res) => {
    let city = req.query.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, (err, data, body) => {
        if (err) {
            throw err;
        }
        let weather = JSON.parse(body);
        console.log(`${weather.name}: ${weather.main.temp}`);
        let roundedTemp = Math.round(weather.main.temp);
        res.send(`The weather in ${city} is ${roundedTemp}`);
    });

}).listen(3000);