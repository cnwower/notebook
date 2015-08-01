/*切换item的之前，保存原来item的内容（如果内容为空，删除），然后将选中的item的内容展现*/
$(function () {
    $('#center_body').on("click", '.item', function () {

        var $selectedCase = $('.case.selected').attr('class').split(' ')[0];
        var outer = JSON.parse(sessionStorage.getItem('outer'));
        var $temp = outer[$selectedCase];


        var $selectedItem = $('#center_body').find('.' + $selectedCase).find('.selected').eq(0);

        //如果点击的不是.selected对象，执行下面的代码，防止新建一个空的item后点击这个空item产生错误
        if (!$(this).is('.selected')) {
            //保存现在item的内容,如果内容为空，则删除
            var currentItemClass = $selectedItem.attr('class').split(' ')[0];
            var currentTitle = $('#title').val();
            var currentContent = $('#content').html();
            var imgLength = $('#content img').length;
            if (imgLength == 0 && currentTitle == '' && currentContent == '') { /*标题和内容都为空，并且里面也没有img*/
                $selectedItem.hide(200, function () {
                    $(this).remove();
                });
                //把对象的这个属性删除后重新放入sessionStorage
                delete $temp[currentItemClass];
                sessionStorage.setItem('outer', JSON.stringify(outer));
            } else if (imgLength == 0 && currentTitle != '' && currentContent != '') {
                /*如果当前不是一个canvas,并且有内容*/
                $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle).end().find('p').html(currentContent);
                $temp[currentItemClass] = {
                    "title": currentTitle,
                    "content": currentContent
                };
                sessionStorage.setItem('outer', JSON.stringify(outer));
            } else if (imgLength > 0) {
                /*如果当前是一个canvas*/
                $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle);
                $temp[currentItemClass].title = currentTitle;
                sessionStorage.setItem('outer', JSON.stringify(outer));
            };

            /*切换到新的item*/
            var newItem = $(this).attr('class').split(' ')[0]; //找出第一个类名，方便定位内容
            var item = $temp[newItem];

            $(this).siblings().removeClass('selected').end().addClass('selected');
            $('#title').val(item.title);

            /*如果切换的是一个canvas*/
            if (Object.getOwnPropertyNames(item).length == 3) {
                $('#content').html('');
                var oImg = $('<img src="" alt="">');
                oImg.attr('src', item.bigImg).appendTo($('#content'));
            } else {
                $('#content').html(item.content);
            }

            /*在Markdown框出现的情况下切换item*/
            if ($('#markdown').is(':visible') && Object.getOwnPropertyNames(item).length == 2) {
                $('#m_title').html(markdown.toHTML($('#title').val()));
                $('#m_content').html(markdown.toHTML($('#content').html()));

                $('#title').keyup(function () {
                    $('#m_title').html(markdown.toHTML($('#title').val()));
                })

                $('#content').keyup(function () {
                    console.log(markdown.toHTML($('#content').html()));
                    $('#m_content').html(markdown.toHTML($('#content').html()));
                })
            }

        }
    })
})