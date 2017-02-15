/**
 * Created by carson on 2016/7/15.
 */
/**
 * Created by carson on 2016/6/13.
 */
Ext.require(['*.*']);
var InformationStore = Ext.create('Ext.data.JsonStore',
    {

        fields: [
            {name: 'id', type: 'int'},
            {name: 'type', type: 'string'},
            {name: 'isk', type: 'string'},
            {name: 'balance', type: 'string'},
            {name: 'userId', type: 'int'},
            {name: 'date', type: 'time'},
            {name: 'userName', type: 'string'},
            {name: 'playerName', type: 'string'},
        ],
        proxy: {
            type: 'ajax',
            url: '/eve/EVETransferAccountInformation/all.do',
            params: {
                userId: function () {
                    if (loginUser != null)
                        return loginUser.id;
                    else {
                        return null;
                    }
                }
            },
            reader: {

                type: 'json',
                root: 'rows'
            }
        }
    });
var InformationListView = Ext.create('Ext.ListView', {
    title: '账户信息',
    store: InformationStore,
    multiSelect: true,
    border: false,
    reserveScrollOffset: true,
    hideHeaders: false,        //是否隐藏标题
    emptyMsg: "没有记录", //没有数据时显示信息
    columns: [
        {dataIndex: 'type', header: "类型"},
        {dataIndex: 'isk', header: "金额"},
        {dataIndex: 'balance', header: "余额"},

        {
            dataIndex: 'date',
            header: "时间",
            width: 200,
            renderer: function (val) {
                return new Date(parseInt(val)).toLocaleString();
            }
        },
        {dataIndex: 'userName', header: "用户名"},
        {dataIndex: 'playerName', header: "账户名"},

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
                if (loginUser != null)
                    InformationStore.load();
                else
                    Ext.MessageBox.alert('提示', '请登录后查看');
            }
        },
        //{
        //    xtype:'button',
        //    text:'投注',
        //    handler:function(){
        //        var VoteNumber=Ext.getCmp('VoteNumber').getValue();
        //        Ext.Msg.confirm('系统提示', '确定要投注？', function (btn) {
        //            if (btn == 'yes') {
        //                var sm = TaskListView.getSelectionModel();
        //                var cellIndex = sm.getSelection();//获取被选择的单元格的行和列索引
        //                //printObject(cellIndex[0]['index']);
        //                var record = cellIndex[0];
        //                if(VoteNumber<1||VoteNumber>record.get('cycle')){
        //                    Ext.Msg.alert('提示','投注范围:'+1+' - '+record.get('cycle'));
        //                    return;
        //                }
        //                if(loginUser==null){
        //                    Ext.Msg.alert('提示','还未登录,请登录后再投注');
        //                    return;
        //                }
        //                if(loginUser.isk==null||loginUser.isk<record.get('value')/record.get('cycle')){
        //                    Ext.Msg.alert('提示','账户余额不足');
        //                    return;
        //                }
        //                Ext.Ajax.request({
        //                        url: '/eve/Vote/vote.do',
        //                        params: {
        //                            taskId: record.get('id'),
        //                            userId:loginUser.id,
        //                            voteNumber:VoteNumber
        //                        },
        //                        method: 'POST',
        //                        timeout: 2000,
        //
        //                        success: function (response, options) {
        //                            var success = Ext.decode(response.responseText).success;
        //                            if(success)
        //                            Ext.MessageBox.alert('成功', '投注成功');
        //
        //                        },
        //                        failure: function (response, options) {
        //                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
        //                        }
        //                    }
        //                )
        //
        //            }
        //        });
        //
        //    }
        //
        //},
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