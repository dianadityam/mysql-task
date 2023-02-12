const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const productRouter = require('./app/product/routes');
const productRouterV2 = require('./app/product_v2/router');
const path = require('path');
const logger = require('morgan');


app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);
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