import jwt from "jsonwebtoken";
const JWT_SECRET=process.env.JWT_SECRET

if(!JWT_SECRET){
    throw new Error("JWT SECRETE environment variable is required")
}
export const authenticatedUser=(req,res,next)=>{
    const authHeader=req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Error("Authentication Invalid")
    }
const token=authHeader.split(' ')[1];
try{
    const payload= jwt.verify(token,JWT_SECRET)
  
    req.user={
        id:payload.id,
        email:payload.email,
        role:payload.role
 
}
next()
}catch(error){
    throw new Error("Authentication Invalid")   }
}