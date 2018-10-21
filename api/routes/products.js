const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleWare/check-auth');
const Product = require('../moduls/products');
const ProductController = require('../controller/products');

router.get('/:productId', ProductController.products_get);
router.post('/', checkAuth, ProductController.create_product);
router.patch('/:productId',ProductController.update_product);
router.delete('/:productId',ProductController.delete_product);
router.get('/:productId', ProductController.check_product);
router.get('/', ProductController.products_get_all);

module.exports = router;