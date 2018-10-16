const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) =>{
    res.status(200).json({
        message:'get done from orders'
    });
});

router.post('/',(req, res, next) =>{
    const order = {
        orderId: req.body.productId,
        price: req.body.quantity
    };
    res.status(201).json({
        message:'post done from orders',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id === 'xo') {
        res.status(200).json({
            message: 'eg ari',
            id: id
        });
    } else { res.status(200).json({
        message: 'arasworia',
        id: id
    }); }
});

module.exports = router;