const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) =>{
    res.status(200).json({
       message:'get done products'
    });
});

router.post('/',(req, res, next) =>{
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message:'post done products',
        createProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
   const id = req.params.productId;
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