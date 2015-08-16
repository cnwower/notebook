define(function (require, exports, module) {
    var $ = require('jquery');

    exports.newPanel = function () {
        if (!$('.case').is('.selected')) {
            alert('请先创建一个笔记本。')
        } else {
            $('#frame').show();
            var currentCase = $('.case.selected').attr('class').split(' ')[0];
            if (!$('.out').is('selected')) {
                //如果当前case下没有item，item从0开始标号
                if (!window[currentCase]) {
                    window[currentCase] = 0;
                }
                var cla = currentCase + '_' + window[currentCase];
                window[currentCase] ++;

                var $oDiv = $('<div class="' + cla + ' ' + 'item selected' + '">' + '</div>');
                $('<h5></h5>').appendTo($oDiv);
                $('<p><img src="" alt=""></p>').appendTo($oDiv);
                $oDiv.prependTo($('#center_body').find('.' + currentCase));
                $oDiv.siblings().removeClass('selected');
                $('#title').val('');
                $('#content').html('');
                $('#content img').attr('src', '');
            }
        }
    }   
})