//item模块
define(function (require, exports, module) {
    var $ = require('jquery');
    //保存当前内容
    exports.save = function () {
        var currentTitle = $('#title').val();
        var currentContent = $('#content').html();
        var currentCase = $('.case.selected').attr('class').split(' ')[0];
        var currentItem = $('#center_body').find('.' + currentCase).find('.selected').eq(0);
        var currentItemClass = currentItem.attr('class').split(' ')[0];
        var outer = JSON.parse(sessionStorage.getItem('outer'));
        var temp = outer[currentCase];

        if (!$('.case').is('.selected')) {
            alert('请先创建一个笔记本。')
        } else if ($('#content img').length == 0) {
            /*如果点击保存时不是一个canvas*/

            if (currentTitle != '' || currentContent != '') {
                var outerCase = $('#center_body').find('.' + currentCase);
                var itemLength = outerCase.find('.item').length;
                if (itemLength == 0) {
                    var cla = currentCase + '_' + window[currentCase];
                    window[currentCase] ++;
                    var $oDiv = $('<div class="' + cla + ' ' + 'item selected' + '">' + '</div>');
                    $('<h5></h5>').appendTo($oDiv);
                    $('<p></p>').appendTo($oDiv);
                    $oDiv.appendTo(outerCase);
                }
                temp[currentItemClass] = {
                    'title': currentTitle,
                    'content': currentContent
                };

                sessionStorage.setItem('outer', JSON.stringify(outer));
                $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle).end().find('p').html(currentContent);

            }
        } else if ($('#content img').length > 0) {
            /*如果点击的是一个canvas，那么只保存title*/
            temp[currentItemClass].title = currentTitle;
            sessionStorage.setItem('outer', JSON.stringify(outer));
            $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle);
        }
    }

    //点击鼠标切换item
    exports.change = function (obj) { //传入点击的新item对象
        var currentCase = $('.case.selected').attr('class').split(' ')[0];
        var outer = JSON.parse(sessionStorage.getItem('outer'));
        var temp = outer[currentCase];
        var currentItem = $('#center_body').find('.' + currentCase).find('.selected').eq(0);

        //如果点击的不是.selected对象，执行下面的代码，防止新建一个空的item后点击这个空item产生错误
        if (!obj.is('.selected')) {
            //保存现在item的内容,如果内容为空，则删除
            var currentItemClass = currentItem.attr('class').split(' ')[0];
            var currentTitle = $('#title').val();
            var currentContent = $('#content').html();
            var imgLength = $('#content img').length;
            if (imgLength == 0 && currentTitle == '' && currentContent == '') { /*标题和内容都为空，并且里面也没有img*/
                currentItem.hide(200, function () {
                    obj.remove();
                });
                //把对象的这个属性删除后重新放入sessionStorage
                delete temp[currentItemClass];
                sessionStorage.setItem('outer', JSON.stringify(outer));
            } else if (imgLength == 0 && currentTitle != '' && currentContent != '') {
                /*如果当前不是一个canvas,并且有内容*/
                $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle).end().find('p').html(currentContent);
                temp[currentItemClass] = {
                    "title": currentTitle,
                    "content": currentContent
                };
                sessionStorage.setItem('outer', JSON.stringify(outer));
            } else if (imgLength > 0) {
                /*如果当前是一个canvas*/
                $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle);
                temp[currentItemClass].title = currentTitle;
                sessionStorage.setItem('outer', JSON.stringify(outer));
            };

            /*切换到新的item*/
            var newItem = obj.attr('class').split(' ')[0]; //找出第一个类名，方便定位内容
            var item = temp[newItem];

            obj.siblings().removeClass('selected').end().addClass('selected');
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
    }

    //按delete键，删除当前item
    exports.delete = function (e) {
        if (e.keyCode == 46 && $('.item').length > 0) {
            var currentCase = $('.case.selected').attr('class').split(' ')[0];
            var currentItem = $('#center_body').find('.' + currentCase).find('.selected').eq(0);
            var currentItemClass = currentItem.attr('class').split(' ')[0];
            var outer = JSON.parse(sessionStorage.getItem('outer'));
            var temp = outer[currentCase];
            var nearItem;

            if (currentItem.next('.item').length > 0) {
                nearItem = currentItem.next('.item');
            } else if (currentItem.prev('.item').length > 0) {
                nearItem = currentItem.prev('.item');
            } else {
                nearItem = '';
            }

            currentItem.hide(200, function () {
                $(this).remove();
            });
            delete temp[currentItemClass];
            sessionStorage.setItem('outer', JSON.stringify(outer));

            if (nearItem) {
                nearItem.addClass('selected');
                var nearItemClass = nearItem.attr('class').split(' ')[0];
                var Content = temp[nearItemClass];
                $('#title').val(Content.title);
                $('#content').html(Content.content);
            } else {
                $('#title').val('');
                $('#content').html('');
            }

        }
    }
    
    //增加新的item
    exports.newItem = function () {
        if (!$('.case').is('.selected')) {
            alert('请先创建一个笔记本。')
        } else {
            var $selectedCase = $('.case.selected').attr('class').split(' ')[0];
            /*如果item数不为0，则保存现在item的内容,如果item内容为空，则删除*/
            if ($('#center_body').find('.' + $selectedCase).find('.item').length > 0) {
                var outer = JSON.parse(sessionStorage.getItem('outer'));
                var temp = outer[$selectedCase];
                var currentItem = $('#center_body').find('.' + $selectedCase).find('.selected').eq(0);
                var currentItemClass = currentItem.attr('class').split(' ')[0];
                var currentTitle = $('#title').val();
                var currentContent = $('#content').html();
                var imgLength = $('#content img').length;

                if (imgLength == 0 && currentTitle == '' && currentContent == '') {
                    currentItem.hide(200, function () {
                        $(this).remove();
                    });
                    //把对象的这个属性删除后重新放入sessionStorage
                    delete temp[currentItemClass];
                    sessionStorage.setItem('outer', JSON.stringify(outer));
                } else if (imgLength == 0 && currentTitle != '' && currentContent != '') {
                    /*如果当前不是一个canvas,并且有内容*/
                    $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle).end().find('p').html(currentContent);
                    temp[currentItemClass] = {
                        "title": currentTitle,
                        "content": currentContent
                    };
                    sessionStorage.setItem('outer', JSON.stringify(outer));
                } else if (imgLength > 0) {
                    /*如果当前是一个canvas*/
                    $('#center_body').find('.selected:eq(0)').find('h5').text(currentTitle);
                    temp[currentItemClass].title = currentTitle;
                    sessionStorage.setItem('outer', JSON.stringify(outer));
                };
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
                $('#content').html('');
            }
        }
    }




})