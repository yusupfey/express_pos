const connection = require("../config/connection")
const generateuid = require('uuid');
const getAll = (req, res) =>{
    connection.query("SELECT * FROM product", (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:200,
                message:'berhasil'
            },
            data:rows
        })
    })
}
const getByID = (req, res) =>{
    const id = req.params.uuid 
    connection.query(`SELECT * FROM product where uuid="${id}"`, (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:200,
                message:`SELECT * FROM product where uuid="${id}"`
            },
            data:rows[0]
        })
    })
}

const create = (req, res) =>{
    const uuid = generateuid.v4(36)
    const name = req.body.name;
    const barcode = req.body.barcode;
    const deskripsi = req.body.deskripsi;
    const pic = 'http://localhost:4000/noimage.webp';
    // const value = [uuid ,name, barcode, deskripsi, pic];
    connection.query(`INSERT INTO product 
        (uuid ,name, barcode, deskripsi, pic) 
        VALUES 
        ('${uuid}' ,'${name}', '${barcode}', '${deskripsi}', '${pic}')`, (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:201,
                message:'berhasil'
            }
        })
    })
}
const update = (req, res) => {
    const id = req.params.uuid;
    const name = req.body.name;
    const barcode = req.body.barcode;
    const deskripsi = req.body.deskripsi;
    
    connection.query(`UPDATE product SET name ="${name}", barcode ="${barcode}", deskripsi ="${deskripsi}" WHERE uuid="${id}"`, (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:200,
                message:'update berhasil'
            }
        })
    })
}
const remove = (req, res) => {
    const id = req.body.uuid;
    
    connection.query(`Delete FROM product WHERE uuid="${id}"`, (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:200,
                message:'Delete berhasil'
            }
        })
    })
}

// product store
const getAllProductStore = (req, res) =>{
    connection.query("SELECT product.*, product_store.id as id_D, product_store.harga_jual, product_store.harga_beli, product_store.uuid_product FROM product inner join product_store on product.uuid=product_store.uuid_product", (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:200,
                message:'berhasil'
            },
            data:rows
        })
    })
}
const getProductStoreByID = (req, res) =>{
    const id = req.params.uuid 
    connection.query(`SELECT * FROM product_store where uuid_product="${id}"`, (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:200,
                message:`SELECT * FROM product_store where uuid_product="${id}"`
            },
            data:rows[0]
        })
    })
}
const getByIDCategory = (req, res) =>{
    const id = req.params.id 
    connection.query(`SELECT ps.*, p.* FROM category_product cp inner join product p on cp.id_product=p.id inner join product_store ps on p.uuid=ps.uuid_product  where cp.id_category="${id}"`, (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:200,
                message:`SELECT * FROM category_product cp inner join product p on cp.id_product=p.id inner join product_store ps on p.uuid=ps.uuid_product  where cp.id_category="${id}"`
            },
            data:rows
        })
    })
}
const getByNameAndCategory = (req, res) =>{
    const {search, category} = req.body; 
    console.log(search);
    console.log(category);
    
    let exec = `SELECT ps.*, p.* FROM product p inner join product_store ps on p.uuid=ps.uuid_product where p.name like '%${search}%'`;
    if(category!=''){
        exec = `SELECT ps.*, p.* FROM category_product cp inner join product p on cp.id_product=p.id inner join product_store ps on p.uuid=ps.uuid_product where cp.id_category="${category}" and p.name like '%${search}%'`;
    }
    
    connection.query(`${exec} `, (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:200,
                message:`${exec}`
            },
            data:rows
        })
    })
}
const getByBarcode = (req, res) =>{
    const {barcode} = req.body; 
    
    let exec = `SELECT ps.*, p.* FROM product p inner join product_store ps on p.uuid=ps.uuid_product where p.barcode='${barcode}'`;
    
    
    connection.query(`${exec} `, (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:200,
                message:`${exec}`
            },
            data:rows
        })
    })
}
const createProductStore = (req, res)=>{
    const uuid_product =  req.body.uuid_product
    const stock = req.body.stock;
    const min = req.body.min;
    const max = req.body.max;
    const harga_beli = req.body.harga_beli;
    const harga_jual = req.body.harga_jual;
    const uuid_entity = 'd823c2f0-ef98-433a-8fea-b7001ed4a323'
    const value = [`'${uuid_product}',${stock},${min}, ${max}, ${harga_jual}, ${harga_beli}, '${uuid_entity}'`];
    connection.query(`INSERT INTO product_store 
        (uuid_product, stock ,min, max, harga_jual, harga_beli, uuid_store) 
        VALUES 
        (${value})`, (err, rows)=>{
        if(err){
            console.log(err);
        }
        res.json({
            metadata:{
                code:201,
                message:'berhasil'
            }
        })
    })
}
module.exports = {
    getAll,
    getByID,
    create,
    update,
    remove,
    getAllProductStore,
    getProductStoreByID,
    createProductStore,
    getByIDCategory,
    getByNameAndCategory,
    getByBarcode
}