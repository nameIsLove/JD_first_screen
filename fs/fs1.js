(function () {
    var $ul = $('.inNav').siblings('ul')
    $ul.on('mouseenter', 'li', function () {
        var ind = $(this).index();
        show(ind);
        $ul.find('li').removeClass('active').eq(ind).addClass('active');
        $('.fs-nav').on('mouseleave', function () {
            $ul.find('li').removeClass('active')
            $('.inNav').hide()
        })
    })
    function show(index) {
        var data = L_data;
        var head = data[index][0];
        var bod = data[index][1];
        var $wrap = $('.inNav');
        $('.inNav').find('.clo').remove()
        $wrap.show()
        var str = '';
        for (var i = 0; i < head.length; i++) {
            str += `<a href="#" class='clo'><span>${head[i]}</span><i class="iconfont icon-xiangyou1"></i></a>`;
        }
        $wrap.find('.title').append($(str));
        var st = '';
        console.log()
        for (var j = 0; j < Object.values(bod).length; j++) {
            var st1 = '';
            for (var f = 0; f < bod[j]['b'].length; f++) {
                st1 += `
                          <dd><a href="#">${bod[j]['b'][f]}</a></dd>
                      `
            }
            st += ` <dl class='clo'>
            <dt>
                <a href="#">
                    <span>${bod[j]['a']}</span>
                    <i class="iconfont icon-xiangyou1"></i>
                </a>
            </dt>
            <div class="dd-content">
            ${st1}
            </div>
        </dl>`
        }
        $wrap.find('.inNav-body').append($(st));

    }





















})()




















