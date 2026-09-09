import {addGuestService,getGuestService} from '../services/reservationService.js'
export  const addGuestController=async(req,res)=>{
    const result=await addGuestService(req.body)
    res.status(200).json(result)
}

export  const getGuestController=async(req,res)=>{
    const result=await getGuestService(req.body)
    res.status(200).json(result)
}

