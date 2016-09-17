$(document).ready(() => {
    $('#submit').on('click', (e) => {
        e.preventDefault();
        var data = 'fid=' + $('#fid').val() + '&title=' + $('#title').val() + '&source='+$('#f_source').val()+'&folder='+$('#folder').val()+'&pages='+$('#pages').val()+'&type='+$('.type:checked').val()+'&expiretime='+$('#expireday').val()+'&authority='+$('.author:checked').val();
        $.ajax({
            url: '/admin/insert',
            data: data,
            method: 'post',
            dataType: 'json',
            success: (data) => {
                alert('插入成功');
                location.reload();
            },
            error: (data) => {
                alert(data.toString());
            }
        })

    })
});

