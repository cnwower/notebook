/*向sessionStorage写入初始的内容，并将case1的第一条初始内容的标题和内容分别给#center模块的第一个子模块*/



var outer = {
    "case0": {
        "case0_0": {
            "title": "说明",
            "content": "1. 支持笔记本的新建、双击改名及删除；<br>" + " 2. 支持笔记的新建、内容保存/修改及删除（按Delete键或清空内容及标题后切换笔记）；<br>" + "3. 内容保存时检测是否存在笔记本或笔记；<br>" + "4. 单击右下‘保存’图标或切换笔记可保存当前笔记内容；<br>" + "5. 单击内容右下‘箭头’图标展开Markdown语法解析窗口。"
        },
        "case0_1": {
            "title": "Markdown语法解析",
            "content": "0. 点击右下角箭头图标展开**Markdown**解析窗口；<br>" +
                "1. 支持实时解析，请在该窗口内输入内容。"
        }
    },
}


sessionStorage.setItem("outer", JSON.stringify(outer));

$(function () {
    //第一个case的长度，用作给新增加的item编号
    window['case0'] = 2;
    window['caseLength'] = 1;

    var caseName = $('.case.selected').attr('class').split(' ')[0];
    var item0 = $('#center_body').find('.case0').find('.item:eq(0)').attr('class').split(' ')[0];
    var item1 = $('#center_body').find('.case0').find('.item:eq(1)').attr('class').split(' ')[0];

    var getCase = JSON.parse(sessionStorage.getItem('outer'))[caseName];



    var item0Content = getCase[item0];
    var item1Content = getCase[item1];


    $('#title').val(item0Content.title);
    $('#content').html(item0Content.content);

    $('.item:eq(0)').find('h5').text(item0Content.title).end().find('p').html(item0Content.content);
    $('.item:eq(1)').find('h5').text(item1Content.title).end().find('p').html(item1Content.content);
})