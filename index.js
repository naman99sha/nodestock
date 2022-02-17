//jshint esversion:6
'use strict';
// pk_3f83a57b74674152865e2f4a1534ab2a
import express from 'express';
import { engine } from 'express-handlebars';
import request from 'request';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));


function call_api(tc, finishedAPI){
    request('https://cloud.iexapis.com/stable/stock/'+tc+'/quote?token=pk_3f83a57b74674152865e2f4a1534ab2a', {json: true}, (err, res, body) => {
        if (err) {return console.log(err)}
        if (res.statusCode === 200) {finishedAPI(body);}  
    })
}

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
        res.render('home',{
            home: true
        });
});


app.post('/', (req, res) => {
    var ticker = req.body.ticker;
    call_api(ticker, function(doneAPI) {
        res.render('home', {
            home: false,
            stock: doneAPI
        });
    })
})

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(PORT, () => console.log("Server started....."))