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
    connection.query(`SELECT category.*, category_product.* FROM category_product inner join category on category.id=category_product.id_category where category_product.id_product=${id}`, (err, rows)=>{
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
    const id_category = req.body.id_category;
    const id_product = req.body.id_product;
    const uuid_entity = 'd823c2f0-ef98-433a-8fea-b7001ed4a323'
    connection.query(`INSERT INTO category_product (id_category, id_product, uuid_entity) VALUES (${id_category},${id_product},'${uuid_entity}')`, (err, rows)=>{
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