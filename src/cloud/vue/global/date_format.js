//hh:mm
function HM(timeStamp) {
    const date = new Date(timeStamp)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const zero1 = hours < 10 ? '0' : ''
    const zero2 = minutes < 10 ? '0' : ''
    return `${zero1}${hours}:${zero2}${minutes}`
}

//MM:dd hh:mm
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

//YYYY-MM-dd hh:mm
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

//

export default {
    MDHM,
    HM,
    YMDHM
}