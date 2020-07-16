(function () {
    $('.lt', $('.header')).hover(
        function () {
            if ($(this).find('img').eq(1).hasClass('animat')) {
                return;
            }
            var that = this;
            $(this).find('img').eq(1).attr('src', `http://img1.360buyimg.com/da/jfs/t1/16273/9/11655/153805/5c90a4f3E683206d9/eef283b0ed619fe4.gif?${Math.random()}`).addClass('animat').show()
            $(this).find('img').eq(0).hide();
            setTimeout(function () {
                $(that).find('img').eq(1).hide().removeClass('animat');
                $(that).find('img').eq(0).show();
            }, 4000);
        },
    )
    var headerArr = ['芭比娃娃', '洗发水', '口罩', '霸王'];
    var headerNum = 0;
    setInterval(() => {
        headerNum++;
        $('input[type="text"]', $('.header')).attr('placeholder', headerArr[headerNum % headerArr.length])
    }, 4000);

    $('.header').find('.content').find('[type="text"]').on('input', function () {
        var v = $(this).val()
        if (v) {
            throttle(v)
        }
    })

    var vArr = [], timer;
    function throttle(v) {
        vArr.push(v)
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            var data = vArr[vArr.length - 1];
            var ran = Math.ceil(Math.random() * 1000);
            window[`jsonp${ran}`] = function (res) {
                var $ul = $('.Lenovos-word',$('.header'))
                $ul.find('li').not('.has').remove().end().end().show()
                for(var i = 0; i < res.result.length; i++){
                    var $li = $ul.find('.Lenovos-word-item').clone();
                    $li.removeClass()
                        .find('a').html(`${res.result[i][0]}`).end()
                            .find('span').html(`约${Math.floor(res.result[i][1])}个商品`)
                    $ul.find('.Lenovos-word-close').before($li)
                }
                $ul.on('mouseleave',function(){
                    var that = this;
                    setTimeout(function(){
                        $(that).hide()
                    },500)
                })
                $ul.find('li').eq(-1).click(function(){
                    $ul.hide()
                })
                $('input[type="text"]', $('.header')).on('focus',function(){
                    $ul.show()
                })
            }
            $.ajax({
                type: "get",
                url: "https://suggest.taobao.com/sug",
                data: {
                    code: 'utf-8',
                    q: data,
                    callback: `jsonp${ran}`
                },
                dataType: "jsonp",
            });
            vArr = []
            timer = false;
        }, 1000);

    }

})()
