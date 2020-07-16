(function () {
    var  kill = $('.seckill-countdown'),
    $t , h, m, s, $tEnd, $hEnd, oldT;
    setInterval(() => {
        $t = new Date();
        h, m, s;
        $tEnd = $t.getHours() % 2 == 0 ? $t.getHours() : $t.getHours() - 1;
        $hEnd = $tEnd < 10 ? '0' + $tEnd + ':00' : $tEnd + ':00';
        oldT = new Date($t.getFullYear(), $t.getMonth(), $t.getDate(), $tEnd, 0, 0);
        h = '0' + ($t.getHours() - oldT.getHours() == 1 ? 0 : 1);
        
        m = (59 - ($t.getMinutes() - oldT.getMinutes())) < 10 ? '0' + (59 - ($t.getMinutes() - oldT.getMinutes())) : (59 - ($t.getMinutes() - oldT.getMinutes()));
        s = (59 - ($t.getSeconds() - oldT.getSeconds()))< 10 ? '0' + (59 - ($t.getSeconds() - oldT.getSeconds())) : (59 - ($t.getSeconds() - oldT.getSeconds()));
        kill.find('strong').text($hEnd).end()
            .find('.seckill-h').text(h).end()
            .find('.seckill-m').text(m).end()
            .find('.seckill-s').text(s)
    }, 1000);

    $('.seckill-list').slideshow({
        list: 'div',
        width: 810,
        height: 260,
        type: 'animate',
        showChangeBtn: true,
        autoTime: 3000,
        dotBtn: false,
        isAuto: false,
    })
    $('.seckill-brand').slideshow({
        list: 'div',
        width: 200,
        height: 260,
        type: 'animate',
        showChangeBtn: false,
        autoTime: 2000,
        dotBtn: true,
        isAuto: true
    })
})()