var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Utfyllingsskjema' });
});


router.get('/postnr', function(req, res, next) {
    fs.readFile('public/Postnummerregister.csv', (err, data) => {
        console.log(data);
        var city = data.toString();
        res.send(data);
    });
});


module.exports = router;
