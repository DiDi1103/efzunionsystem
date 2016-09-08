function add(num) {
    $.get('/api/union/member/add', {
        number: num
    }, function(doc) {
        if (doc.err) alert(doc.err);
        else alert(doc.msg);
        var t = $('#dataTable').DataTable();
        t.row.add([
            String(doc.name),
            String(doc.number),
            '<a href="javascript:delete(' + String(doc.number) + ')" style="padding: 0 10px 0 10px" class="btn btn-danger"> 删除'
        ]).draw();
    });
}

function del(num) {
    $.get('/api/union/member/del', {
        number: num
    }, function(doc) {
        alert(doc.msg);
    });
}

$(document).ready(function() {
});
