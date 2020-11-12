$.post("http://192.168.2.220:8080/emergency/get",
{
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(datas.data)
    }
    else{
        console.log(data);
        alert("获取系统日志失败");
    }
});
function innerHTMl(data) {
    $('#contenthere').empty();
    var json=eval(data);
    console.log(json)
    for(var i=0; i<json.length; i++) 
    {
            var str=`<li class="list-group-item" style="margin-bottom:6px;">
            <div class="media">
                <div></div>
                <div class="media-body">
                    <div class="media" style="overflow:visible;">
                        <div><img class="mr-3" style="width: 50px; height:50px;" src="assets/img/avatars/${json[i].uuid}.jpg"></div>
                        <div class="media-body" style="overflow:visible;">
                            <div class="row">
                                <div class="col-md-12">
                                    <p><a href="#">${json[i].username}:</a> ${json[i].content} <br>
                                        <small class="text-muted">${json[i].date} </small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>`
            $("#contenthere").append(str);
    }
};