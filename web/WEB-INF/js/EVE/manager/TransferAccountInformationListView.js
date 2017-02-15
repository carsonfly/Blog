/**
 * Created by carson on 2016/7/15.
 */
/**
 * Created by carson on 2016/6/13.
 */
var TransferAccountInformationListView = Ext.create('Ext.ListView', {
    title: '转账信息',
    store: TransferAccountInformationStore,
    multiSelect: true,
    border: false,
    reserveScrollOffset: true,
    hideHeaders: false,        //是否隐藏标题
    emptyMsg: "没有记录", //没有数据时显示信息
    columns: [{
        header: "类型",
        dataIndex: 'type',
        width: 50

    }, {
        header: "转账",
        dataIndex: 'isk',
        width: 100

    },
        {
            header: "余额",
            dataIndex: 'balance',
            width: 100

        },
        {
            header: "用户名",
            dataIndex: 'userName',
            width: 100

        },
        {
            header: "角色名",
            dataIndex: 'playerName',
            width: 100

        },
        {
            dataIndex: 'date',
            header: "时间",
            width: 200,
            renderer: function (val) {
                return new Date(parseInt(val)).toLocaleString();
            }
        },
    ],
    stripeRows: true, //斑马线效果
    selType: 'cellmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        })
    ],
    tbar: [
        //{
        //    xtype: 'button',
        //    text: '添加转账信息',
        //    handler: function () {
        //        var p = {
        //            id: '',
        //            player: '',
        //            isk: '',
        //            time:new Date()
        //        };
        //        ISKStore.insert(0, p);
        //
        //    }
        //},
        {
            xytpe: 'button',
            text: '删除',
            handler: function () {
                Ext.Msg.confirm('系统提示', '确定要删除？', function (btn) {
                    if (btn == 'yes') {
                        var sm = ISKListView.getSelectionModel();
                        var cellIndex = sm.getSelection();//获取被选择的单元格的行和列索引

                        //printObject(cellIndex[0]['index']);
                        var record = cellIndex[0];
                        Ext.Ajax.request({
                                url: '/eve/isk/delete.do',
                                params: {
                                    id: record.get('id')
                                },
                                method: 'POST',
                                timeout: 2000,

                                success: function (response, options) {
                                    Ext.MessageBox.alert('成功', '删除成功');
                                    ISKStore.remove(record);
                                },
                                failure: function (response, options) {
                                    Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                                }
                            }
                        )
                        ISKStore.remove(record);
                    }
                });
            }
        },
        {
            xtype: 'button',
            text: '刷新',
            handler: function () {
                TransferAccountInformationStore.load();
            }
        },
        //{
        //    xytpe: 'button',
        //    text: '保存',
        //    handler: function () {
        //
        //        var records = ISKStore.getUpdatedRecords();// 获取修改的行的数据，无法获取幻影数据
        //        var phantoms=ISKStore.getNewRecords( ) ;//获得幻影行
        //        records=records.concat(phantoms);//将幻影数据与真实数据合并
        //        if (records.length == 0) {
        //            Ext.MessageBox.show({
        //                title : "提示",
        //                msg : "没有任何数据被修改过!"
        //                // icon: Ext.MessageBox.INFO
        //            });
        //            return;
        //        } else {
        //            Ext.Msg.confirm("请确认", "是否真的要修改数据？", function (button, text) {
        //                if (button == "yes") {
        //                    var data = [];
        //                    // alert(records);
        //                    Ext.Array.each(records, function (record) {
        //                        data.push(record.data);
        //                        // record.commit();// 向store提交修改数据，页面效果
        //                    });
        //
        //                    Ext.Ajax.request({
        //                        url: '/eve/isk/update.do',
        //                        params: {
        //                            alterISKs: Ext.encode(data)
        //                        },
        //                        method: 'POST',
        //                        timeout: 2000,
        //
        //                        success: function (response, opts) {
        //                            var success = Ext.decode(response.responseText).success;
        //                            // 当后台数据同步成功时
        //                            if (success) {
        //                                Ext.Array.each(records, function (record) {
        //                                    // data.push(record.data);
        //                                    record.commit();// 向store提交修改数据，页面效果
        //                                    ISKStore.load();
        //                                });
        //                            } else {
        //                                Ext.MessageBox.show({
        //                                    title: "提示",
        //                                    msg: "数据修改失败!"
        //                                    // icon: Ext.MessageBox.INFO
        //                                });
        //                            }
        //                        }
        //                    });
        //                }
        //            });
        //        }
        //    }
        //},

    ]
    //设置背景图片
    //bodyStyle: {
    //    //background: '#ffc',
    //    background: 'url(/img/desktop.jpg) no-repeat #00FFFF',
    //    padding: '10px'
    //},


});