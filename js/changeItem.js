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
            var currentContent = $('#content').val();

            if (currentTitle == '' && currentContent == '') {
                $selectedItem.hide(200, function () {
                    $(this).remove();
                });
                //把对象的这个属性删除后重新放入sessionStorage
                delete $temp[currentItemClass];
                sessionStorage.setItem('outer', JSON.stringify(outer));
            } else {
                $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle).end().find('p').text(currentContent);
                $temp[currentItemClass] = {
                    "title": currentTitle,
                    "content": currentContent
                };
                sessionStorage.setItem('outer', JSON.stringify(outer));
            }

            /*切换到新的item*/

            var newItem = $(this).attr('class').split(' ')[0]; //找出第一个类名，方便定位内容
            var item = $temp[newItem];

            /*追加selected类一定要放在最后*/
            $(this).siblings().removeClass('selected').end().addClass('selected');
            $('#title').val(item.title);
            $('#content').val(item.content);
            /*在Markdown框出现的情况下切换item*/
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