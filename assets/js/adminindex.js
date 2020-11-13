$.post("http://192.168.2.219/overview/get",
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