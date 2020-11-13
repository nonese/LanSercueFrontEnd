var role =localStorage.getItem("role"||'[]');
console.log(role)
var uuid =localStorage.getItem("uuid"||'[]');
if(role == 'admin'){
    console.log("admin")
    $.post("http://192.168.2.220:8080/device/list2",
{
    status:"wait",
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(datas.devicelist);
    }
    else{
        console.log(data);
        alert("获取待审批设备失败");
    }
});
$.post("http://192.168.2.220:8080/device/listall",
{
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl2(datas.devicelist);
    }
    else{
        console.log(data);
        alert("获取所有设备失败");
    }
});
if(role =='op'){
    console.log("进入op")
    $.post("http://192.168.2.220:8080/device/listall",
{
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl2(datas.devicelist);
    }
    else{
        console.log(data);
        alert("获取所有设备失败");
    }
});
}
if(role =='nm'){
    console.log("nm")
    $.post("http://192.168.2.220:8080/device/list",
{
    uuid:uuid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl2(datas.devicelist);
    }
    else{
        console.log(data);
        alert("获取所有设备失败");
    }
});
}
};
function innerHTMl(data) {
    $('#daidataTable tbody').empty();
    var json=eval(data);
    console.log(json)
    for(var i=0; i<json.length; i++) 
    {
            var str=`<tr>
            <td>${json[i].uuid}</td>
            <td>${json[i].name}</td>
            <td>${json[i].type}</td>
            <td>${json[i].ip}</td>
            <td>${json[i].mac}</td>
            <td>${json[i].area}</td>
            <td><button class="btn btn-primary" type="button" id="${json[i].uuid}" mac="${json[i].mac}" onclick="allowdevice(this)">是</button><br></td>
            </tr>`
            $("#daidataTable tbody").append(str);
    }
};
function innerHTMl2(data) {
    $('#dataTable tbody').empty();
    var json=eval(data);
    console.log(json)
    for(var i=0; i<json.length; i++) 
    {
            var str=`<tr>
            <td>${json[i].uuid}</td>
            <td>${json[i].name}</td>
            <td>${json[i].type}</td>
            <td>${json[i].ip}</td>
            <td>${json[i].mac}</td>
            <td>${json[i].area}</td>
            <td>${json[i].devicestatus}<br></td>
            </tr>`
            $("#dataTable tbody").append(str);
    }
};
function allowdevice(element) {
var uid =$(element).attr("id")
var mac =$(element).attr("mac")
$.post("http://192.168.2.220:8080/device/allow",
{
    uuid:uid,
    mac:mac,
    status:"allow"
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        $(element).parent().parent().remove();
    }
    else{
        console.log(data);
        alert("审批设备失败");
    }
});
};