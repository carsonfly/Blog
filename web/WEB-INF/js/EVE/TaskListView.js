/**
 * Created by carson on 2016/7/15.
 */
/**
 * Created by carson on 2016/6/13.
 */
var checkedRow = -1;
var itemValue = -1;
var TaskListView = Ext.create('Ext.ListView', {
    title: 'EVE大乐透',
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
        header: "剩余概率",
        dataIndex: 'remainPart',
        width: 100,
        renderer: function (val) {
            return val + '%';
        }
        //editor: {
        //    xtype: 'textfield',
        //    allowBlank: false
        //}
    }, {
        header: "每1%概率价格",
        dataIndex: 'value',
        width: 200,
        renderer: function (val) {
            return val / 100;
        }
        //editor: {
        //    xtype: 'textfield',
        //    allowBlank: false
        //}
    }, {
        header: "正在抽奖",
        dataIndex: 'note',
        width: 200

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
        //{
        //    xytpe: 'button',
        //    text: '删除',
        //    handler: function () {
        //        Ext.Msg.confirm('系统提示', '确定要删除？', function (btn) {
        //            if (btn == 'yes') {
        //                var sm = TaskListView.getSelectionModel();
        //                var cellIndex = sm.getSelection();//获取被选择的单元格的行和列索引
        //                //printObject(cellIndex[0]['index']);
        //                var record = cellIndex[0];
        //                Ext.Ajax.request({
        //                    url: '/eve/task/delete.do',
        //                    params: {
        //                        id: record.get('id')
        //                    },
        //                    method: 'POST',
        //                    timeout: 2000,
        //
        //                        success: function (response, options) {
        //                            Ext.MessageBox.alert('成功', '删除成功');
        //                            TaskStore.remove(record);
        //                        },
        //                        failure: function (response, options) {
        //                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
        //                        }
        //                    }
        //                )
        //                TaskStore.remove(record);
        //            }
        //        });
        //    }
        //},
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
                var VoteNumber = 0;
                //Ext.Msg.confirm('系统提示', '确定要投注？', function (btn) {
                // if (btn == 'yes') {
                var sm = TaskListView.getSelectionModel();
                var cellIndex = sm.getSelection();//获取被选择的单元格的行和列索引
                //printObject(cellIndex[0]['index']);
                var record = cellIndex[0];


                if (loginUser == null) {
                    Ext.Msg.alert('提示', '还未登录,请登录后再投注');
                    return;
                }
                if (loginUser.isk == null || (record != null && loginUser.isk < record.data.value / record.data.part)) {
                    Ext.Msg.alert('提示', '账户余额不足');
                    return;
                }
                function getTaskId() {
                    if (record != null) {
                        checkedRow = record.get('id');
                        itemValue = record.data.value / record.data.part;
                        return record.get('id');
                    }
                    else if (record == null && checkedRow != -1) {

                        record = TaskStore.getAt()
                        return checkedRow;
                    } else {
                        return null;
                    }
                }

                var taskId = getTaskId();
                if (taskId == null) {
                    Ext.Msg.alert('提示', '还没有选中投注项目');
                    return;
                }
                //alert(taskId);
                Ext.Ajax.request({
                        url: '/eve/Vote/vote.do',
                        params: {
                            taskId: taskId,
                            userId: loginUser.id,
                            voteNumber: VoteNumber
                        },
                        method: 'POST',
                        timeout: 2000,

                        success: function (response, options) {
                            var success = Ext.decode(response.responseText).success;

                            if (success) {
                                TaskStore.load();
                                //Ext.MessageBox.alert('成功', '投注成功');
                                //printObject(record.data);
                                loginUser.isk = loginUser.isk - (itemValue);
                                Ext.getCmp('playerIsk').setText('账户余额：' + loginUser.isk + ' isk');

                            }
                            else {
                                Ext.MessageBox.alert('失败', Ext.decode(response.responseText).msg);
                            }

                        },
                        failure: function (response, options) {
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    }


                    //}
                );

            }

        },
        //{
        //    id:'VoteNumber',
        //    xtype: 'numberfield',
        //    fieldLabel: '投注数字',
        //    msgTarget: 'side',
        //    labelWidth: 75,
        //    maxLength:20,
        //    value:'1',
        //    hideTrigger: true, // 隐藏微调按钮
        //    allowDecimals: false, // 不允许输入小数
        //    allowBlank:false
        //}


    ]


});