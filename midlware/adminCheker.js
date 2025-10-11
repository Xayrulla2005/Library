import jwt from "jsonwebtoken"

 export default function (req,res,next){
try{
const token = req.headers.authorization

if (!token) {
    return res.status(401).json({
        message:"Token not founded"
    })
}

const bearer=token.split(" ")[0]
const acses_token=token.split(" ")[1]

if (bearer!=="Bearer" || !acses_token) {
    return res.status(401).json({
        message:"Bearer not founded"
    })
}

const decode=jwt.verify(acses_token,process.env.SECRET_KEY)
next()

}catch(error){
   return res.status(401).json({
    message: error.message
   })
    
}
}