/**
 * Created by carson on 2016/7/15.
 */
/**
 * Created by carson on 2016/6/13.
 */
var VoteListView = Ext.create('Ext.ListView', {
    title: '我的投注',
    store: VoteStore,
    multiSelect: true,
    border: false,
    reserveScrollOffset: true,
    hideHeaders: false,        //是否隐藏标题
    emptyMsg: "没有记录", //没有数据时显示信息
    columns: [
        {
            header: "抽奖任务",
            dataIndex: 'taskName',
            width: 100

        }, {
            header: "投注金额",
            dataIndex: 'isk',
            width: 200

        },
        {
            header: "投注项",
            dataIndex: 'vote',
            width: 100

        }, {
            header: "开奖结果",
            dataIndex: 'result',
            width: 100,
            renderer: function (value) {

                if (value == 0) {
                    return '还未开奖';
                }
                else {
                    return value;
                }
            }
        }, {
            header: "投注时间",
            dataIndex: 'time',
            width: 200,
            renderer: function (val) {
                return new Date(parseInt(val)).toLocaleString();
            }

        }


    ],
    stripeRows: true, //斑马线效果
    selType: 'cellmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        })
    ],
    tbar: [{
        xtype: 'button',
        text: '刷新',
        handler: function () {
            VoteStore.load();
        }
    }, {
        xtype: 'button',
        text: '仅显示中奖结果',
        handler: function () {
            for (var i = 0; i < VoteStore.getCount(); i++) {
                var record = VoteStore.getAt(i);
                //printObject(record.data);
                if (record.data['vote'] != record.data['result']) {
                    //printObject(record.data);
                    VoteStore.remove(record);
                    i--;
                }
            }

            // record.commit();// 向store提交修改数据，页面效果

        }
    }
        //    {
        //        xtype: 'button',
        //        text: '添加奖品信息',
        //        handler: function () {
        //            var p = {
        //                id: '',
        //                itemName: '',
        //                level: '',
        //                circle:'',
        //                part:'',
        //                value:''
        //            };
        //            AwardStore.insert(0, p);
        //
        //        }
        //    },
        //    {
        //        xytpe: 'button',
        //        text: '删除',
        //        handler: function () {
        //            Ext.Msg.confirm('系统提示', '确定要删除？', function (btn) {
        //                if (btn == 'yes') {
        //                    var sm = AwardListView.getSelectionModel();
        //                    var cellIndex = sm.getSelection();//获取被选择的单元格的行和列索引
        //                    //printObject(cellIndex[0]['index']);
        //                    var record = cellIndex[0];
        //                    Ext.Ajax.request({
        //                        url: '/eve/award/delete.do',
        //                        params: {
        //                            id: record.get('id')
        //                        },
        //                        method: 'POST',
        //                        timeout: 2000,
        //
        //                            success: function (response, options) {
        //                                Ext.MessageBox.alert('成功', '删除成功');
        //                                AwardStore.remove(record);
        //                            },
        //                            failure: function (response, options) {
        //                                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
        //                            }
        //                        }
        //                    )
        //                    AwardStore.remove(record);
        //                }
        //            });
        //        }
        //    },
        //    {
        //        xytpe: 'button',
        //        text: '保存',
        //        handler: function () {
        //
        //            var records = AwardStore.getUpdatedRecords();// 获取修改的行的数据，无法获取幻影数据
        //            var phantoms=AwardStore.getNewRecords( ) ;//获得幻影行
        //            records=records.concat(phantoms);//将幻影数据与真实数据合并
        //            if (records.length == 0) {
        //                Ext.MessageBox.show({
        //                    title : "提示",
        //                    msg : "没有任何数据被修改过!"
        //                    // icon: Ext.MessageBox.INFO
        //                });
        //                return;
        //            } else {
        //                Ext.Msg.confirm("请确认", "是否真的要修改数据？", function (button, text) {
        //                    if (button == "yes") {
        //                        var data = [];
        //                        // alert(records);
        //                        Ext.Array.each(records, function (record) {
        //                            data.push(record.data);
        //                            // record.commit();// 向store提交修改数据，页面效果
        //                        });
        //
        //                        Ext.Ajax.request({
        //                            url: '/eve/award/update.do',
        //                            params: {
        //                                alterAwards: Ext.encode(data)
        //                            },
        //                            method: 'POST',
        //                            timeout: 2000,
        //
        //                            success: function (response, opts) {
        //                                var success = Ext.decode(response.responseText).success;
        //                                // 当后台数据同步成功时
        //                                if (success) {
        //                                    Ext.Array.each(records, function (record) {
        //                                        // data.push(record.data);
        //                                        record.commit();// 向store提交修改数据，页面效果
        //                                        ISKStore.load();
        //                                    });
        //                                    Ext.MessageBox.show({
        //                                        title: "提示",
        //                                        msg: "数据修改成功!"
        //                                        // icon: Ext.MessageBox.INFO
        //                                    });
        //                                } else {
        //                                    Ext.MessageBox.show({
        //                                        title: "提示",
        //                                        msg: "数据修改失败!"
        //                                        // icon: Ext.MessageBox.INFO
        //                                    });
        //                                }
        //                            }
        //                        });
        //                    }
        //                });
        //            }
        //        }
        //    }
    ]
    //设置背景图片
    //bodyStyle: {
    //    //background: '#ffc',
    //    background: 'url(/img/desktop.jpg) no-repeat #00FFFF',
    //    padding: '10px'
    //},


});