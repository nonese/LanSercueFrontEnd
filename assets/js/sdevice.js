function addnormaldevice(element){
    var uuid =localStorage.getItem("uuid"||'[]');
    console.log(uuid)
    $.post("http://127.0.0.1:8080/device/add",
    {
        area:$("#area").val(),
        ip:$("#ip").val(),
        mac:$("#mac").val(),
        name:$("#name").val(),
        port:"",
        uuid:uuid,
        type:$("#type").val()
    },
    function(data,status){
        var datas=JSON.parse(data);
        if(datas.status == "success"){
            console.log(data);
            alert("添加成功！");
        }
        else{
            console.log(data);
            alert(datas.status);
        }
    });
}
function addserverdevice(element){
    var uuid =localStorage.getItem("uuid"||'[]');
    console.log(uuid)
    $.post("http://127.0.0.1:8080/device/add",
    {
        area:$("#sarea").val(),
        ip:$("#sip").val(),
        mac:$("#smac").val(),
        name:$("#sname").val(),
        port:$("#sport").val(),
        uuid:uuid,
        type:"server"
    },
    function(data,status){
        var datas=JSON.parse(data);
        if(datas.status == "success"){
            console.log(data);
            alert("添加成功！");
        }
        else{
            console.log(data);
            alert(datas.status);
        }
    });
}