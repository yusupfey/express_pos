const connection = require("../config/connection")
const generateuid = require('uuid');
const getAll = (req, res) =>{
    connection.query("SELECT * FROM entity", (err, rows)=>{
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
    connection.query(`SELECT * FROM entity where uuid="${id}"`, (err, rows)=>{
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
    const uuid = generateuid.v4(36)
    const name = req.body.name;
    const owner = req.body.owner;
    const address = req.body.address;
    const nohp = req.body.nohp;
    const deskripsi = req.body.deskripsi;
    const latlong = req.body.latlong;
    const value = [uuid,name,address,owner,nohp,deskripsi,latlong];
    connection.query(`INSERT INTO entity 
        (uuid ,name, address, owner, nohp, deskripsi, latlong) 
        VALUES 
        (?,?,?,?,?,?,?)`, value, (err, rows)=>{
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
    const owner = req.body.owner;
    const address = req.body.address;
    const nohp = req.body.nohp;
    const deskripsi = req.body.deskripsi;
    const latlong = req.body.latlong;
    
    connection.query(`UPDATE entity SET name ="${name}", address ="${address}", owner ="${owner}", nohp ="${nohp}", deskripsi ="${deskripsi}", latlong="${latlong}" WHERE uuid="${id}"`, (err, rows)=>{
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
    
    connection.query(`Delete FROM entity WHERE uuid="${id}"`, (err, rows)=>{
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