const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const productsRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Unrestricted Access-Control-Allow-Methods
app.use((req, res, next) =>{
    req.headers('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// Restrict Access-Control-Allow-Methods
// app.use((req, res, next) =>{
//     req.header('Access-Control-Allow-Origin', 'https://www.googleapis.com/auth/');
// });

// app.use(express.json());



// Routes which should  handle requests
app.use('/products', productsRoutes);
app.use('/orders', orderRoutes);


app.use((req, res, next) => { 
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
        message: error.message
        }
    });
});

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It Works'
//     });
// });

module.exports = app;