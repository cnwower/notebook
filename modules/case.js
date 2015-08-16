define(function (require, exports, module) {
    var $ = require('jquery');

    //新建case
    exports.newCase = function () {
        var newCaseClass = 'case' + window['caseLength'];

        var $oDiv = $('<li class="' + newCaseClass + ' case"></li>');

        var $out = $('<div class="out"></div>');
        $out.append($oDiv).appendTo($('#left').find('ul'));
        $('<li class="delete"></li>').insertAfter($oDiv);
        var outer = JSON.parse(sessionStorage.getItem('outer'));
        var $newInput = $('<input type="text">');
        $newInput.css('width', '100px').appendTo($oDiv);

        $newInput.focus();
        $newInput.blur(function () {
            if (!$(this).val()) { //如果是空字符串，移除新建的oDIV
                $oDiv.remove();
            } else {
                var $html = $(this).val();
                $oDiv.html($html);
                outer[newCaseClass] = {};
                sessionStorage.setItem('outer', JSON.stringify(outer));
                window['caseLength'] ++;

                /*对case进行判断，解决在删除所有case后新建case的bug*/
                if ($('.case').length > 1) {
                    var $oldSelectedCase = $('.case.selected').attr('class').split(' ')[0];
                    if ($oldSelectedCase) {
                        $('#center_body').find('.' + $oldSelectedCase).remove();
                    };
                    $('.case').removeClass('selected');
                }

                $oDiv.addClass('selected');
                var $outerCase = $('<div class="' + newCaseClass + '"></div>');
                $outerCase.appendTo($('#center_body'));

                $('#title').val('');
                $('#content').html('');
                /*解决‘删除’图标出现时新建一个case，导致新case没有该图标而其他case该图标显示的bug*/
                $('.delete').hide();
            }

        });
        $(document).keydown(function (e) {
            if (e.keyCode == 13) {
                if (!$newInput.val()) {
                    $oDiv.remove();
                } else {
                    var $html = $newInput.val();
                    $oDiv.html($html);
                    outer[newCaseClass] = {};
                    sessionStorage.setItem('outer', JSON.stringify(outer));
                    window['caseLength'] ++;

                    if ($oldSelectedCase) {
                        $('#center_body').find('.' + $oldSelectedCase).remove();
                    };

                    $oDiv.addClass('selected').siblings().removeClass('selected');
                    var $outerCase = $('<div class="' + newCaseClass + '"></div>');
                    $outerCase.appendTo($('#center_body'));

                    $('#title').val('');
                    $('#content').html('');
                    /*解决‘删除’图标出现时新建一个case，导致新case没有该图标而其他case该图标显示的bug*/
                    $('.delete').hide();
                }
            }
        });
    }

    //切换case
    exports.changeCase = function (obj) {
        //加入对case内容的判断，解决新建case，在input未blur时点击case时出现的bug
        if (obj.text()) {
            var $selectedCase = $('.case.selected').attr('class').split(' ')[0];
            $('#center_body').find('.' + $selectedCase).remove();
            $('.case').removeClass('selected');
            obj.addClass('selected');
            var newCaseName = obj.attr('class').split(' ')[0];
            var outer = JSON.parse(sessionStorage.getItem('outer'));
            var newItems = outer[newCaseName];
            var outerCase = $('<div class="' + newCaseName + '"></div>');
            outerCase.appendTo('#center_body');

            var flag = 1; //用来对一个item做特殊处理
            for (var i in newItems) {
                var $innerCase = $('<div class="' + i + ' item"></div');
                $innerCase.appendTo(outerCase);
                $('<h5>' + newItems[i].title + '</h5>').appendTo($innerCase);
                $('<p>' + newItems[i].content + '</p>').appendTo($innerCase);
            }

            outerCase.find('.item:first-child').addClass('selected');
            var itemName = $('.item.selected').attr('class').split(' ')[0];


            $('#title').val(newItems[itemName].title);
            $('#content').html(''); //先清空
            if (Object.getOwnPropertyNames(newItems[itemName]).length == 2) {
                //如果不是canvas
                $('#content').html(newItems[itemName].content);
            } else if (Object.getOwnPropertyNames(newItems[itemName]).length == 3) {
                //如果是canvas
                var oImg = $('<img src="" alt="">');
                oImg.attr('src', newItems[itemName].bigImg).appendTo($('#content'));
            }

            /*在Markdown框显示的情况下切换case*/
            if ($('#markdown').is(':visible')) {
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

    //删除case
    exports.deleteCase = function (obj) {
        var $out = obj.parent('.out');
        var $caseClass = obj.siblings('.case').attr('class').split(' ')[0];
        var outer = JSON.parse(sessionStorage.getItem('outer'));
        delete outer[$caseClass];
        sessionStorage.setItem('outer', JSON.stringify(outer));

        /*删除当前case后将旁边case的内容展示出来*/
        if (obj.siblings('.case').is('.selected')) {
            var nearCase;
            if ($out.next('.out').length > 0) {
                nearCase = $out.next('.out').find('.case');
            } else if ($out.prev('.out').length > 0) {
                nearCase = $out.prev('.out').find('.case');
            } else {
                nearCase = '';
            }
            if (nearCase) {
                $('#center_body').find('div').remove();
                nearCase.addClass('selected');
                var nearCaseClass = nearCase.attr('class').split(' ')[0];
                var newItems = outer[nearCaseClass];

                var $outerCase = $('<div class="' + nearCaseClass + '"></div>');
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
    }


    exports.changeTitle = function (obj) {
        $that = obj;
        var oldHtml = $that.text();
        if (!oldHtml) {
            $that.remove();
        } else {
            var $newInput = $('<input type="text">');
            $newInput.css('width', '100px');
            obj.html('');
            obj.append($newInput);
            $newInput.focus();
            $newInput.blur(function () {
                var $html = $(this).val() ? $(this).val() : $oldHtml;
                $that.html($html);
            })

            $(document).keydown(function (e) {
                if (e.keyCode == 13) {
                    var $html = $newInput.val() ? $newInput.val() : oldHtml;
                    $that.html($html);
                }
            })
        }

    }

})