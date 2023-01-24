const express = require('express');
const path = require('path');
var request = require('request');
const app = express();
const api = 'https://pro-api.coinmarketcap.com';

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

app.get('/api/*', function(req,res) {
    var newurl = api + req.url.slice(4);
    var options = {
        url: newurl,
        headers: {
            'X-Forwarded-For': req.headers['x-forwarded-for'],
            'X-Real-IP': req.headers['x-real-ip'],
            'X-CMC_PRO_API_KEY': '0f18e676-e4b7-4e71-8fd0-32a77ef5ab5d'
        }
    };
    request(options).pipe(res);
});

app.use(express.static('public'));
app.listen(process.env.PORT || 3000);

module.exports = app;