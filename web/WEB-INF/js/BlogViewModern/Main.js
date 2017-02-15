/**
 * Created by carson on 2016/6/13.
 */
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.panel.*',

]);

var tabIndex = 0;
Ext.onReady(function () {
    Ext.QuickTips.init();
    //Ext.util.CSS.swapStyleSheet("theme", "/ext/resources/css/ext-all-access.css" );
    init();
});
var init = function () {
    var bodyWidth = Ext.getBody().getWidth();
    var bodyHeight = Ext.getBody().getHeight();
    articleStore.load();
    categoryStore.load();
    Ext.create('Ext.Panel', {
        title: '信息发布系统',
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
            sidePanel,
            centerPanel,
            //topPanel
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