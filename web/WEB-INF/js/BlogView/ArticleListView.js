/**
 * Created by carson on 2016/6/13.
 */
var articleListView = Ext.create('Ext.grid.Panel', {
    title: '首页',
    store: articleStore,
    multiSelect: true,
    border: false,
    reserveScrollOffset: true,
    hideHeaders: true,        //是否隐藏标题

    columns: [{
        header: "标题",
        dataIndex: 'title',
        width: 500
    }, {
        header: "分类",
        dataIndex: 'category',
        width: 200
    }, {
        header: "作者",
        dataIndex: 'writer',
        width: 100
    }, {
        header: "更新日期",
        dataIndex: 'updateTime',

        dateFormat: 'yyyy-MM-dd HH:mm:ss',
        width: 300
    }],
    //设置背景图片
    //bodyStyle: {
    //    //background: '#ffc',
    //    background: 'url(/img/desktop.jpg) no-repeat #00FFFF',
    //    padding: '10px'
    //},
    listeners: {
        click: {
            element: 'el', //bind to the underlying el property on the panel
            fn: function () {
                console.log('click el');
                var items = articleListView.getSelectionModel().getSelection();
                var title = Ext.util.Format.htmlDecode(items[0].get('title'));
                var content = Ext.util.Format.htmlDecode(items[0].get('content'));
                tabIndex++;
                centerPanel.add({
                    closable: true,
                    title: items[0].get('title'),
                    html: Ext.util.Format.htmlDecode(items[0].get('content')),

                    destroy: function () {
                        //alert(tabIndex);
                        tabIndex--;
                    }

                });
                centerPanel.setActiveTab(tabIndex);
            }
        }

    }

});