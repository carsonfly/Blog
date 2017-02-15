/**
 * Created by carson on 2016/6/13.
 */
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.panel.*',
    'Ext.layout.container.Border'
]);

var categoryListView = Ext.create('Ext.grid.Panel', {

    store: categoryStore,
    multiSelect: true,
    border: false,
    reserveScrollOffset: true,
    hideHeaders: true,        //是否隐藏标题
    emptyText: '无数据',
    columns: [{
        header: "标题",
        dataIndex: 'value',
        width: 100
    },
    ],
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
                //console.log('click el');
                var items = categoryListView.getSelectionModel().getSelection();
                var value = Ext.util.Format.htmlDecode(items[0].get('value'));
                var tabPanel = Ext.getCmp('tabPanel');
                alert(tabPanel);
                tabIndex++;
                tabPanel.add({
                    id: tabIndex,
                    title: '新文章' + tabIndex,
                    closable: true,
                    items: [newArticle]
                });
                tabPanel.setActiveTab(tabIndex);
            }
        }

    }

});