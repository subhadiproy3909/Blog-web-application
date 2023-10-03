require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const connectdb = require('./server/dbconn/config');
const MongoStore = require('connect-mongo');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 5000;

connectdb();

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    }),
    // cookie: { maxAge: new Date ( Date.now() + (3600000))}
}))

app.use(methodOverride('_method'));

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routers/main'));
app.use('/', require('./server/routers/admin'));


app.listen(PORT, () =>{
    console.log(`running on ${PORT}`);
})
