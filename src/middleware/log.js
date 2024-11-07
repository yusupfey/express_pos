const logs =(req,res,next)=>{
    console.log('request pada path:'+ req.path);
    next();
    
}

module.exports = {
    logs
}