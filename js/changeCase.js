/*切换case及展示新case的item*/
$(function () {
    $('#left').on('click', '.case', function () {
        //加入对case内容的判断，解决新建case，在input未blur时点击case时出现的bug
        if ($(this).text()) {
            var $selectedCase = $('.case.selected').attr('class').split(' ')[0];
            $('#center_body').find('.' + $selectedCase).remove();
            $('.case').removeClass('selected');
            $(this).addClass('selected');
            var newCaseName = $(this).attr('class').split(' ')[0];
            var outer = JSON.parse(sessionStorage.getItem('outer'));
            var newItems = outer[newCaseName];
            var $outerCase = $('<div class="' + newCaseName + '"></div>');
            $outerCase.appendTo('#center_body');

            for (var i in newItems) {
                var $innerCase = $('<div class="' + i + ' item"></div');
                $innerCase.appendTo($outerCase);
                $('<h5>' + newItems[i].title + '</h5>').appendTo($innerCase);
                $('<p>' + newItems[i].content + '</p>').appendTo($innerCase);
            }

            $outerCase.find('.item:first-child').addClass('selected');
            $('#title').val($('.item.selected').find('h5').text());
            $('#content').val($('.item.selected').find('p').text());
            /*在Markdown框显示的情况下切换case*/
            if ($('#markdown').is(':visible')) {
                $('#m_title').html(markdown.toHTML($('#title').val()));
                $('#m_content').html(markdown.toHTML($('#content').val()));

                $('#title').keyup(function () {
                    $('#m_title').html(markdown.toHTML($('#title').val()));
                })

                $('#content').keyup(function () {
                    console.log(markdown.toHTML($('#content').val()));
                    $('#m_content').html(markdown.toHTML($('#content').val()));
                })
            }
        }
    })
})