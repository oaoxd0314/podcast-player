import axios from 'axios';

function requestHandler(response){

}

export function fetchAPI(url='',param={}){
    return new Promise((resolve,reject)=>{
        try {
            axios.get(url,param).then(response=>{
                if(response.status !== 200){
                    reject(response)
                }

                resolve(response)
                
            }).catch(err=>{
                reject(err)
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    }) 
}


export function mutliFetch(){

}