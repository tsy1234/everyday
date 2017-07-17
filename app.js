const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./route');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser());

app.get('/', (req, res) => {

    if (req.cookies.user) {
        res.redirect('/index');
    } else {
        res.redirect('/login');
    }

});

app.get('/favicon.ico', (req, res) => {
    res.end();
});

app.get('/index', (req, res) => {
    if (req.cookies.user) {
        res.sendFile(__dirname + '/index.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.post('/checklogin', (req, res) => {
    if (req.body.id === 'taosiyu' && req.body.pass === 'taosiyu8888') {
        res.cookie('user', req.body.user);
        res.redirect('/index');
    } else {
        res.redirect('/login');
    }
});

app.use('/back', router);

app.use((req, res) => {
    res.sendFile(__dirname + '/views/error.html');
});

app.listen(3000, () => {
    console.log('listening in 3000');
});
