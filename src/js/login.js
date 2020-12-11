$('.down > ul > li').mouseenter(function(){
    $('.down > ul > li > a > div').eq($(this).index()).addClass('active').siblings().removeClass('active')
})

$(function(){
    $('#login').validate({
        rules: {
            username: {
                required: true,
                minlength: 5,
                maxlength: 10
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 12
            }
        },
        messages: {
            username: {
                required: '用户名不能为空！',
                minlength: '最少 5 个字符',
                maxlength: '最多 10 个字符'
            },
            password: {
                required: '密码不能为空！',
                minlength: '最少 6 个字符',
                maxlength: '最多 12 个字符'
            }
        },
        submitHandler(form){
            const info = $(form).serialize()
            $.post('../server/login.php', info, null, 'json').then(res => {
                if(res.code === 0){
                    $('.error').removeClass('hide')
                }else if(res.code === 1){
                    setCookie('nickname', res.nickname)
                    window.location.href = './index.html'
                }
            })
        }
    })
})

$('.Engagement-ring').click(function(){
    window.location.href = './list.html'
})