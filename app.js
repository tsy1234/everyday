const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./route');

const app = express();
// app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser());

app.get('/index', (req, res) => {
    if (req.cookies.userName) {
        res.sendFile(__dirname + '/index.html');
    } else {
        res.redirect('/login');
    }
});

app.use('/back', router);

app.listen(3000, () => {
    console.log('listening in 3000');
});
