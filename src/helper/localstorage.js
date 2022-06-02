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

export function initEpStorage(){
    const epMap = new Map()
    setStorage('epStatus',epMap)
}

// ep status by guid
export function getEpStatus(guid){
    let epMap = getStorage('epStatus')
    let epStatus = {}
    
    if(epMap.has(guid)) epStatus = epMap.get(guid)
    return epStatus
}

export function setEpStatus(guid,data){
    let epMap = getStorage('epStatus')
    epMap.set(guid,data)

    setStorage('epStatus',epMap)
}

//ep curr time
export function getStorageCurrTime(guid){
    let epStatus = getEpStatus(guid)
    return ('currTime' in epStatus) ? epStatus.currTime : 0
}

export function setStorageCurrTime(guid,currTime){
    let epStatus = getEpStatus(guid)
    epStatus.currTime = currTime
    setEpStatus(guid,epStatus)
}
