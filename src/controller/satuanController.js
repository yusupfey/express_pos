const connection = require("../config/connection")
const getAllSatuan = (req, res) =>{
    connection.query("SELECT * FROM satuan", (err, rows)=>{
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
const getAllSatuanByID = (req, res) =>{
    const id = req.params.id 
    connection.query(`SELECT * FROM satuan where id=${id}`, (err, rows)=>{
        if(err){
            res.json({
                metadata:{
                    code:400,
                    message:`Bed Request`
                },
                data:[]
            })
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
const createSatuan = (req, res) =>{
    const name = req.body.name;
    connection.query(`INSERT INTO satuan (name) VALUES (?)`, [name], (err, rows)=>{
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
const updateSatuan = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    
    connection.query(`UPDATE satuan SET name="${name}" WHERE id=${id}`, (err, rows)=>{
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
const deleteSatuan = (req, res) => {
    const id = req.body.id;
    
    connection.query(`Delete FROM satuan WHERE id=${id}`, (err, rows)=>{
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
    getAllSatuan,
    getAllSatuanByID,
    createSatuan,
    updateSatuan,
    deleteSatuan
}