(function(){
    $('.fs-slideshow-wrap.lt').slideshow({
        list: 'div',
        width: 590,
        height: 470,
        type: 'fade',
        showChangeBtn: true,
        autoTime: 3000,
        dotBtn: true,
        isAuto: true
    })
    $('.fs-slideshow-wrap.rt').slideshow({
        list: 'div',
        width: 190,
        height: 470,
        type: 'fade',
        showChangeBtn: true,
        autoTime: 8000,
        dotBtn: false,
        isAuto: true,
        hoverChenge: true
    })
})()