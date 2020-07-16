(function () {
    function Slide(con, wrap) {
        this.wrap = wrap;
        this.list = this.wrap.children(con.list);
        this.width = con.width;
        this.height = con.height;
        this.type = con.type;
        this.showChangeBtn = con.showChangeBtn || (con.showChangeBtn == undefined ? true : false);
        this.autoTime = con.autoTime;
        this.dotBtn = con.dotBtn || (con.dotBtn == undefined ? true : false);
        this.isAuto = con.isAuto || (con.isAuto == undefined ? true : false);
        this.current = 0;
        this.hChe = con.hoverChenge;
        this.num = this.list.length,
            this.init();
    }

    
    Slide.prototype.init = function () {
        var num = this.num,
            $changeBox = $('<div class="my-changeBox"></div>'),
            $dotBox = $('<div class="my-dotBox"></div>'),
            $listBox = $('<div class="my-listBox"></div>'),
            $lt, $rt, $dot;
            this.showChangeBtn ? '' : $changeBox.css({display:'none'});
            this.dotBtn ? '' : $dotBox.css({display:'none'});
        //   如果现实按钮，才创建元素，否则为 undefined
        ($lt = $('<div class="my-changeBox-ltbtn">&lt;</div>')) && ($rt = $('<div class="my-changeBox-rtbtn">&gt;</div>'));
        for (var i = 0; i < num; i++) {
            //    创建小圆点，并添加到div中
            ($dot = $('<span class="my-dotBox-dotBtn"></span>'));
            $dot && $dot.appendTo($dotBox);
            // 每张图片添加进一个div中
            $(this.list[i]).appendTo($listBox);
        };
        this.list.each(function(index,ele){
            $(ele).hasClass('item') ? '' : $(ele).addClass('item')
        })
        // 左右按钮添加进div中
        $changeBox.append($lt).append($rt);
        // 全部加到wrap中   
        $(this.wrap).css('position','relative').append($listBox)
            .append($changeBox)
            .append($dotBox);
        this.slideStyle();
        this.methods();
        this.isAuto && this.isAu();
    }
    
    Slide.prototype.hC = function(){
        if(this.hChe){
            this.wrap.find('.my-changeBox').css('display','none').end()
                .hover(
                    function(){
                    $(this).find('.my-changeBox').css({display:'block'})
                    },
                    function(){
                        $(this).find('.my-changeBox').css({display:'none'})
                })
        }
    }
    // 小圆点和图片显示
    Slide.prototype.slideStyle = function () {
        $('.my-dotBox-dotBtn', this.wrap).removeClass('active').eq(this.current % this.num).addClass('active')
        this.list.css({ width: this.width, height: this.height })
    }
    Slide.prototype.methods = function () {
        var that = this,
            timer;
        if (this.type == 'fade') {
            this.list.css({ display: 'none', position: 'absolute' }).eq(this.current).show();
            this.showChangeBtn ? this.hC() : '';

            this.wrap.find('.my-dotBox').on('mouseover', 'span', function (e) {
                if (that.current == $(this).index()) {
                    return
                }
                that.wrap.find('.item').eq(that.current).fadeOut(600);
                that.current = $(this).index();
                that.slideStyle();
                that.wrap.find('.item').eq($(this).index()).fadeIn(300);
                
            })
            this.wrap.find('.my-changeBox').on('click', 'div', function () {
                that.wrap.find('.item').eq(that.current).fadeOut(1000)
                if ($(this).index() == 0) {
                    that.current < 0 ? that.current = that.wrap.find('.item').length - 1 : that.current;
                    that.current--;
                } else {
                    that.current += 1;
                    that.current > that.wrap.find('.item').length - 1 ? that.current = 0 : that.current;
                }
                that.wrap.find('.item').eq(that.current).fadeIn(800);
                that.slideStyle();
            })
        }
        else if (this.type == 'animate') {
            this.wrap.css({ overflow: 'hidden' })
                .find('.my-listBox').css({ width: (that.num + 1) * this.width, height: this.height, position: 'relative' })
                .find('.item').css({ display: 'block', float: 'left' })
                .eq(0).clone().appendTo($('.my-listBox', this.wrap))
                var backData = this.wrap.find('.my-listBox').find('.item').eq(0).css('background')
                this.wrap.find('.my-listBox').find('.item').eq(-1).css('background',backData)
                var lock = false;
            this.wrap.find('.my-dotBox').on('mouseover', 'span', function (e) {
                if (that.current == $(this).index()) {
                    return
                }
                that.current = $(this).index();
                $('.my-listBox', that.wrap).animate({left: -that.current * that.width})
                that.slideStyle();
            })
            
            $('.my-changeBox', this.wrap).on('click', 'div', function () {
                if (lock) {
                    return
                }
                lock = true;
                if ($(this).index() == 0) {
                    if (that.current == 0) {
                        that.current = that.num;
                        $('.my-listBox', that.wrap).css({ left: -that.current * that.width })
                    }
                    that.current--;
                    $('.my-listBox', that.wrap).animate({ left: -that.current * that.width }, 200, function () {
                        lock = false;
                    })
                    console.log(that.current)
                    that.slideStyle();
                } else if ($(this).index() == 1) {
                    console.log(that.num)
                    if (that.current == that.num) {
                        that.current = 0;
                        $('.my-listBox', that.wrap).css({ left: 0 })
                        console.log($('.my-listBox', that.wrap).css('left'))
                    }
                    that.current += 1;
                    $('.my-listBox', that.wrap).animate({ left: -that.current * that.width }, 200, function () {
                        lock = false;
                    })
                    that.slideStyle();
                }
            })
        }
    }
    //  是否自动轮播
    Slide.prototype.isAu = function () {
        var that = this,
            timer;
        if (this.type == 'fade' && this.isAuto == true) {
            this.wrap.on('mouseover', function () {
                that.wrap.find('.my-dotBox')
                    .add('.my-changeBox', this)
                clearInterval(timer);
                that.wrap.on('mouseleave', function () {
                    that.wrap.find('.my-dotBox')
                        .add('.my-changeBox', this)
                    run()
                })
            })
        }
        function run() {
            clearInterval(timer);
            timer = setInterval(function () {
                that.wrap.find('.my-changeBox-rtbtn').click();
            }, that.autoTime)
        }
        run()
    }
    $.fn.extend({
        slideshow: function (config) {
            var obj = new Slide(config, this);
            $(this).css({ width: config.width, height: config.height })
        }
    })

})()

























