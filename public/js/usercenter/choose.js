$(document).ready(function() {
    $('#myModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('id');
        var modal = $(this);
        modal.find('.modal-title').text('查看社团详细信息 - ' + button.html());
        modal.find('.modal-body').html('<i class="fa fa-refresh fa-spin" style="font-size: 20px"></i>');
        var ensure = modal.find('.btn-primary');
        ensure.unbind();
        ensure.click(function(event) {
            event.preventDefault();
            if (confirm('确定选择该社团吗？选择了之后就不可以撤销！')) {
                $.get('/api/union/apply', {
                    id: recipient
                }, function(res) {
                    alert(res.err);
                });
            } else {
            }
        });
        $.get('/api/union/query', {
            id: recipient
        }, function(res) {
            modal.find('.modal-body').html('<pre>' + res.detail + '</pre>');
        });
    });
});
