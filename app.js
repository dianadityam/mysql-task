const express = require('express');
const app = express();
const router = require('./routes.js');
const multer = require('multer');
const upload = multer({dest: './upload'});
const log = require ('./middlewares/logger');
const port = 3000;

app.use(log);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);
app.use((req, res, next) => {
    res.status(404); 
    res.send({
        status: 'failed',
        message: 'Resource ' + req.originalUrl + ' Not Found'
    });
});

app.listen(port,() => {
    console.log(`App listening on port ${port}`);
});