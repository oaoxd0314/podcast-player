const numberToWeekDay = {
    0:'星期日',
    1:'星期一',
    2:'星期二',
    3:'星期三',
    4:'星期四',
    5:'星期五',
    6:'星期六',
}

export function toYYYYMMDD(date){
    let nowDate = new Date(date)

    if(isLessThanWeek(nowDate)){
        return numberToWeekDay[nowDate.getDay()]
    }

    // return `${coverTen(nowDate.getMonth()+1)}月${coverTen(nowDate.getDate())}日`
    return `${nowDate.getMonth()+1}月${nowDate.getDate()}日`
}


function coverTen(number){
    return number > 9 ? number : '0'+number
}


function isLessThanWeek(date){
    let nowTime = new Date().getTime()
    let dateTime = date.getTime()
    let aWeek = 7 * 24 * 60 * 60 * 1000
    
    return (nowTime - dateTime) < aWeek
}

function timeMapper(second,type){
    const transferMap ={
        days : Math.floor(second / 86400),
        hours : Math.floor((second % 86400) / 3600),
        minutes : Math.floor(((second % 86400) % 3600) / 60),
        seconds: Math.floor(((second % 86400) % 3600) % 60),
    } 

    return transferMap[type]
}

export function secFormateStr(second){
    const hours = timeMapper(second,'hours')
    const minutes = timeMapper(second,'minutes')

    return hours > 0 ? `${hours}小時 ${minutes}分鍾` : `${minutes}分鍾`
}

export function secFormateTime(second){
    const hours = coverTen(timeMapper(second,'hours'))
    const minutes = coverTen(timeMapper(second,'minutes'))
    const seconds = coverTen(timeMapper(second,'seconds'))

    return parseInt(hours) > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}