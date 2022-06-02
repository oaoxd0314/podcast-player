const API_HOST = 'http://localhost:90'

export function fetchAPI(endpoint='',param={}){
    const payload = {
        headers: new Headers({
            "content-type": "application/json",
            "Access-Control-Allow-Origin" : "localhost", 
            "Access-Control-Allow-Credentials" : true 
        }) ,
        body: JSON.stringify(param),
        method: "POST",
        mode: "cors",
    }
    try {
        return new Promise(async (resolve,reject)=>{
            fetch(API_HOST+endpoint,payload).then(response=>{
                if(response.ok){
                    response.json().then(res=>{
                        let resData = callBackHandler(res,response)
                        resolve(resData)
                    })
                }
            }).catch(err=>{
                let errData = callBackHandler(err.response.data,{status:400})
                reject(errData);
            })
        }) 
    } catch (error) {
        console.log(error)
        return callBackHandler(error.response.data,{status:500})
        // throw new Error(error.response.data)
    }
    
}


export function mutliFetch(){

}


function callBackHandler(data,res){
    return {
        status: res.status,
        data:data
    }
}