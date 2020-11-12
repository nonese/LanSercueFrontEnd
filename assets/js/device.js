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
function innerHTMl(data) {
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
            <td><button class="btn btn-primary" type="button" id="${json[i].uuid}" mac="${json[i].mac}" onclick="allowdevice(this)">是</button><br></td>
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