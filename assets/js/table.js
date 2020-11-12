$.post("http://192.168.2.220:8080/scan/listall",
{
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(data);
    }
    else{
        console.log(data);
    }
});
function innerHTMl(data) {
    $('#dataTable tbody').empty();
    var json=eval(data);
        var str=`<tr>
        <td>${json.pid}</td>
        <td>${json.name}</td>
        <td>${json.ip}</td>
        <td>${json.type}</td>
        <td>${json.status}</td>
        <td>${json.date}<br></td>
        </tr>`
        $("#adminTable tbody").append(str);
};