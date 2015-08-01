$(function () {
    $('#midden').click(function () {
        if ($('.delete').is(':visible')) {
            $('.delete').hide();
        } else {
            $('.delete').show();
        }
    });
    $('ul').on('click', '.delete', function () {
        var $out = $(this).parent('.out');
        var $caseClass = $(this).siblings('.case').attr('class').split(' ')[0];
        var outer = JSON.parse(sessionStorage.getItem('outer'));
        delete outer[$caseClass];
        sessionStorage.setItem('outer', JSON.stringify(outer));

        /*删除当前case后将旁边case的内容展示出来*/
        if ($(this).siblings('.case').is('.selected')) {
            var $nearCase;
            if ($out.next('.out').length > 0) {
                $nearCase = $out.next('.out').find('.case');
            } else if ($out.prev('.out').length > 0) {
                $nearCase = $out.prev('.out').find('.case');
            } else {
                $nearCase = '';
            }
            if ($nearCase) {
                $('#center_body').find('div').remove();
                $nearCase.addClass('selected');
                var $nearCaseClass = $nearCase.attr('class').split(' ')[0];
                var newItems = outer[$nearCaseClass];

                var $outerCase = $('<div class="' + $nearCaseClass + '"></div>');
                $outerCase.appendTo('#center_body');
                for (var i in newItems) {
                    var $innerCase = $('<div class="' + i + ' item"></div');
                    $innerCase.appendTo($outerCase);
                    $('<h5>' + newItems[i].title + '</h5>').appendTo($innerCase);
                    $('<p>' + newItems[i].content + '</p>').appendTo($innerCase);
                }
                $outerCase.find('.item:first-child').addClass('selected');
                $('#title').val($('.item.selected').find('h5').text());
                $('#content').html($('.item.selected').find('p').html());

            } else {
                $('#center_body').find('div').remove();
                $('#title').val('');
                $('#content').html('');
            }

        }


        $out.fadeOut(300, function () {
            $(this).remove();
        });
    })
})