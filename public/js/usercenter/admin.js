$(document).ready(function() {
    $('#myModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('id');
        var modal = $(this);
        modal.find('.modal-title').text('查看社团名单');
        modal.find('.modal-body').html('<a href="/usercenter/admin/union/' + recipient + '" target="view_window">点此查看名单</a>');
        modal.find('.modal-body').append('<br /><a href="/usercenter/admin/csv/' + recipient + '" target="view_window">点此导出名单</a>');
    });
});
