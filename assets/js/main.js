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
$.post("http://192.168.2.220:8080/tip/get",
{
    uuid:uuid,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        innermsgHTMl(datas.data)
    }
    else{
        console.log(data);
    }
});
function innermsgHTMl(data) {
    $('#neirong').empty();
    var json=eval(data);
    console.log(json)
    var y=0; 
    for(var i=0; i<json.length; i++) 
    {
        if(json[i].readed == "unread"){y++}
    }
    if(y>=3){
        console.log("大于3!");
        console.log(y)
        $("#countmsg").text("3+")
    }
    else if(y==0){ 
        console.log(y)
        console.log("=0")
        $("#countmsg").text("0")
    var str=`
    <a class="d-flex align-items-center dropdown-item" href="tips.html">
    <div class="mr-3">
        <div class="bg-primary icon-circle"><i class="fas fa-file-alt text-white"></i></div>
    </div>
    <div><span class="small text-gray-500">你暂时无未读消息</span>
    </div>
    </a>`
    $("#neirong").append(str);}
    else {
        console.log("进入2不是")
        console.log(y)
        $("#countmsg").text(y)
    }
    for(var i=0; i<=3; i++) 
    {
        if(json[i].readed == "unread"){
            var str=`
            <a class="d-flex align-items-center dropdown-item" href="tips.html">
            <div class="mr-3">
                <div class="bg-primary icon-circle"><i class="fas fa-file-alt text-white"></i></div>
            </div>
            <div><span class="small text-gray-500">${json[i].date}</span>
                <p>${json[i].content}</p>
            </div>
            </a>`
            $("#neirong").append(str);
        }
    }
};
function logout(element){
    localStorage.setItem("session","");
    localStorage.setItem("uuid","");
    localStorage.setItem("role","");
    localStorage.setItem("name","");
    window.location.href='login.html'
}