/**
 * Created by carson on 2016/6/12.
 */
var userListView = Ext.create('Ext.ListView', {
    title: '用户管理',
    store: userStore,
    multiSelect: true,
    emptyText: '无数据',
    reserveScrollOffset: true,
    hideHeaders: false,        //是否隐藏标题
    tbar: [{
        xtype: 'button',
        text: '刷新',
        handler: function () {
            userStore.load();
        }
    },
        {
            xtype: 'button',
            text: '添加',
            handler: function () {
                tabIndex++;
                tabPanel.add({
                    id: tabIndex,
                    title: '新用户' + tabIndex,
                    closable: true,
                    tbar: [
                        {
                            xtype: 'button',
                            text: '保存',
                            handler: function () {
                                var userName = Ext.getCmp('userName').getValue();
                                var userPassword = Ext.getCmp('userPassword').getValue();


                                Ext.Ajax.request({
                                    url: 'user/save',

                                    params: {

                                        userName: userName,
                                        userPassword: userPassword
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
                        id: 'userName',
                        xtype: 'textfield',
                        name: "userName",
                        fieldLabel: "用户名",
                        width: 800,
                        height: 30
                    }, {
                        id: 'userPassword',
                        xtype: 'textfield',
                        name: "userPassword",
                        fieldLabel: "密码",
                        width: 800,
                        height: 30
                    }]

                });
                tabPanel.setActiveTab(tabIndex);
            }
        }, {
            xtype: 'button',
            text: '删除',
            handler: function () {
                var items = userListView.getSelectionModel().getSelection();
                var id = items[0].get('id');
                Ext.Ajax.request({
                    url: 'user/delete',

                    params: {
                        id: id
                    },
                    method: 'post',
                    success: function (response, options) {
                        Ext.MessageBox.alert('成功', '删除成功');
                        store.load();
                    },
                    failure: function (response, options) {
                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                    }
                });
            }
        }, {
            xtype: 'button',
            text: '编辑',
            handler: function () {
                var items = userListView.getSelectionModel().getSelection();
                tabIndex++;
                tabPanel.add({
                    id: items[0].get('id'),
                    title: items[0].get('userName'),
                    closable: true,
                    tbar: [
                        {
                            xtype: 'button',
                            text: '保存',
                            handler: function () {
                                var userName = Ext.getCmp('userName').getValue();
                                var userPassword = Ext.getCmp('userPassword').getValue();


                                Ext.Ajax.request({
                                    url: 'user/save',

                                    params: {

                                        userName: userName,
                                        userPassword: userPassword
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
                        id: 'userName',
                        xtype: 'textfield',
                        name: "userName",
                        fieldLabel: "用户名",
                        value: items[0].get('userName'),
                        width: 800,
                        height: 30
                    }, {
                        id: 'userPassword',
                        xtype: 'textfield',
                        name: "userPassword",
                        value: items[0].get('userPassword'),
                        fieldLabel: "密码",
                        width: 800,
                        height: 30
                    }]

                });
                tabPanel.setActiveTab(tabIndex);
            }

        }
    ],
    columns: [{
        header: "ID",
        dataIndex: 'id',
        width: 100
    }, {
        header: "用户名",
        dataIndex: 'userName',
        width: 400
    }, {
        header: "密码",
        dataIndex: 'userPassword',
        width: 400
    }]
});
