var session =localStorage.getItem("session"||'[]');
var uuid =localStorage.getItem("uuid"||'[]');
var name='';
console.log(session)
console.log(uuid)
$.post("http://192.168.2.220:8080/user-info/get",
{
    uuid:uuid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        name=datas.name;
        localStorage.setItem("name",name);
        $("#usersname").text(name);
    }
    else{
        console.log("获取名称失败");
    }
});
$.post("http://192.168.2.220:8080/api/user/validate",
{
    sessionid:session,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        $("#smallavatar").attr("src","assets/img/avatars/"+uuid+".jpg");
        $("#nprofile").attr("href","nprofile.html?uuid="+datas.uuid);
    }
    else{
        console.log(data);
        alert("会话过期，请重新登陆");
        window.location.href='login.html';
    }
});