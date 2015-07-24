$(function () {
    $('#stretch').click(function () {
        if (!$('#markdown').is(':visible')) {
            $('#markdown').show();
            $('#stretch').css('background', 'url(img/shrink.jpg) no-repeat center center');
            $('#m_title').html(markdown.toHTML($('#title').val()));
            $('#m_content').html(markdown.toHTML($('#content').val()));


            $('#title').keyup(function () {
                $('#m_title').html(markdown.toHTML($('#title').val()));
            })

            $('#content').keyup(function () {
                $('#m_content').html(markdown.toHTML($('#content').val()));
            })
        } else {
            $('#markdown').hide();
            $('#stretch').css('background', 'url(img/stretch.jpg) no-repeat center center');
        }
    })

})