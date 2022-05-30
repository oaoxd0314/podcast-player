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

export function secFormater(second){
    const hours = Math.floor((second % 86400) / 3600);
    const minutes = Math.floor(((second % 86400) % 3600) / 60);

    return hours > 0 ? `${hours}小時 ${minutes}分鍾` : `${minutes}分鍾`
}