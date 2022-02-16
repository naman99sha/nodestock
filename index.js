//jshint esversion:6
'use strict';

import express from 'express';
import { engine } from 'express-handlebars';

const PORT = process.env.PORT || 5000;
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});



app.listen(PORT, () => console.log("Server started....."))