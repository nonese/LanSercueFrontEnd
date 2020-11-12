var uuid =localStorage.getItem("uuid"||'[]');
$.post("http://192.168.2.220:8080/tip/get",
{
    uuid:uuid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(datas.data);
    }
    else{
        console.log(data);
    }
});
function addtip(element){
    console.log($("#content").val())
    $.post("http://192.168.2.220:8080/tip/add",
    {
        uuid:uuid,
        username:$("#username").val(),
        content:$("#content").val(),
        name:$("#name").val()
    },
    function(data,status){
        var datas=JSON.parse(data);
        if(datas.status == "success"){
            console.log(data);
            alert("发送成功");
        }
        else{
            console.log(data);
            alert(datas.status);
        }
    });
}
function settip(element){
    $.post("http://192.168.2.220:8080/tip/set",
    {
        uuid:uuid,
        readed:$(element).attr("role"),
        date:$(element).attr("date")
    },
    function(data,status){
        var datas=JSON.parse(data);
        if(datas.status == "success"){
            console.log(data);
            alert("设置成功");
            if ($(element).attr("role")=="readed"){$(element).prev().prev().prev().prev().text("已读")}
            else{$(element).prev().prev().prev().prev().text("未读")}
        }
        else{
            console.log(data);
            alert(datas.status);
        }
    });
}
function innerHTMl(data) {
    $('#dataTable tbody').empty();
    var json=eval(data);
    console.log(json)
    for(var i=0; i<json.length; i++) 
    {
        if(json[i].readed == "unread"){
            var str=`<tr>
            <td>未读</td>
            <td>${json[i].name}</td>
            <td>${json[i].content}</td>
            <td>${json[i].date}</td>
            <td><button class="btn btn-primary" date="${json[i].date}" type="button" role="readed" onclick="settip(this)">设置已读</button><button class="btn btn-primary" date="${json[i].date}" role="unread" type="button" onclick="settip(this)">设置未读</button></td>
        </tr>`
            $("#dataTable tbody").append(str);
        }
        else{
            var str=`<tr>
            <td>已读</td>
            <td>${json[i].name}</td>
            <td>${json[i].content}</td>
            <td>${json[i].date}</td>
            <td><button class="btn btn-primary" date="${json[i].date}" type="button" role="readed" onclick="settip(this)">设置已读</button><button class="btn btn-primary" date="${json[i].date}" role="unread" type="button" onclick="settip(this)">设置未读</button></td>
            </tr>`
            $("#dataTable tbody").append(str);
        }
    }
};