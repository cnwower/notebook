define(function (require, exports, module) {
    var $ = require('jquery');
    var initial = require('initial');
    var item = require('item');
    var panel = require('panel');
    var canvas = require('canvas');
    var oCase = require('case');
    /*var frame = require('frame');*/

    //初始化
    initial.initial();

    //点击保存按钮
    $('#keep').click(function () {
        item.save();
    })

    //点击新item，切换过去
    $('#center_body').on("click", '.item', function () {
        item.change($(this));
    })

    //监控键盘按键，删除当前item
    $(document).keydown(function (e) {
        e = e || Event;
        item.delete(e);
    })

    //新建item
    $('#addNewItem').click(function () {
        item.newItem();
    })

    //新建涂鸦
    $('#addNewPanel').click(function () {
        panel.newPanel();
    })

    //监控涂鸦
    canvas.listener();

    //新建case
    $('#add').click(function () {
        oCase.newCase();
    })

    //切换case
    $('#left').on('click', '.case', function () {
        oCase.changeCase($(this));
    })

    //切换case删除图标状态
    $('#midden').click(function () {
        if ($('.delete').is(':visible')) {
            $('.delete').hide();
        } else {
            $('.delete').show();
        }
    });

    //删除case
    $('ul').on('click', '.delete', function () {
        oCase.deleteCase($(this));
    })

    //case改名
    $('#left').on('dblclick', '.case', function () {
        oCase.changeTitle($(this));
    })

    //显示Markdown框
/*    $('#stretch').click(function () {
        frame.showMarkdown();
    })*/
})