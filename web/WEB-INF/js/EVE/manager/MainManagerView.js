Ext.require(['*.*']);
var tabIndex = 0;
Ext.onReady(function () {
    Ext.QuickTips.init();
    init();
});

var init = function () {
    var bodyWidth = Ext.getBody().getWidth();
    var bodyHeight = Ext.getBody().getHeight();
    UserStore.load();
    ISKStore.load();
    AwardStore.load();
    TaskStore.load();
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
        items: [accordingPanel,
            // topPanel,
            // bottonPanel,
            tabPanel
        ]
    });

}
function printObject(obj) {

    var temp = "";
    for (var i in obj) {//用javascript的for/in循环遍历对象的属性
        temp += i + ":" + obj[i] + "\n";
    }
    alert(temp);
}
