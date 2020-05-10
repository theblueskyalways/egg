let formidable = require('formidable'),
    fs = require('fs');

/*往本地上传图片*/
module.exports.upload = (req,res) =>{

    return new Promise((resolve,reject) => {
        try {
            //创建上传表单
            let form = new formidable.IncomingForm();

            //设置编辑
            form.encoding = 'utf-8';

            //设置上传目录
            form.uploadDir = 'public/upload/';

            //保留后缀
            form.keepExtensions = true;

            //文件大小 2M
            form.maxFieldsSize = 2 * 1024 * 1024;

            // 上传文件的入口文件
            form.parse(req, function(err, fields, files) {
                if (err) {
                    res.send(err.message);
                    return;
                }

                let extName = '';  //后缀名
                switch (files.file.type) {
                    case 'image/pjpeg':
                        extName = 'jpg';
                        break;
                    case 'image/jpeg':
                        extName = 'jpg';
                        break;
                    case 'image/png':
                        extName = 'png';
                        break;
                    case 'image/x-png':
                        extName = 'png';
                        break;
                    case 'application/zip':
                        extName = 'zip';
                        break;
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        extName = 'docx';
                        break;
                }

                let avatarName = Math.random() + '.' + extName;
                let newPath = form.uploadDir + avatarName;
                fs.renameSync(files.file.path, newPath);  //重命名

                resolve({
                    error:0,
                    url:newPath.slice(6),
                    name:files.file.name,
                    fields:fields,
                });
            });
        }catch (e) {
            console.log(e);
            reject({code:500,msg:e});
        }

    })

};