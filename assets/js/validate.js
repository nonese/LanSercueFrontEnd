var session =localStorage.getItem("session"||'[]');
var uuid =localStorage.getItem("uuid"||'[]');
var name =localStorage.getItem("name"||'[]');
$.post("http://192.168.2.220:8080/api/user/validate",
{
    sessionid:session,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        $("#smallavatar").attr("src","assets/img/avatars/"+uuid+".jpg");
        $("#usersname").text(name);
    }
    else{
        console.log(data);
        alert("会话过期，请重新登陆");
        window.location.href='login.html';
    }
});