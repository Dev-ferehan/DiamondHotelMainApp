import {StatusCodes} from 'http-status-codes'

export const errorHandler =(err,req,res,next)=>{
    let customError={
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || "something went wrong please try again"
    };
    if(err?.code === 'ER_DUP_ENTRY'){
        customError.statusCode=StatusCodes.BAD_REQUEST,
        customError.msg="duplicate value entered in unique field"
    }
return res.status(customError.statusCode).json({
    msg:customError.msg
})

}