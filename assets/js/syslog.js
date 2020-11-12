$.post("http://192.168.2.220:8080/system-log/getall",
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
    $('#dataTable tbody').empty();
    var json=eval(data);
    console.log(json)
    for(var i=0; i<json.length; i++) 
    {
            var str=`<tr>
            <td>${json[i].id}</td>
            <td>${json[i].role}</td>
            <td>${json[i].time}</td>
            <td>${json[i].content}</td>
            </tr>`
            $("#dataTable tbody").append(str);
    }
};
function searchimportant(element) {
    $.post("http://192.168.2.220:8080/system-log/get",
{
    role:"important"
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(datas.data)
    }
    else{
        console.log(data);
        alert("获取重要系统日志失败");
    }
});
};
function searchem(element) {
    $.post("http://192.168.2.220:8080/system-log/get",
{
    role:"critical"
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(datas.data)
    }
    else{
        console.log(data);
        alert("获取重要系统日志失败");
    }
});
};