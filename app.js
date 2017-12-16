const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./route');

const app = express();

app.use(cookieParser());
app.use(bodyParser());

app.use('/back', router);

app.listen(3000, () => {
    console.log('listening in 3000');
});
