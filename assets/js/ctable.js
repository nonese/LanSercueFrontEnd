$.post("http://192.168.2.220:8080/api/user/list?role=admin",
{
},
function(data,status){
    /*alert("数据: \n" + data + "\n状态: " + status+"\n");*/
    var datas = JSON.parse(data);
    //console.log(datas.loginstatus)
    if (datas.status == "success"){ 
        console.log("查询成功");
        console.log(datas.data);
        innerHTMladmin(datas.data);
    }
    else{
        console.log("查询管理员列表失败")
    }
});
$.post("http://192.168.2.220:8080/api/user/list",
{
    role:"op",
},
function(data,status){
    /*alert("数据: \n" + data + "\n状态: " + status+"\n");*/
    var datas = JSON.parse(data);
    //console.log(datas.loginstatus)
    if (datas.status == "success"){ 
        console.log("查询成功")
        console.log(datas.data)
        innerHTMlop(datas.data);
    }
    else{
        console.log("查询运维列表失败")
    }
});
$.post("http://192.168.2.220:8080/api/user/list",
{
    role:"nm",
},
function(data,status){
    /*alert("数据: \n" + data + "\n状态: " + status+"\n");*/
    var datas = JSON.parse(data);
    //console.log(datas.loginstatus)
    if (datas.status == "success"){ 
        console.log("查询成功")
        console.log(datas.data)
        innerHTMlnm(datas.data);
    }
    else{
        console.log("查询普通用户列表失败")
    }
});
function adduser(element){
    console.log($("#username").val())
    console.log($("#password").val())
    var password = $("#password").val();
    setMaxDigits(131);
    var key = new RSAKeyPair("010001", '', "00b15fdee0d7ed06c21067d59e65031becca4c3eafe52d891725c75c37dac7ca2d");
    var result = encryptedString(key, password);
    console.log(result)
    $.post("http://192.168.2.220:8080/api/user/AddUser",
    {
        username:$("#username").val(),
        /*password:result*/
        password:result,
        role:$("#role").val(),
    },
    function(data,status){
        /*alert("数据: \n" + data + "\n状态: " + status+"\n");*/
        var datas = JSON.parse(data);
        //console.log(datas.loginstatus)
        if (datas.addstatus == "success"){ 
            if($("#role").val() =="admin"){
                inneradminHTMl();}
            if($("#role").val()=="op"){
                inneropHTMl();
            }
            if($("#role").val()=="nm"){
                innernmHTMl();
            }
            alert("添加成功!")
        }
        else{
            alert("失败！原因："+datas.addstatus)
        }
   });
};
function deluser(element){
    var id=$(element).attr("userid");
    console.log(id);
    $.post("http://192.168.2.220:8080/api/user/del",
    {
        username:id,
    },
    function(data,status){
        /*alert("数据: \n" + data + "\n状态: " + status+"\n");*/
        var datas = JSON.parse(data);
        //console.log(datas.loginstatus)
        if (datas.status == "success"){
            alert("删除成功!")
            $(element).parent().parent().remove();
        }
        else{
            alert("删除失败！")
        }
   });
};
function inneradminHTMl() {
    /*$('#dataTable tbody').empty();*/
        var str=`<tr>
        <td>${$("#username").val()}</td>
        <td>管理员</td>
        <td><button class="btn btn-primary" type="button">设置用户</button><button class="btn btn-primary" type="button" userid="${$("#username").val()}" onclick="deluser(this)">删除用户"</button><br></td>
        </tr>`
        $("#adminTable tbody").append(str);
};
function inneropHTMl() {
    /*$('#dataTable tbody').empty();*/
        var str=`<tr>
        <td>${$("#username").val()}</td>
        <td>运维</td>
        <td><button class="btn btn-primary" type="button">设置用户</button><button class="btn btn-primary" type="button" userid="${$("#username").val()}" onclick="deluser(this)">删除用户</button><br></td>
        </tr>`
        $("#opTable tbody").append(str);
};
function innernmHTMl() {
    /*$('#dataTable tbody').empty();*/
        var str=`<tr>
        <td>${$("#username").val()}</td>
        <td>运维</td>
        <td><button class="btn btn-primary" type="button">设置用户</button><button class="btn btn-primary" type="button" userid="${$("#username").val()}" onclick="deluser(this)">删除用户</button><br></td>
        </tr>`
        $("#nmTable tbody").append(str);
};
function innerHTMladmin(data) {
    $('#adminTable tbody').empty();
    var json=eval(data);
    for(var i=0; i<json.length; i++) 
    {
        var str=`<tr>
        <td>${json[i].username}</td>
        <td>管理员</td>
        <td><button class="btn btn-primary" type="button">设置用户</button><button class="btn btn-primary" type="button" userid="${json[i].username}" onclick="deluser(this)">删除用户</button><br></td>
        </tr>`
        $("#adminTable tbody").append(str);
    }
};
function innerHTMlop(data) {
    $('#opTable tbody').empty();
    var json=eval(data);
    for(var i=0; i<json.length; i++) 
    {
        var str=`<tr>
        <td>${json[i].username}</td>
        <td>运维</td>
        <td><button class="btn btn-primary" type="button">设置用户</button><button class="btn btn-primary" type="button" userid="${json[i].username}" onclick="deluser(this)">删除用户</button><br></td>
        </tr>`
        $("#opTable tbody").append(str);
    }
};
function innerHTMlnm(data) {
    $('#nmTable tbody').empty();
    var json=eval(data);
    for(var i=0; i<json.length; i++) 
    {
        var str=`<tr>
        <td>${json[i].username}</td>
        <td>普通用户</td>
        <td><button class="btn btn-primary" type="button">设置用户</button><button class="btn btn-primary" type="button" userid="${json[i].username}" onclick="deluser(this)">删除用户</button><br></td>
        </tr>`
        $("#nmTable tbody").append(str);
    }
};