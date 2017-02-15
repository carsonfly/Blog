/**
 * Created by carson on 2016/6/13.
 */
var categoryListView = Ext.create('Ext.grid.Panel', {
    title: '类别管理',
    store: categoryStore,
    multiSelect: true,
    emptyText: '无数据',
    reserveScrollOffset: true,
    hideHeaders: false,        //是否隐藏标题
    tbar: [{
        xtype: 'button',
        text: '刷新',
        handler: function () {
            categoryStore.load();
        }
    },
        {
            xtype: 'button',
            text: '添加',
            handler: function () {
                tabIndex++;
                tabPanel.add({
                    id: tabIndex,
                    title: '新类别' + tabIndex,
                    closable: true,
                    tbar: [
                        {
                            xtype: 'button',
                            text: '保存',
                            handler: function () {
                                var value = Ext.getCmp('value').getValue();


                                Ext.Ajax.request({
                                    url: 'category/save',

                                    params: {

                                        value: value

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
                        id: 'value',
                        xtype: 'textfield',
                        name: "value",
                        fieldLabel: "类别",
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
                var items = categoryListView.getSelectionModel().getSelection();
                var id = items[0].get('id');
                Ext.Ajax.request({
                    url: 'category/delete',

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
                var items = categoryListView.getSelectionModel().getSelection();
                tabIndex++;
                tabPanel.add({
                    id: items[0].get('id'),
                    title: items[0].get('value'),
                    closable: true,
                    tbar: [
                        {
                            xtype: 'button',
                            text: '保存',
                            handler: function () {
                                var value = Ext.getCmp('value').getValue();


                                Ext.Ajax.request({
                                    url: 'category/save',

                                    params: {

                                        value: value

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
                        id: 'value',
                        xtype: 'textfield',
                        name: "value",
                        fieldLabel: "类别",
                        value: items[0].get('value'),
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
        header: "类别",
        dataIndex: 'value',
        width: 500
    }]
});