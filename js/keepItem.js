$(function () {
    $('#keep').click(function () {

        if (!$('.case').is('.selected')) {
            alert('请先创建一个笔记本。')
        } else if ($('#content img').length == 0) {    
            /*如果点击保存时不是一个canvas*/
            var currentTitle = $('#title').val();
            var currentContent = $('#content').html();
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

                 /*$temp[currentItemClass].title = currentTitle;
                 $temp[currentItemClass].content = currentContent;*/
              
                sessionStorage.setItem('outer', JSON.stringify(outer));
                $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle).end().find('p').html(currentContent);

            }
        } else if ($('#content img').length > 0) {
            /*如果点击的是一个canvas，那么只保存title*/
            var $selectedCase = $('.case.selected').attr('class').split(' ')[0];
            var outer = JSON.parse(sessionStorage.getItem('outer'));
            var $temp = outer[$selectedCase];
            var $selectedItem = $('#center_body').find('.' + $selectedCase).find('.selected').eq(0);
            var currentItemClass = $selectedItem.attr('class').split(' ')[0];
            
            

            var currentTitle = $('#title').val();
            
            $temp[currentItemClass].title = currentTitle;

             sessionStorage.setItem('outer', JSON.stringify(outer));
            
            $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle);
        }
    })
})