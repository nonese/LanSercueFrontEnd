var session =localStorage.getItem("session"||'[]');
$.post("http://192.168.2.220:8080/api/user/validate",
{
    sessionid:session,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
    }
    else{
        console.log(data);
        alert("会话过期，请重新登陆");
        window.location.href='login.html';
    }
});