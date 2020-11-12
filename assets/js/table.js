$.post("http://192.168.2.220:8080/scan/listall",
{
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innerHTMl(datas.devicelist);
    }
    else{
        console.log(data);
    }
});
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
            <td><a href="assets/file/${json[i].pid}.txt"><button class="btn btn-primary" type="button" pid="${json[i].pid}">下载报告</button></a><br></td>
            </tr>`
            $("#dataTable tbody").append(str);
        }
    }
};