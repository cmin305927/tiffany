$('.down > ul > li').mouseenter(function(){
    $('.down > ul > li > a > div').eq($(this).index()).addClass('active').siblings().removeClass('active')
})

$('.found img').on('mouseenter', function(){
    $('.found .search').addClass('active')
})

$('.found .search').on('mouseleave', function(){
    $('.found .search').removeClass('active')
})

$('.goCart').on('click', function(){
    window.location.href = './cart.html'
})

$(function(){
    const list_info = {
        cat_one: 'all',
        sort_method: '综合',
        sort_type: 'ASC',
        current: 1,
        pagesize: 48
    }

    getCateOne()
    async function getCateOne(){
        const cat_one_list = await $.get('../server/getCateOne.php', null, null, 'json')
        let str = `筛选方式：<a data-type="all" class="active">全部</a>`
        cat_one_list.list.forEach(item => {
            str +=`
            <a data-type="${ item.cat_one_id }">${ item.cat_one_id }</a>
            `
        })
        $('.screen .cateOne').html(str)
    }
    getTotalPage()
    async function getTotalPage(){
        const totalInfo = await $.get('../server/getTotalPage.php', list_info, null, 'json')
        $('.pagination').pagination({
            pageCount: totalInfo.total,
            current: 1,
            prevCls: 'prevBox', 
            coping: true, 
            homePage: '首页',
            endPage: '末页',
            jump: true,
            jumpIptCls: 'inp',
            jumpBtnCls: 'btn',
            jumpBtn: '跳转',
            callback(index){
                list_info.current = index.getCurrent()
                getGoodsList()
            }
        })
    }

    getGoodsList()
    async function getGoodsList(){
        const goodsList = await $.get('../server/getGoodsList.php', list_info, null, 'json')

        list = goodsList.list
        let str = ''
        goodsList.list.forEach(item => {
                str += `<li class="thumbnail">
                <img data-id="${ item.goods_id }" class="drawing-img" src="${ item.goods_big_logo }" alt="...">
                <span>新品</span>
                <img class="cart" src="../images/h-6.jpg" alt="">
            </li>
                `
        })
        $('.ringTables > ul').html(str)
    }

$('.screen').on('click', '.sortBox .price', function(){
        const method = $(this).attr('data-method')
        const type = $(this).attr('data-type')
        $(this).addClass('active').siblings().removeClass('active')
        list_info.sort_method = method
        list_info.sort_type = type
        getTotalPage()
        getGoodsList()
        $(this).attr('data-type', type === 'ASC' ? 'DESC' : 'ASC').siblings().attr('data-type', 'ASC')
    })

$('.ringTables ul').on('click', '.drawing-img', function(){
    const id = $(this).data('id')
    setCookie('goods_id', id)
    window.location.href = './detail.html'
})


})

$('.firstPage').click(function(){
    window.location.href = './index.html'
})

$('.header-right .login').click(function(){
    window.location.href = './login.html'
})

$('.Engagement-ring').click(function(){
    window.location.href = './list.html'
})
