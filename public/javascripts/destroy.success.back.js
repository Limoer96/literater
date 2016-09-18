$(document).ready(() => {
    $('.submit').on('click', () => {
       var fid = $('.get_id').val();
        $.ajax({
            url: '/admin/'+fid+'/destroy',
            type: 'get',
            success: function (data) {
                alert(data.message);
                location.reload();
            },
            error: function (data) {
                alert('出现了错误!');
            }
        })
    });
});


