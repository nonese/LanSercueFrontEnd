var uuid =localStorage.getItem("uuid"||'[]');
$.post("http://192.168.2.220:8080/scan/list",
{
    uuid:uuid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(datas.devicelist);
    }
    else{
        console.log("获取自己的扫描清单失败");
    }
});
function addscan(element){
    $.post("http://192.168.2.220:8080/scan/addscan",
{
    type:$("#type").val(),
    uuid:uuid,
    ip:$("#ip").val(),
    name:$("#name").val(),
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.scanstatus == "success"){
        console.log(data);
        alert("添加扫描成功功,任务目前状态："+datas.msg);
        innersingleHTMl(datas);
    }
    else{
        alert(datas.msg);
    }
});
}
function innersingleHTMl(data) {
    var name=$("#name").val();
    var ip =$("#ip").val();
    var type=$("#name").val();
    var json=eval(data);
    console.log(json)
        if($("#type").val() == "basic"){
            var str=`<tr>
            <td>${json.pid}</td>
            <td>${json.name}</td>
            <td>${json.ip}</td>
            <td>${json.type}</td>
            <td>${json.status}</td>
            <td>${json.date}</td>
            <td><a href="${json.filename}.html"><button class="btn btn-primary" type="button">下载报告</button></a><br></td>
            </tr>`
            $("#dataTable tbody").append(str);
        }
        else{
            var str=`<tr>
            <td>${json.pid}</td>
            <td>${json.name}</td>
            <td>${json.ip}</td>
            <td>${json.type}</td>
            <td>${json.status}</td>
            <td>${json.date}</td>
            <td><a href="assets/file/${json.pid}.txt"><button class="btn btn-primary" type="button">下载报告</button></a><br></td>
            </tr>`
            $("#dataTable tbody").append(str);
        }
};
function innerHTMl(data) {
    $('#dataTable tbody').empty();
    var json=eval(data);
    console.log(json)
    for(var i=0; i<json.length; i++) 
    {
        if(json[i].type == "basic"){
            var str=`<tr>
            <td>${json[i].pid}</td>
            <td>${json[i].name}</td>
            <td>${json[i].ip}</td>
            <td>${json[i].type}</td>
            <td>${json[i].status}</td>
            <td>${json[i].date}</td>
            <td><a href="assets/file/${json[i].pid}.html"><button class="btn btn-primary" type="button">下载报告</button></a><br></td>
            </tr>`
            $("#dataTable tbody").append(str);
        }
        else{
            var str=`<tr>
            <td>${json[i].pid}</td>
            <td>${json[i].name}</td>
            <td>${json[i].ip}</td>
            <td>${json[i].type}</td>
            <td>${json[i].status}</td>
            <td>${json[i].date}</td>
            <td><a href="assets/file/${json[i].pid}.txt"><button class="btn btn-primary" type="button">下载报告</button></a><br></td>
            </tr>`
            $("#dataTable tbody").append(str);
        }
    }
};