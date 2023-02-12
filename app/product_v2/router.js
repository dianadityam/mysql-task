const router = require('express').Router();
const Product = require('./model');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const db = require('../../config/database');
const sequelize = require('sequelize');
const upload = multer({dest: 'uploads'});

router.get('/product', async (req, res) => {
    const {search} = req.query;
    let productSearch = '';
    if(search) {
        productSearch = await Product.findAll({
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + search.toLowerCase() + '%')
            }
        });
    } else {
        productSearch = await Product.findAll();
    }
    try {
        res.send({
            message: 'Success',
            response: productSearch
        });
    } catch(err) {
        res.send(err);
    }
});

router.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    const products = await Product.findByPk(id);
    try {
        res.send({
            message: 'Success',
            response: products
        });
    } catch(err) {
        res.send(err);
    }
});

router.put('/product/:id', upload.single('image'), async (req, res) => {
    const id = req.params.id;
    const products = await Product.findByPk(id);
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
    }
    try {
        products = await products.update(req.body);
        res.send({
            message: 'Success',
            response: products
        });
    } catch(err) {
        res.send(err);
    }
})

router.post('/product', upload.single('image'), async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
    }
    try {
        await Product.sync();
        const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:${process.env.PORT}/public/${image.originalname}`});
        res.send(result);
    } catch(err) {
        res.send(err);
    }
});

router.delete('/product/:id', async (req, res) => {
    const id = req.params.id;
    const products = await Product.findByPk(id);
    try {
        await products.destroy();
        res.send({
            message: 'This data deleted',
            response: products
        });
    } catch(err) {
        res.send(err);
    }
});

module.exports = router;