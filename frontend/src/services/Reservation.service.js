export const addGuest= async (formData)=>{
    const url="http://localhost:8000/api/admin/reservation/add-guest";
const reqOptions={
    method:"POST",
    body:JSON.stringify(formData),
    headers:{
        "Content-Type":"application/json"
    }
}
return fetch(url,reqOptions)
.then(res=>res.json())
.then(data=>data)
.catch(err=>err)

}

export const getGuest= async ()=>{
    const url="http://localhost:8000/api/admin/reservation/get-guest-info";
const reqOptions={
    method:"GET",
    body:JSON.stringify(),
    headers:{
        "Content-Type":"application/json"
    }
}
return fetch(url,reqOptions)
.then(res=>res.json())
.then(data=>data)
.catch(err=>err)    
}


