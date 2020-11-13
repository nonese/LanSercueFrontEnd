var session =localStorage.getItem("session"||'[]');
var uuid =localStorage.getItem("uuid"||'[]');
console.log(uuid)
var name =localStorage.getItem("name"||'[]');
var role =localStorage.getItem("role"||'[]');
if(role =='op'){
    $("#daishenpide").remove();
    $("#catbles").remove();
    $("#syslogs").remove();
    $("#addevents").remove();
    $("#tabless").remove();
    $("#seachdaishenpi").remove();
}
if(role == 'nm'){
    $("#logtree").remove();
    $("#daishenpide").remove();
    $("#catbles").remove();
    $("#syslogs").remove();
    $("#addevents").remove();
    $("#scantasks").remove();
    $("#Emergencys").remove();
    $("#tabless").remove();
    $("#seachdaishenpi").remove();
    $("#serverinput").remove();
}
$.post("http://192.168.2.220:8080/api/user/validate",
{
    sessionid:session,
},
function(data,status){
    var datas=JSON.parse(data);
    if(datas.status == "success"){
        console.log(data);
        $("#smallavatar").attr("src","assets/img/avatars/"+datas.uuid+".jpg");
        $("#usersname").text(name);
        $("#nprofile").attr("href","nprofile.html?uuid="+datas.uuid);
        $("#new2profile").attr("href","nprofile.html?uuid="+datas.uuid);
    }
    else{
        console.log(data);
        alert("会话过期，请重新登陆");
        window.location.href='login.html';
    }
});
/**
 *                                         <a class="d-flex align-items-center dropdown-item" href="#">
                                            <div class="mr-3">
                                                <div class="bg-primary icon-circle"><i class="fas fa-file-alt text-white"></i></div>
                                            </div>
                                            <div><span class="small text-gray-500">September 12, 2020</span>
                                                <p>恭喜你成功创建了账户，这是你的第一条提示!</p>
                                            </div>
                                        </a>
 */
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
/**
 * 登出
 * 
 */
function logout(element){
    localStorage.setItem("session","");
    localStorage.setItem("uuid","");
    localStorage.setItem("role","");
    localStorage.setItem("name","");
    window.location.href='login.html'
}