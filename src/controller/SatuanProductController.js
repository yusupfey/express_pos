const connection = require("../config/connection")
const getAll = (req, res) =>{
    connection.query("SELECT * FROM category_product", (err, rows)=>{
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
const getByIDProduct = (req, res) =>{
    const id = req.params.id 
    connection.query(`SELECT satuan.*, satuan_product.* FROM satuan_product inner join satuan on satuan.id=satuan_product.id_satuan where satuan_product.id_product=${id}`, (err, rows)=>{
        if(err){
            res.json({
                metadata:{
                    code:400,
                    message:`Bed Request`
                },
                data:[]
            })
        }else{
            res.json({
                metadata:{
                    code:200,
                    message:'berhasil'
                },
                data:rows
            })
        }
    })
}
const create = (req, res) =>{
    const id_satuan = req.body.id_satuan;
    const id_product = req.body.id_product;
    const konversi = req.body.konversi;
    const uuid_entity = 'd823c2f0-ef98-433a-8fea-b7001ed4a323'
    connection.query(`INSERT INTO satuan_product (id_satuan, id_product, konversi_to_small, uuid_entity) VALUES (?,?,?,?)`, [id_satuan,id_product,konversi,uuid_entity], (err, rows)=>{
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
    const id = req.params.id;
    const name = req.body.name;
    
    connection.query(`UPDATE category SET name="${name}" WHERE id=${id}`, (err, rows)=>{
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
    const id = req.body.id;
    
    connection.query(`Delete FROM category WHERE id=${id}`, (err, rows)=>{
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

module.exports = {
    getAll,
    getByIDProduct,
    create,
    update,
    remove
}