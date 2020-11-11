
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