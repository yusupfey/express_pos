const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router()
const connection = require('../config/connection')
const generateuid = require('uuid')
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Memuat variabel dari .env

router.post('/register', async (req, res)=>{
    const uuid = generateuid.v4(36);
    const {full_name, email, username} = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    connection.query(`INSERT INTO persons (uuid,name,email) VALUES (?,?,?)`, [uuid, full_name, email],(err, row)=>{
        if(err) throw err;
        connection.query(`INSERT INTO users (uuid,username,email, password) VALUES (?,?,?,?)`, [uuid, username, email, password],(err, row)=>{
            if(err) throw err;
            res.json({
                'metadata':{
                    'code':201,
                    'message':'Berhasil membuat akun'
                },
            })
        });
        
    
    })
    
    
})

router.post('/login',  (req, res) =>{
    let {email, password} = req.body

    connection.query(`SELECT * FROM users WHERE username='${email}'`, async (err, rows)=>{
        console.log(rows);
        if(rows.length === 0) {
            res.json({
                'metadata':{
                    'code':401,
                    'message':'Username tidak terdaftar'
                }
            });
        }else{
            const user = rows[0];
            
            let isPasswordInvalid = await bcrypt.compare(password,user.password);
            
            if(!isPasswordInvalid) {
                return res.json({
                    'metadata':{
                        'code':401,
                        'message':'Password tidak sesuai'
                    }
                });
            }
        
            let screet = process.env.JWT_Secret;
            let expired = 60*60*1;
            let token = jwt.sign(user,screet,{expiresIn:expired})
            res.json({
                'metadata':{
                    'code':200,
                    'message':'Berhasil'
                },
                'token':token
            })
        }
    });
})

module.exports = router;