$(function () {
    $('#addNewItem').click(function () {
        if (!$('.case').is('.selected')) {
            alert('请先创建一个笔记本。')
        } else {
            var $selectedCase = $('.case.selected').attr('class').split(' ')[0];
            /*如果item数不为0，则保存现在item的内容,如果item内容为空，则删除*/
            if ($('#center_body').find('.' + $selectedCase).find('.item').length > 0) {
                var outer = JSON.parse(sessionStorage.getItem('outer'));
                var $oTemp = outer[$selectedCase];
                var $selectedItem = $('#center_body').find('.' + $selectedCase).find('.selected').eq(0);
                var $selectedItemClass = $selectedItem.attr('class').split(' ')[0];
                var currentTitle = $('#title').val();
                var currentContent = $('#content').val();

                if (currentTitle == '' && currentContent == '') {
                    $selectedItem.hide(200, function () {
                        $(this).remove();
                    });
                    //把对象的这个属性删除后重新放入sessionStorage
                    delete $oTemp[$selectedItemClass];
                    sessionStorage.setItem('outer', JSON.stringify(outer));
                } else {
                    $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle).end().find('p').text(currentContent);
                    $oTemp[$selectedItemClass].title = currentTitle;
                    $oTemp[$selectedItemClass].content = currentContent;
                    sessionStorage.setItem('outer', JSON.stringify(outer));
                }
            }
        }


        /*创建新的item*/
        if (!$('.out').is('selected')) {
            //如果当前case下没有item，item从0开始标号
            if (!window[$selectedCase]) {
                window[$selectedCase] = 0;
            }
            var cla = $selectedCase + '_' + window[$selectedCase];
            window[$selectedCase] ++;

            var $oDiv = $('<div class="' + cla + ' ' + 'item selected' + '">' + '</div>');
            $('<h5></h5>').appendTo($oDiv);
            $('<p></p>').appendTo($oDiv);
            $oDiv.prependTo($('#center_body').find('.' + $selectedCase));
            $oDiv.siblings().removeClass('selected');
            $('#title').val('');
            $('#content').val('');
        }

    })
})