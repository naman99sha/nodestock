//jshint esversion:6
'use strict';
// pk_3f83a57b74674152865e2f4a1534ab2a
import express from 'express';
import { engine } from 'express-handlebars';
import request from 'request';


function call_api(finishedAPI){
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_3f83a57b74674152865e2f4a1534ab2a', {json: true}, (err, res, body) => {
        if (err) {return console.log(err)}
        if (res.statusCode === 200) {finishedAPI(body);}  
    })
}



const PORT = process.env.PORT || 8080;
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    })
});

/*
app.post('/', (req, res) => {

})
*/
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(PORT, () => console.log("Server started....."))