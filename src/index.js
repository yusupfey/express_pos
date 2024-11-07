const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Memuat variabel dari .env

const RouteAuth =  require("./routes/auth")
const RouteUser =  require("./routes/users")
const RouteProduct = require("./routes/product")
const RouteSatuan = require("./routes/satuan")
const RouteCategory = require("./routes/category")
const RouteCategoryProduct = require("./routes/category_products")
const RouteSatuanProduct = require("./routes/satuan_products")
const RouteProductStore = require("./routes/product_store")
const RouteOrder = require("./routes/order")
const RouteEntity = require("./routes/entity")
const middlewareLogs =  require("./middleware/log")


const app = express();
// app.use((req,res,next)=>{
//     console.log('request pada path:'+ req.path);
//     next();
    
// })
// penyederhanaan middleware
app.use(middlewareLogs.logs);
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const accessValidation = (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({'metadata':{
            'code':401,
            'message':'Anda memerlukan token!'
        }})
    }

    const token =  authorization.split(' ')[1];
    const secret = process.env.JWT_Secret;
    
    console.log(token);
    console.log(secret);
    
    try {
        const jwtDecode = jwt.verify(token, secret)
        console.log(jwtDecode);
        
    } catch (error) {
        return res.status(401).json({'metadata':{
            'code':401,
            'message':'Unauthorized!'
        }})
    }

    next();
}

app.use('/auth', RouteAuth);

// normal code
app.get("/",(req, res)=>{
    res.json({
        message:'API - GOCIR'
    })
})

app.post("/cek-token",(req, res)=>{
    const token =  req.body.token;
    const secret = process.env.JWT_Secret;
    
    console.log(token);
    console.log(secret);
    
    try {
        const jwtDecode = jwt.verify(token, secret)
        return true;
        
    } catch (error) {
        return res.status(401).json({'metadata':{
            'code':401,
            'message':'Unauthorized!'
        }})
    }

})
app.use('/users', RouteUser);
app.use('/product', accessValidation, RouteProduct);
app.use('/category',accessValidation, RouteCategory);
app.use('/category-product',accessValidation, RouteCategoryProduct);
app.use('/satuan',accessValidation, RouteSatuan);
app.use('/satuan-product',accessValidation, RouteSatuanProduct);
app.use('/product-store',accessValidation, RouteProductStore);
app.use('/entity', accessValidation, RouteEntity);
app.use('/order', accessValidation, RouteOrder);

app.listen(4000, ()=>{
    console.log('server running in port 4000');
})