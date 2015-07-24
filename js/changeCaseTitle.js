$(function () {
    $('#left').on('dblclick', '.case', function () {
        $that = $(this);
        var $oldHtml = $(this).text();
        if (!$oldHtml) {
            $(this).remove();
        } else {
            var $newInput = $('<input type="text">');
            $newInput.css('width', '100px');
            $(this).html('');
            $(this).append($newInput);
            $newInput.focus();
            $newInput.blur(function () {
                var $html = $(this).val() ? $(this).val() : $oldHtml;
                $that.html($html);
            })

            $(document).keydown(function (e) {
                if (e.keyCode == 13) {
                    var $html = $newInput.val() ? $newInput.val() : $oldHtml;
                    $that.html($html);
                }
            })
        }
    })

})