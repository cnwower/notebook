/*实时保存内容*/
$(function(){
    $('#content').keyup(function(){
        var contentTemp = $(this).val();
        $(this).val(contentTemp);
    });
    $('#title').keyup(function(){
        var titleTemp = $(this).val();
        $(this).val(titleTemp);
    });
})