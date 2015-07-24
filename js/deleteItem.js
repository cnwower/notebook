$(function () {
    $(document).keydown(function (e) {
        e = e || Event;
        if (e.keyCode == 46) {
            var $selectedCase = $('.case.selected').attr('class').split(' ')[0];
            var $selectedItem = $('#center_body').find('.' + $selectedCase).find('.selected').eq(0);
            var currentItemClass = $selectedItem.attr('class').split(' ')[0];
            var outer = JSON.parse(sessionStorage.getItem('outer'));
            var $temp = outer[$selectedCase];
            var $nearItem;

            if ($selectedItem.next('.item').length > 0) {
                $nearItem = $selectedItem.next('.item');
            } else if ($selectedItem.prev('.item').length > 0) {
                $nearItem = $selectedItem.prev('.item');
            } else {
                $nearItem = '';
            }

            $selectedItem.hide(200, function () {
                $(this).remove();
            });
            delete $temp[currentItemClass];
            sessionStorage.setItem('outer', JSON.stringify(outer));

            if ($nearItem) {
                $nearItem.addClass('selected');
                var $nearItemClass = $nearItem.attr('class').split(' ')[0];
                var Content = $temp[$nearItemClass];
                $('#title').val(Content.title);
                $('#content').val(Content.content);
            } else {
                $('#title').val('');
                $('#content').val('');
            }
       
            
            
        }
    })
})