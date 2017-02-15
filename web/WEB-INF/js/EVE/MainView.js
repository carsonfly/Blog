Ext.require(['*.*']);
var tabIndex = 0;
Ext.onReady(function () {
    Ext.QuickTips.init();
    init();
});
TaskStore.load();

function printObject(obj) {

    var temp = "";
    for (var i in obj) {//用javascript的for/in循环遍历对象的属性
        temp += i + ":" + obj[i] + "\n";
    }
    alert(temp);
}
var init = function () {
    var bodyWidth = Ext.getBody().getWidth();
    var bodyHeight = Ext.getBody().getHeight();
    Ext.create('widget.uxNotification', {
        title: '欢迎',
        position: 't',
        manager: 'fullscreen',
        cls: 'ux-notification-light',
        width: 180,
        height: 115,
        autoCloseDelay: 3000,
        iconCls: 'ux-notification-icon-information',
        html: '欢迎来到EVE大乐透'
    }).show();


    // Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
    //toast.msg('欢迎','欢迎来到EVE大乐透',true,1000);
    Ext.create('Ext.Panel', {
        title: 'EVE抽奖',
        renderTo: Ext.getBody(),
        width: bodyWidth,
        height: bodyHeight,
        layout: 'border',
        defaults: {
            split: true,                 //是否有分割线
            collapsible: true,           //是否可以折叠
            bodyStyle: 'padding:15px'
        },
        items: [leftPanel,
            // topPanel,
            // bottonPanel,
            centerPanel
        ]
    });
}