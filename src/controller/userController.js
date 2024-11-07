const connection =  require('../config/connection')
const getAllUser = (req, res)=>{
    // console.log(req.body);
    connection.query('SELECT * FROM persons', (err, rows)=>{
      
        if(err){
            res.json({
                metadata:{
                    code:400,
                    message:'Query error'
                }
            })
        }
        res.json({
            metadata:{
                code:200,
                message:'Berhasil'
            },
            data:rows
        })
    });
}


const CreateUser = (req, res)=>{
    
}
const UpdateUser = (req, res)=>{
    console.log(req.body);
    const idUser = req.params
    console.log(idUser);
    res.json({
        message:'update Berhasil',
        
    })
}

module.exports = {
    getAllUser,
    CreateUser,
    UpdateUser
}