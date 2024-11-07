const connection = require("../config/connection")
const getAll = (req, res) =>{
    connection.query("SELECT * FROM category", (err, rows)=>{
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
    const id = req.params.id 
    connection.query(`SELECT * FROM category where id=${id}`, (err, rows)=>{
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
const create = (req, res) =>{
    const name = req.body.name;
    connection.query(`INSERT INTO category (name) VALUES ('${name}')`, (err, rows)=>{
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
    getByID,
    create,
    update,
    remove
}