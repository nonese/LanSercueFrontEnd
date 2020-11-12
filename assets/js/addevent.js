var uuid =localStorage.getItem("uuid"||'[]');
console.log(uuid)
function addevent(element){
$.post("http://192.168.2.220:8080/emergency/add",
{
    uuid:uuid,
    name:$("#name").val(),
    content:$("#content").val()
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        alert("发布成功");
    }
    else{
        alert("增加失败");
    }
});
}