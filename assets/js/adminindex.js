$.post("http://192.168.2.184:82/overview/get",
{
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        $("#extask").text(datas.examinetask);
        $("#nowtask").text(datas.nowtasks);
        $("#onlinedevice").text(datas.nowdevice);
        $("#totaldevice").text(datas.totaldevice);
        var baifenbi=datas.nowtasks/16*100;
        console.log(baifenbi);
        $("#baifenbi").attr("style","width: "+baifenbi+"%;");
    }
    else{
        console.log("获取清点失败");
    }
});
$.post("http://192.168.2.184:82/safereport/get",
{
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        InnerHtml(datas.data);
    }
    else{
        console.log("获取清点失败");
    }
});
function InnerHtml(data){
    var json=eval(data)
    for(var i=0;i<json.length;i++){
        var str=`<ul class="list-group list-group-flush">
        <li class="list-group-item">
            <div class="row align-items-center no-gutters">
                <div class="col mr-2">
                    <h6 class="mb-0"><strong>${json[i].title}</strong></h6><span class="text-xs">${json[i].content}</span></div>
            </div>
        </li>
    </ul>`
    $("#loudong").append(str)
    }
}