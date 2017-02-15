/**
 * Created by carson on 2016/7/15.
 */
/**
 * Created by carson on 2016/6/13.
 */
var TaskListView = Ext.create('Ext.ListView', {
    title: '抽奖管理',
    store: TaskStore,
    multiSelect: true,
    border: false,
    reserveScrollOffset: true,
    hideHeaders: false,        //是否隐藏标题
    emptyMsg: "没有记录", //没有数据时显示信息
    columns: [{
        header: "物品名称",
        dataIndex: 'itemName',
        width: 200
        //editor: {
        //    xtype: 'textfield',
        //    allowBlank: false
        //}
    }, {
        header: "物品等级",
        dataIndex: 'level',
        width: 100
        //editor: {
        //    xtype: 'textfield',
        //    allowBlank: false
        //}
    },
        {
            header: "抽奖开始时间",
            dataIndex: 'startTime',
            width: 200,
            //editor: {
            //    xtype: 'datefield',
            //    format:'20y-m-d H:m:s',
            //    allowBlank: false
            //},
            renderer: function (val) {
                return new Date(parseInt(val)).toLocaleString();
            }
        }, {
            header: "抽奖结束时间",
            dataIndex: 'endTime',
            width: 200,
            //editor: {
            //    xtype: 'datefield',
            //    format:'20y-m-d H:m:s',
            //    allowBlank: false
            //},
            renderer: function (val) {
                return new Date(parseInt(val)).toLocaleString();
            }
        }, {
            header: "分组",
            dataIndex: 'part',
            width: 50
            //editor: {
            //    xtype: 'textfield',
            //    allowBlank: false
            //}
        }, {
            header: "状态",
            dataIndex: 'done',
            width: 50
            //editor: {
            //    xtype: 'textfield',
            //    allowBlank: false
            //}
        }, {
            header: "获胜数字",
            dataIndex: 'winNumber',
            width: 50
            //editor: {
            //    xtype: 'textfield',
            //    allowBlank: false
            //}
        }, {
            header: "物品价值",
            dataIndex: 'value',
            width: 100

            //editor: {
            //    xtype: 'textfield',
            //    allowBlank: false
            //}
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
        //    text: '添加',
        //    handler: function () {
        //        var p = {
        //            id: '',
        //            itemName: '',
        //            level: '',
        //            startTime:new Date(),
        //            endTime:new Date(),
        //            part:'',
        //            done:'',
        //            winnerId:'',
        //            value:''
        //        };
        //        TaskStore.insert(0, p);
        //
        //    }
        //},
        {
            xytpe: 'button',
            text: '删除',
            handler: function () {
                Ext.Msg.confirm('系统提示', '确定要删除？', function (btn) {
                    if (btn == 'yes') {
                        var sm = TaskListView.getSelectionModel();
                        var cellIndex = sm.getSelection();//获取被选择的单元格的行和列索引
                        //printObject(cellIndex[0]['index']);
                        var record = cellIndex[0];
                        Ext.Ajax.request({
                                url: '/eve/task/delete.do',
                                params: {
                                    id: record.get('id')
                                },
                                method: 'POST',
                                timeout: 2000,

                                success: function (response, options) {
                                    Ext.MessageBox.alert('成功', '删除成功');
                                    TaskStore.remove(record);
                                },
                                failure: function (response, options) {
                                    Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                                }
                            }
                        )
                        TaskStore.remove(record);
                    }
                });
            }
        },
        {
            xtype: 'button',
            text: '刷新',
            handler: function () {
                TaskStore.load();
            }
        }, {
            xtype: 'button',
            text: '投注',
            handler: function () {
                var VoteNumber = Ext.getCmp('VoteNumber').getValue();
                Ext.Msg.confirm('系统提示', '确定要投注？', function (btn) {
                    if (btn == 'yes') {
                        var sm = TaskListView.getSelectionModel();
                        var cellIndex = sm.getSelection();//获取被选择的单元格的行和列索引
                        //printObject(cellIndex[0]['index']);
                        var record = cellIndex[0];
                        if (VoteNumber < 1 || VoteNumber > record.get('cycle')) {
                            Ext.Msg('提示', '投注范围:' + 1 + ' - ' + record.get('cycle'));
                            return;
                        }
                        Ext.Ajax.request({
                                url: '/eve/Vote/vote.do',
                                params: {
                                    taskId: record.get('id'),
                                    userId: 3,
                                    voteNumber: VoteNumber
                                },
                                method: 'POST',
                                timeout: 2000,

                                success: function (response, options) {
                                    var success = Ext.decode(response.responseText).success;
                                    if (success)
                                        Ext.MessageBox.alert('成功', '投注成功');

                                },
                                failure: function (response, options) {
                                    Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                                }
                            }
                        )

                    }
                });

            }

        },
        {
            id: 'VoteNumber',
            xtype: 'textfield',
            fieldLabel: '投注数字',
            msgTarget: 'side',
            labelWidth: 75,
            maxLength: 20,
            value: '1'
        }


        //{
        //    xytpe: 'button',
        //    text: '保存',
        //    handler: function () {
        //
        //        var records = TaskStore.getUpdatedRecords();// 获取修改的行的数据，无法获取幻影数据
        //        var phantoms=TaskStore.getNewRecords( ) ;//获得幻影行
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
        //                        url: '/eve/task/update.do',
        //                        params: {
        //                            alterTasks: Ext.encode(data)
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
        //                                    TaskStore.load();
        //                                });
        //                                Ext.MessageBox.show({
        //                                    title: "提示",
        //                                    msg: "数据修改成功!"
        //                                    // icon: Ext.MessageBox.INFO
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
        //  }
    ]
    //设置背景图片
    //bodyStyle: {
    //    //background: '#ffc',
    //    background: 'url(/img/desktop.jpg) no-repeat #00FFFF',
    //    padding: '10px'
    //},


});