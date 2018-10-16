const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) =>{
    res.status(200).json({
       message:'get done'
    });
});

router.post('/',(req, res, next) =>{
    res.status(200).json({
        message:'post done'
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