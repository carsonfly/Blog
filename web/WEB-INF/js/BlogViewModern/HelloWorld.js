/**
 * Created by carson on 2017/2/7.
 */
Ext.onReady(function () {
    Ext.require('Ext.grid.Panel');
})

Ext.application({
    name: 'MyApp',
    launch: function () {
        Ext.create('Ext.Panel', {
            title: '信息发布系统',
            renderTo: Ext.getBody(),

            //layout: 'border',
            defaults: {
                split: true,                 //是否有分割线
                collapsible: true,           //是否可以折叠
                bodyStyle: 'padding:15px'
            },

            items: [
                sidePanel,
                //centerPanel,
                //topPanel
            ]
        });
    }
});