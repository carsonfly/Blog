/**
 * Created by carson on 2016/6/12.
 */
var accordingPanel = Ext.create('Ext.Panel', {

    title: '后台管理',
    width: 200,
    height: 800,
    region: 'west',
    layout: 'accordion',
    items: [
        {
            title: '文章管理',
            xtype: "panel",
            closable: false,
            layout: {
                type: 'vbox',
                pack: 'start',              //纵向对齐方式 start：从顶部；center：从中部；end：从底部
                align: 'center'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸
            },
            defaults: {
                xtype: 'button'
            },

            items: []

        }, {
            title: '用户管理',
            xtype: "panel",

            layout: {
                type: 'vbox',
                pack: 'start',              //纵向对齐方式 start：从顶部；center：从中部；end：从底部
                align: 'center'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸
            },
            defaults: {
                xtype: 'button'
            }
        }, {
            id: 'panel3',
            width: 200,
            title: '分类管理',
            xtype: "panel",
            layout: {
                type: 'vbox',
                pack: 'start',              //纵向对齐方式 start：从顶部；center：从中部；end：从底部
                align: 'center'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸
            },
            defaults: {
                xtype: 'button'
            }

        }]
})
var tabPanel = Ext.create('Ext.TabPanel', {
    id: 'tabPanel',
    region: 'center', //border 布局，将页面分成东，南，西，北，中五部分，这里表示TabPanel放在中间
    margins: '3 3 3 0',
    activeTab: 0,
    deferredRender: false,
    defaults: {
        autoScroll: true
    },
    bbar: {
        xtype: 'toolbar',
        items: []
    },
    items: [listView, userListView, categoryListView]
});