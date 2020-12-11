$('.down > ul > li').mouseenter(function(){
    $('.down > ul > li > a > div').eq($(this).index()).addClass('active').siblings().removeClass('active')
})

$('.Engagement-ring').click(function(){
    window.location.href = './list.html'
})

$('.login').click(function(){
    window.location.href = './login.html'
})

const ul = document.querySelector('.search-modal > ul')
const inp = document.querySelector('.search-modal > input')
inp.addEventListener('input', function(){
    const value = this.value.trim()
    if(!value) return
    const script = document.createElement('script')
    const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
    script.src = url
    document.body.appendChild(script)
})
function bindHtml(res){
    if(!res.g){
        ul.classList.remove('active')
        return
    }
    let str = ''
    for(let i = 0; i < res.g.length; i++){
        str += `
            <li>${ res.g[i].q }</li>
        `
    }
    ul.innerHTML = str
    ul.classList.add('active')
}

$('.found img').on('mouseenter', function(){
    $('.found .search').addClass('active')
})

$('.found .search').on('mouseleave', function(){
    $('.found .search').removeClass('active')
})

$('.goCart').on('click', function(){
    window.location.href = './cart.html'
})

class Banner{
    constructor(ele){
        this.ele = document.querySelector(ele)
        this.imgBox = this.ele.querySelector('.imgBox')
        this.banner_width = this.ele.clientWidth
        this.index = 1
        this.timer = 0
        this.flag = true
        this.init()
    }

    init(){
        this.copyEle()
        this.autoPlay()
        this.overOut()
        this.changePage()
    }

    copyEle(){
        const first = this.imgBox.firstElementChild.cloneNode(true)
        const last = this.imgBox.lastElementChild.cloneNode(true)
        this.imgBox.appendChild(first)
        this.imgBox.insertBefore(last, this.imgBox.firstElementChild)
        this.imgBox.style.width = this.imgBox.children.length * 100 + '%'
        this.imgBox.style.left = -this.banner_width + 'px'
    }

    autoPlay(){
        this.timer = setInterval(() => {
            this.index ++

            move(this.imgBox, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
        }, 4000)
    }

    moveEnd(){
        if(this.index === this.imgBox.children.length - 1){
            this.index = 1
            this.imgBox.style.left = -this.index * this.banner_width + 'px'
        }
        if(this.index === 0){
            this.index = this.imgBox.children.length - 2
            
            this.imgBox.style.left = -this.index * this.banner_width + 'px'
        }
    }

    overOut(){
        this.ele.addEventListener('mouseover',() => {
            clearInterval(this.timer)
        })
        this.ele.addEventListener('mouseout', () => {
            this.autoPlay()
        })
    }

    changePage(){
        document.addEventListener('visibilitychange', () => {
            const state = document.visibilityState
            if(state === 'hidden'){
                clearInterval(this.timer)
            }
            if(state === 'visible'){
                this.autoPlay()
            }
        })
    }
    
}



