const express = require('express');
const app = express();
const port = 3000;
const productRouter = require('./app/product/routes');
const logger = require('morgan');


app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/v1', productRouter);
app.use((req, res, next) => {
    res.status(404); 
    res.send({
        status: 'failed',
        message: 'Resource ' + req.originalUrl + ' Not Found'
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});