import install  from '../services/installService.js'
const installController=async (req,res)=>{
    console.log("kiosalki from controller ")
const installMessage=await install();
console.log(installMessage)
if(installMessage.status==200){
    res.status(200).json({
        result:installMessage
    })
}else{
    res.status(500).json({
        result:installMessage
    })
}
}
export default installController