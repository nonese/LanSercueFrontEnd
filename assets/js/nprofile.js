var uuid =getQueryVariable("uuid");
console.log(uuid);
$.post("http://127.0.0.1:8080/user-info/get",
    {
        uuid:uuid,
    },
    function(data,status){
        var datas=JSON.parse(data);
        if(datas.status == "success"){
            console.log(data);
            /*innerHTMl(datas);*/
        }
        else{
            console.log(data);
            alert("查无此人");
        }
    });
$("#input-id").fileinput(
    {
        language: 'zh',
        uploadUrl: 'http://192.168.2.184:8080/file/jpg',
        allowedFileExtensions : ['jpg','png'],
        uploadExtraData : function() {  //传递参数
            var data={
                uuid:"83992asd",
                };
                return data; 
     },
        maxFileCount: 1,
        enctype: 'multipart/form-data',
    }
).on("fileuploaded", function(event, data){//上传成功事件
        if(data.response.status == "success"){
            $('#myavatar').attr("src",data.response.filename);
            $('#smallavatar').attr("src",data.response.filename);
            alert("上传成功");
        }
        else{
            alert("状态:"+data.response.status)
        }
});
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
};