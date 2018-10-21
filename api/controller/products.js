const  mongoose = require('mongoose');
const Product = require('../moduls/products');
exports.products_get = (req, res, next) =>{
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json(doc);
            } else { res.status(404).json({"message": "id is wrong"})}
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
}

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log(doc);
            const result = {
                count: doc.length,
                products: doc.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://192.168.0.101:3000/products/'+ doc._id
                        }
                    }
                })
            }
            if(doc) {
                res.status(200).json(result);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
}

exports.create_product = (req, res, next) =>{
    /*  const product = {
          name: req.body.name,
          price: req.body.price
      };*/
    const  product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message:'post done products',
            createProduct: product
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    });

}

exports.update_product = (req, res, next) =>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({"_id": id}, {$set : updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
}

exports.delete_product = (req, res, next) =>{
    const id = req.params.productId;
    Product.remove({"_id": id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
}

exports.check_product =  (req, res, next) => {
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
}