/**
 * Created by carson on 2016/6/12.
 */
var newArticle = {
    id: 'null',
    title: '新文章',
    closable: true,
    tbar: [{
        xtype: 'button',
        text: '上传文件',
        handler: function () {
            var uploadWin = Ext.getCmp("uploadFileWin");
            if (!uploadWin) {
                uploadWin = new Ext.Window({
                    modal: true,
                    title: "导入文档",
                    width: 400,
                    id: "uploadFileWin",
                    height: 230,
                    bodyBorder: false,
                    layout: "fit",
                    bodyStyle: "background-color:#FFF",
                    items: [{
                        border: false,
                        id: "uploadForm",
                        xtype: "form",
                        fileUpload: true,
                        style: "padding-top:50px;",
                        items: [{
                            xtype: 'textfield',
                            inputType: 'file',
                            id: "uploadFileTextF",
                            name: 'uploadFile',
                            labelStyle: 'text-align:right;font-weight:bold',
                            allowBlank: false,
                            fieldLabel: '选择文件*'
                        }]
                    }],
                    buttonAlign: "center",
                    buttons: [{
                        text: "确定",
                        handler: function () {
                            var form = Ext.getCmp("uploadForm").form;
                            var fileName = Ext.getCmp("uploadFileTextF").getValue();
                            fileName = fileName.split('.');
                            fileName = fileName[fileName.length - 1];
                            //if(fileName!="doc"&&fileName!="docx"){
                            //    Ext.Msg.alert("系统提示","必须选择Microsoft Office Word 文档!");
                            //return false;
                            //}
                            if (form.isValid()) {
                                form.submit({
                                    method: 'post',
                                    url: '../WebManage?action=importWord', // 根据自己系统的需要调用程序处理上传文件 24
                                    waitMsg: '文件上传中...',
                                    success: function (form, action) {
                                        if (Ext.getCmp("title").getValue() == "")Ext.getCmp("title").setValue(action.result.fileName);
                                        htmlText.html(action.result.msg);
                                        Ext.Msg.alert("系统提示", "文件导入成功!(注：如有个别图片样式问题请截图插入)");
                                        Ext.getCmp("uploadFileWin").close();
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg.alert("系统提示", "文件上传失败!");
                                    }
                                });
                            } else {
                                Ext.Msg.alert("系统提示", "请选择文件后再上传!");
                            }
                        }
                    }, {
                        text: "关闭",
                        handler: function () {
                            Ext.getCmp("uploadFileWin").close();
                        }
                    }]
                });
            }
            uploadWin.show();
        }
    },
        {
            xtype: 'button',
            text: '保存',
            handler: function () {
                var id = Ext.getCmp('id').getValue();
                var title = Ext.getCmp('title').getValue();
                var content = Ext.htmlEncode(Ext.getCmp('content').getValue());
                var writer = Ext.getCmp('writer').getValue();
                var category = Ext.getCmp('category').getValue();

                Ext.Ajax.request({
                    url: 'article/save',

                    params: {
                        id: id,
                        title: title,
                        content: content,
                        writer: writer,
                        category: category
                    },
                    method: 'post',
                    success: function (response, options) {
                        Ext.MessageBox.alert('成功', '已保存');

                    },
                    failure: function (response, options) {
                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                    }
                });

            }
        }],
    items: [{
        id: 'title',
        xtype: 'textfield',
        name: "title",
        value: '',
        fieldLabel: "标题",
        width: 1000,
        height: 30
    }, {
        id: 'writer',
        value: '',
        xtype: 'combobox',
        name: "writer",
        store: userStore,
        displayField: "userName",
        valueField: "userName",
        editable: false,
        allowBlank: false,
        emptyText: "--请选择--",
        fieldLabel: "作者",
        width: 1000,
        height: 30
    }, {
        id: 'category',
        value: '',
        xtype: 'combobox',
        store: categoryStore,
        name: "category",
        displayField: "value",
        valueField: "value",
        editable: false,
        allowBlank: false,
        emptyText: "--请选择--",
        fieldLabel: "分类",
        width: 1000,
        height: 30
    },
        {
            id: 'content',
            value: '',
            xtype: "htmleditor",
            name: "content",
            fontFamilies: ["宋体", "隶书", "黑体"],
            fieldLabel: "内容",
            width: 1000,
            height: 500
        },
        {
            id: 'id',
            xtype: 'textfield',
            name: "id",
            value: 'null',
            hidden: true,
            fieldLabel: "id",
            width: 1000,
            height: 30
        },
    ]
};