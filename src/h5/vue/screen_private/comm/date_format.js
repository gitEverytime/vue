function HM(timeStamp) {
    const date = new Date(timeStamp)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const zero1 = hours < 10 ? '0' : ''
    const zero2 = minutes < 10 ? '0' : ''
    return `${zero1}${hours}:${zero2}${minutes}`
}

function HMS(timeStamp) {
    const date = new Date(timeStamp)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds();
    const zero1 = hours < 10 ? '0' : ''
    const zero2 = minutes < 10 ? '0' : ''
    const zero3 = seconds < 10 ? '0' : ''
    return `${zero1}${hours}:${zero2}${minutes}:${zero3}${seconds}`
}

function MDHM(timeStamp) {
    const date = new Date(timeStamp)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const zero1 = month < 10 ? '0' : ''
    const zero2 = day < 10 ? '0' : ''
    const zero3 = hours < 10 ? '0' : ''
    const zero4 = minutes < 10 ? '0' : ''
    return `${zero1}${month}-${zero2}${day} ${zero3}${hours}:${zero4}${minutes}`
}

function YMD(timeStamp) {
    const date = new Date(timeStamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const zero1 = month < 10 ? '0' : ''
    const zero2 = day < 10 ? '0' : ''
    return `${year}-${zero1}${month}-${zero2}${day}`
}

function YMDHMS(timeStamp) {
    const date = new Date(timeStamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds();
    const zero1 = month < 10 ? '0' : ''
    const zero2 = day < 10 ? '0' : ''
    const zero3 = hours < 10 ? '0' : ''
    const zero4 = minutes < 10 ? '0' : ''
    const zero5 = seconds < 10 ? '0' : ''
    return `${year}-${zero1}${month}-${zero2}${day} ${zero3}${hours}:${zero4}${minutes}:${zero5}${seconds}`
}

function YMDTHMS(timeStamp) {
    const date = new Date(timeStamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds();
    const zero1 = month < 10 ? '0' : ''
    const zero2 = day < 10 ? '0' : ''
    const zero3 = hours < 10 ? '0' : ''
    const zero4 = minutes < 10 ? '0' : ''
    const zero5 = seconds < 10 ? '0' : ''
    return `${year}-${zero1}${month}-${zero2}${day}T${zero3}${hours}:${zero4}${minutes}:${zero5}${seconds}`
}

function YMDHM(timeStamp) {
    const date = new Date(timeStamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const zero1 = month < 10 ? '0' : ''
    const zero2 = day < 10 ? '0' : ''
    const zero3 = hours < 10 ? '0' : ''
    const zero4 = minutes < 10 ? '0' : ''
    return `${year}-${zero1}${month}-${zero2}${day} ${zero3}${hours}:${zero4}${minutes}`
}

function Intelligence(timeStamp) {
    const date = new Date(timeStamp)
    const week = '日一二三四五六'
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    const offset = date.getTime() - today.getTime()
    if (offset >= 0 && offset <= 1000 * 60 * 60 * 24) {
        return HMS(timeStamp)
    } else if (offset <= 0 && offset >= -1000 * 60 * 60 * 24) {
        return '昨天'
    } else if (offset <= -1000 * 60 * 60 * 24 && offset >= -6 * 1000 * 60 * 60 * 24) {
        return `周${week.charAt(date.getDay())}`
    }
    const zero = date.getDate() < 10 ? '0' : ''
    const zero1 = date.getMonth() + 1 < 10 ? '0' : ''
    return `${date.getFullYear()}-${zero1}${date.getMonth() + 1}-${zero}${date.getDate()}`
}

export default {
    MDHM,
    HM,
    HMS,
    YMD,
    YMDHMS,
    YMDHM,
    Intelligence,
    YMDTHMS,
}