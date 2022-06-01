import {parseMapToJson,reverseJsonToMap} from './formate'

// localstorage CRUD
export function setStorage(target,value){
    localStorage.setItem(target,parseMapToJson(value))
}

export function getStorage(target){
    return reverseJsonToMap(localStorage.getItem(target))
}

export function deleteStorage(target){
    localStorage.removeItem(target)
}

// ep status
export function initEpStorage(){
    const epMap = new Map()
    setStorage('epStatus',epMap)
}

export function getEpStatus(guid){
    let epMap = getStorage('epStatus')
    let epStatus = {}
    
    if(epMap.has(guid)) epStatus = epMap.get(guid)

    return epStatus
}

export function setEpStatus(guid,currTime){
    let epMap = getStorage('epStatus')
    epMap.set(guid,{currTime})

    setStorage('epStatus',epMap)
}

