$(document).ready(function(){
   $('#reload').on('click', () =>{
      location.reload();
    });
   $('#btn_ajax').on('click', function (event) {
       event.preventDefault();
       var data = 'title=' + $('#se').val();
       $('#se').val('');
       var userid = $('#span_name').text();
       $.ajax({
           url: '/users/search',
           type: 'post',
           data: data,
           dataType: 'json',
           success: function(data){
               // 每一次ajax提交,清空整个表格内容
               $('#se_table').empty();
               // 添加一个表头
               $('#se_table').append(`<tr>
               <th>档号</th>
               <th>标题</th>
               <th>类别</th>
               <th>来源</th>
               <th>页码</th>
               <th>卷号</th>
               <th>借阅</th>
               </tr>`);
               // 添加内容
               var styles = ['文书档案', '科技档案', '财务档案', '人事档案', '声像档案', '电子档案', '其它'];
               var len = data.length;
               for(var i=0; i<len; i++){
                    $('#se_table').append(`<tr>
                    <td>${data[i].fid}</td>
                    <td>${data[i].title}</td>
                    <td>${styles[data[i].type]}</td>
                    <td>${data[i].source}</td>
                    <td>${data[i].pages}</td>
                    <td>${data[i].folder}</td>
                    <td><a href="/users/${data[i].fid}/${userid}/borrow"><button class="btn btn-primary">借阅</button></a></td>
                    </tr>`);
               }
           },
           error: function(data) {
               alert('error!');
           }
       });
   });
});


