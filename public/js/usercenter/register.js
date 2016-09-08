$(document).ready(function() {
    $('form').submit(function(e) {
        $('#msg-error').hide();
        $('#msg-success').hide();
        $('.overlay').show();
        e.preventDefault();
        var csrf = $('meta[name=csrf-token]').attr('content');
        var arr = $('form').serializeArray(), data = {_csrf: csrf};
        for (i in arr)
            data[arr[i].name] = arr[i].value;
        arr = null;
        $.post('/api/user/register', data,
            function(res) {
                $('.overlay').hide();
                $('#msg-success-p').html(res.msg);
                $('#msg-success').show();
                window.location.href='/usercenter/login';
            }, "json").error(function(e) {
                $('.overlay').hide();
                $('#msg-error-p').html(JSON.parse(e.responseText).err);
                $('#msg-error').show();
            });
    });
});
