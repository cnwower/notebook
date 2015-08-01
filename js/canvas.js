$(function () {
    /*画图*/
    var cav = document.getElementById('cav');
    if (cav.getContext) {
        var context = cav.getContext('2d');
    }
    var keydown = 0; //在canvas区域点击的标志
    var x = 0; //初始化鼠标点击坐标
    var y = 0; //初始化鼠标点击坐标
    var radius = 10;
    var type = 'draw'; //默认绘图模式
    context.lineWidth = 1; //默认线条粗细
    context.strokeStyle = '#000';

    cav.onmousedown = function (e) {
        keydown = 1;
        x = e.offsetX;
        y = e.offsetY;
        context.moveTo(x, y);

    };
    cav.onmouseup = function () {
        keydown = 0;
    };
    cav.onmousemove = function (e) {
        if (keydown && type == 'draw') {
            x = e.offsetX;
            y = e.offsetY;
            draw(context, x, y);
        } else if (keydown && type == 'erasure') {
            x = e.offsetX;
            y = e.offsetY;
            erasure(context, radius, x, y);
        }

    }

    function draw(context, x, y) {
        context.lineTo(x, y);
        context.stroke();
        context.moveTo(x, y);
    }

    function erasure(context, radius, x, y) {
            context.arc(x, y, radius, 0, Math.PI * 2, false);
            context.fill();
            context.moveTo(x, y);

        }
        /*铅笔*/
    $('#pen').click(function () {
        type = 'draw';
        context.lineWidth = 1;
        context.strokeStyle = $('#clr').attr('class').split(' ')[1];
        context.beginPath();
        context.globalCompositeOperation = "source-over";
        $(this).addClass('selected').siblings().removeClass('selected');
    });
    /*毛刷*/
    $('#brush').click(function () {
        type = 'draw';
        context.lineWidth = 5;
        context.strokeStyle = $('#clr').attr('class').split(' ')[1];
        context.beginPath();
        context.globalCompositeOperation = "source-over";
        $(this).addClass('selected').siblings().removeClass('selected');
    });
    /*橡皮擦*/
    $('#erasure').click(function () {
        type = 'erasure';
        radius = 10;
        context.beginPath();
        context.globalCompositeOperation = "destination-out";
        context.strokeStyle = "rgba(250,250,250,0)";
        $(this).addClass('selected').siblings().removeClass('selected');
    });


    $('#clr').click(function () {
        if ($('#clr_outer').is(':visible')) {
            $('#clr_outer').hide();
        } else {
            $('#clr_outer').show();
        }
    });
    $('.colors').click(function () {
        var color = $(this).attr('id');
        $('#clr').removeClass().addClass('tool ' + color);
        $('#clr>img').attr('src', "img/" + color + ".png");
        context.beginPath();
        context.strokeStyle = color;
    })

    $('#close').click(function () {
        $('#frame').hide();
    })
    $('#save').click(function () {
        var $selectedCase = $('.case.selected').attr('class').split(' ')[0];
        var outer = JSON.parse(sessionStorage.getItem('outer'));
        var $temp = outer[$selectedCase];
        var $selectedItem = $('#center_body').find('.' + $selectedCase).find('.selected').eq(0);
        var currentItemClass = $selectedItem.attr('class').split(' ')[0];

        var bigImg = cav.toDataURL('image/png');
        var title = $('#frame_in input').val();

        $temp[currentItemClass] = {
            'title': title,
            'content': '',
            'bigImg': bigImg
        };
        sessionStorage.setItem('outer', JSON.stringify(outer));

        $('.item.selected h5').text(title);
        
        $('#title').val(title);
        var oImg = $('<img src="" alt="">');
        oImg.attr('src',bigImg).appendTo($('#content'));
        $('#content img').attr('src', bigImg);
        /*清除canvas内容*/
        $('#frame_in input').val('');
        context.clearRect(0, 0, 350, 400);
         context.beginPath();
        $('#frame').hide();
    })
})