const connection = require("../config/connection")
const generateuid = require('uuid');
const { getDateToday, getDateTimeToday } = require("../utils/formatDate");


const create = (req, res) =>{
    const uuid = generateuid.v4(36)
    const customer_id = null;
    const name = null;
    const tanggal = getDateToday();
    const total = req.body.total;
    const diskon = 0;
    const bayar = req.body.bayar;
    const kembalian = req.body.kembalian;
    const indate = getDateTimeToday();
    const detail = req.body.cart;
    const value = [`'${uuid}' ,${customer_id}, '${tanggal}', ${total}, ${diskon}, ${bayar}, ${kembalian}, '${indate}'`];
    // let detailStore=[];
    // detail.forEach(val => {
    //     detailStore = []
    //     detailStore.push(val.id, val.title, val.qty, val.price, val.totalItem)
    // });
    // res.json({
    //             metadata:{
    //                 code:201,
    //                 message:detailStore
    //             }
    //         })
    let id = 0;
    connection.query(`INSERT INTO orders
        (uuid ,customer_id, tanggal, total, diskon, bayar, kembalian, in_date) 
        VALUES 
        (${value})`, (err, rows)=>{
        if(err){
            console.log(err);
        }
        // const lastInsertedId = result.insertId;

        id=rows.insertId;
    })

    // insert detail
    let detailStore=[];
    detail.forEach(val => {
        detailStore =[];
        detailStore.push(`'${uuid}'`, val.id, val.title, val.qty, val.price, val.totalItem, `'${indate}'`)
        connection.query(`INSERT INTO orders_d 
            (uuid_order, item_id ,item_name, qty, harga, jumlah, in_date) 
            VALUES 
            (${detailStore})`, (err, rows)=>{
            if(err){
                console.log(err);
            }
        })
    });
    res.json({
        metadata:{
            code:201,
            message:'berhasil',
            uuid:id
        }
    })
}
module.exports ={
    create
}
