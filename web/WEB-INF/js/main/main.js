Ext.require(['*.*']);


var tabIndex = 0;
var ArticleManagerShow = true;
var userManagerShow = false;

Ext.onReady(function () {
    Ext.QuickTips.init();
    init();
});
store.load();
userStore.load();
categoryStore.load();
//categoryStore.load();
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
    Ext.create('Ext.Panel', {
        title: '管理',
        renderTo: Ext.getBody(),
        width: bodyWidth,
        height: bodyHeight,
        layout: 'border',
        defaults: {
            split: true,                 //是否有分割线
            collapsible: true,           //是否可以折叠
            bodyStyle: 'padding:15px'
        },
        items: [
            tabPanel
        ]
    });
}