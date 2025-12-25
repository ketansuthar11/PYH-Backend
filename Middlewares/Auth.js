const jwt = require('jsonwebtoken');

const ensureAuthorized = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403).json({message:"Unauthorized, JWT token is required."});
    }
    try{
        const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(403).json({message:"Unauthorized, JWT token is wrong or exprired."});
    }
}

module.exports=ensureAuthorized;