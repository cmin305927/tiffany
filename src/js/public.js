function move(ele, target, fn){
    let count = 0
    for(let key in target){
        count ++
        let timer = setInterval(() => {
            let current
            if(key === 'opacity'){
                current = window.getComputedStyle(ele)[key] * 100
            }else{
                current = parseInt(window.getComputedStyle(ele)[key])
            }
            let distance = (target[key] - current) / 10
            distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
            if(current === target[key]){
                clearInterval(timer)
                count--
                if(count === 0) fn()
            }else{
                if(key === 'opacity'){
                    ele.style[key] = (current + distance) / 100
                }else{
                    ele.style[key] = current + distance + 'px'
                }
            }
        },20)
    }
}


function setCookie(key, value, expires){
    if(!expires) return document.cookie = key + '=' + value

    const time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
    document.cookie = `${key}=${value};expires=` + time
}

function getCookie(key){
    const obj = {}

    const tmp = document.cookie.split('; ')
    tmp.forEach(item => {
        const t = item.split('=')
        obj[t[0]] = t[1]
    })

    return key ? obj[key] : obj
}
