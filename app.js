const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes =  require('./api/routes/user');
const cors = require('cors');
const nocache = require('nocache');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
 app.use(nocache());
app.use(cors(corsOptions));
mongoose.connect('mongodb://gagajanik:'+process.env.mongo_atlass_passwd+'@cluster0-shard-00-00-wcuj9.mongodb.net:27017,cluster0-shard-00-01-wcuj9.mongodb.net:27017,cluster0-shard-00-02-wcuj9.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    { useNewUrlParser: true } );
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
       error: {
           message: error.message
       }
    });
});

module.exports = app;