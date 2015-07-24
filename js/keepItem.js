$(function () {
    $('#keep').click(function () {
        
        if (!$('.case').is('.selected')){
            alert('请先创建一个笔记本。')
        }else {
            var currentTitle = $('#title').val();
            var currentContent = $('#content').val();
            if (currentTitle != '' || currentContent != '') {
                var $selectedCase = $('.case.selected').attr('class').split(' ')[0];
                var outer = JSON.parse(sessionStorage.getItem('outer'));
                var $temp = outer[$selectedCase];

                var $outerCase = $('#center_body').find('.' + $selectedCase);
                var $length = $outerCase.find('.item').length;
                if ($length == 0) {
                    var cla = $selectedCase + '_' + window[$selectedCase];
                    window[$selectedCase] ++;
                    var $oDiv = $('<div class="' + cla + ' ' + 'item selected' + '">' + '</div>');
                    $('<h5></h5>').appendTo($oDiv);
                    $('<p></p>').appendTo($oDiv);
                    $oDiv.appendTo($outerCase);
                }
                var $selectedItem = $('#center_body').find('.' + $selectedCase).find('.selected').eq(0);
                var currentItemClass = $selectedItem.attr('class').split(' ')[0];

                $temp[currentItemClass] = {
                    'title': currentTitle,
                    'content': currentContent
                };

                $temp[currentItemClass].title = currentTitle;
                $temp[currentItemClass].content = currentContent;
                sessionStorage.setItem('outer', JSON.stringify(outer));

                $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle).end().find('p').text(currentContent);

            }
        }
    })
})