$('.down > ul > li').mouseenter(function(){
    $('.down > ul > li > a > div').eq($(this).index()).addClass('active').siblings().removeClass('active')
})

$('.Engagement-ring').click(function(){
    window.location.href = './list.html'
})

$('.goCart').on('click', function(){
    window.location.href = './cart.html'
})

$(function(){
    let info = null

    const id = getCookie('goods_id')

    getGoodsInfo()
    async function getGoodsInfo(){
        const goodsInfo = await $.get('../server/getGoodsInfo.php', { goods_id: id }, null, 'json')

        bindHtml(goodsInfo.info)

        info = goodsInfo.info
    }

    function bindHtml(info){

        $('.enlargeBox').html(`
        <div class="smallImg list">
            <ul>
                <li><img class="active" src="${ info.goods_small_logo }" alt=""></li>
            </ul>
        </div>
        <div class="showImg">
            <ul>
                <li class="active"><img class="active" src="${ info.goods_big_logo }" alt=""></li>
            </ul>
            <div class="mask"></div>
        </div>
        <div class="largeImg enlarge">
            <img src="${ info.goods_big_logo }" alt="">
        </div>
        <div class="detailInfo">
        `)

        $('.detailInfo').html(`
            <p class="identifier">款式编号53737</p>
            <div class="btn-group">
                <button type="button" class="btn btn-default">S</button>
                <button type="button" class="btn btn-default">M</button>
                <button type="button" class="btn btn-default">L</button>
                <button type="button" class="btn btn-default">XL</button>
            </div>
            <p class="discrible">
            描述及细节<br />
            <span>Tiffany & Co. Schlumberger系列Rope钻戒巧妙运用丰富的层次与纹理，风格别具特色，体现着Jean Schlumberger的天才创意构思。这款戒指的主钻采用圆形明亮式切割，璀璨夺目，戒圈为18K金编织绳索造型，优雅华美，是设计师的一款经典作品。</span>
            <span>蒂芙尼致力于以负责任的方式采购钻石。诚信和企业社会责任是我们采购工作的核心。</span>
            </p>
            <div>
                <button class="add">加入购物车</button>
                <button class="goPay">去结算</button>
            </div>
        </div>
        `)

        $('.goods-desc').html(info.goods_introduce)
    }


    $('.enlargeBox').on('mouseover', '.showImg .active', function(){
        $('.largeImg').css({
            display: 'block'
        })
        $('.mask').css({ display: 'block' })
    })
    $('.enlargeBox').on('mouseout', '.showImg .active', function(){
        $('.largeImg').css({
            display: 'none'
        })
        $('.mask').css({ display: 'none' })
    })
    $('.enlargeBox').on('mousemove','.showImg .active', function(e){
        e = e || window.event
        
        let x = e.pageX - $('.active').offset().left - $('.mask').width() / 2
        let y = e.pageY - $('.active').offset().top - $('.mask').height() / 2
        if (x < 0) x = 0
        if (y < 0) y = 0
        if (x >= $('.active').width() - $('.mask').width()) x = $('.active').width() - $('.mask').width()
        if(y > $('.active').height() - $('.mask').height()) y = $('.active').height() - $('.mask').height()
        $('.mask').css({
            left: x,
            top: y,
        })
        const bg_x = $('.active').width() / $('.largeImg img').width()
        const bg_y = $('.active').height() / $('.largeImg img').height()
        $('.largeImg img').css({
            left: -bg_x,
            top: -bg_y,
        })
     })



    $('.enlargeBox').on('click', '.add', function(){
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []

        const flag = cart.some(item => item.goods_id === id)
        if(flag){
            
            const cart_goods = cart.filter(item => item.goods_id === id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
        }else{
            info.cart_number = 1
            cart.push(info)
        }

        window.localStorage.setItem('cart', JSON.stringify(cart))
    })

    
})







// function Enlarge(ele){
//     this.ele = document.querySelector(ele)
//     this.show = this.ele.querySelector('.showImg')
//     this.mask = this.ele.querySelector('.mask')
//     this.list = this.ele.querySelector('.list')
//     this.enlarge = this.ele.querySelector('.enlarge')
//     this.show_width = this.show.clientWidth
//     this.show_height = this.show.clientHeight

//     this.enlarge_width = parseInt(window.getComputedStyle(this.enlarge).width)
//     this.enlarge_height = parseInt(window.getComputedStyle(this.enlarge).height)


//     // this.bg_width = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
//     // this.bg_height = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])

//     // this.list = this.ele.querySelector('.list')

//     this.init()

// }

// Enlarge.prototype.init = function(){
//     this.setScale()
//     this.overOut()
//     this.move()
//     this.change()
// }

// Enlarge.prototype.setScale = function(){
//     this.mask_width = this.show_width * this.enlarge_width / this.bg_width
//     this.mask_height = this.show_height * this.enlarge_height / this.bg_height
//     this.mask.style.width = this.mask_width + 'px'
//     this.mask.style.height = this.mask_height + 'px'
// }

// Enlarge.prototype.overOut = function(){
//     this.show.addEventListener('mouseover', () =>{
//         this.mask.style.display = 'block'
//         this.enlarge.style.display = 'block'
//     })
//     this.show.addEventListener('mouseout', () => {
//         this.mask.style.display = 'none'
//         this.enlarge.style.display = 'none'
//     })
// }

// Enlarge.prototype.move = function(){
//     this.show.addEventListener('mousemove', e => {
//         e = e || window.event
//         let x = e.offsetX - this.mask_width / 2
//         let y = e.offsetY - this.mask_height / 2
//         if(x <= 0) x = 0
//         if(y <= 0) y = 0
//         if(x >= this.show_width - this.mask_width) x = this.show_width - this.mask_width
//         if(y >= this.show_height - this.mask_height) y = this.show_height - this.mask_height
//         this.mask.style.left = x + 'px'
//         this.mask.style.top = y + 'px'
//         const bg_x = this.enlarge_width * x / this.mask_width
//         const bg_y = this.enlarge_height * y / this.mask_height
    
//         this.enlarge.style.backgroundPosition = `-${bg_x}px -${bg_y}px`
//     })
// }

// Enlarge.prototype.change = function(){
//     this.list.addEventListener('click', e => {
//         e = e || window.event
//         const target = e.target || e.srcElement
//         if(target.nodeName === 'IMG'){
//             const show_url = target.getAttribute('show')
//             const enlarge_url = target.getAttribute('enlarge')
//             this.show.firstElementChild.src = show_url
//             this.enlarge.style.backgroundImage = `url(${enlarge_url})`
//             for(let i = 0; i < this.list.children.length; i++){
//                 this.list.children[i].classList.remove('active')
//             }
//             target.parentElement.classList.add('active')
//         }
//     })
// }
















$('.header-right .login').click(function(){
    window.location.href = './login.html'
})


$('.enlargeBox').on('click', '.goPay', function(){
    window.location.href = './cart.html'
})
