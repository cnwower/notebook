$(function () {
    $('#add').click(function () {
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

           /*     if (!window[newCaseClass]) {
                    window[newCaseClass] = 0;
                }
                var $innderCase = $('<div class="' + window[newCaseClass] + ' ' + 'item selected' + '">' + '</div>');
                $('<h5></h5>').appendTo($innderCase);
                $('<p></p>').appendTo($innderCase);
                $innderCase.prependTo($($outerCase));
                window[newCaseClass] ++;*/

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

                   /* if (!window[newCaseClass]) {
                        window[newCaseClass] = 0;
                    }
                    var $innderCase = $('<div class="' + window[newCaseClass] + ' ' + 'item selected' + '">' + '</div>');
                    $('<h5></h5>').appendTo($innderCase);
                    $('<p></p>').appendTo($innderCase);
                    $innderCase.prependTo($($outerCase));
                    window[newCaseClass] ++;*/

                    $('#title').val('');
                    $('#content').html('');
                    /*解决‘删除’图标出现时新建一个case，导致新case没有该图标而其他case该图标显示的bug*/
                    $('.delete').hide();
                }
            }
        });

    })
})