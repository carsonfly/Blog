/**
 * Created by carson on 2016/7/15.
 */
var accordingPanel = Ext.create('Ext.Panel', {

    title: '后台管理',
    width: 200,
    height: 800,
    region: 'west',
    layout: 'accordion',
    items: [
        {
            title: '宝库管理',
            xtype: "panel",

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
            },
            items: [{
                xtype: 'button',
                width: 160,
                text: '添加用户',
                handler: function () {
                    tabIndex++;
                    //alert(userManagerShow);
                    tabPanel.add({
                        title: '用户管理',
                        closable: false,
                        items: [userListView],
                        tbar: [
                            {
                                xtype: 'button',
                                text: '添加',
                                handler: function () {

                                }
                            }, {
                                xtype: 'button',
                                text: '删除',
                                handler: function () {

                                }
                            }, {
                                xtype: 'button',
                                text: '编辑',
                                handler: function () {

                                }
                            }
                        ]
                    });
                    tabPanel.setActiveTab(tabIndex);
                }
            }]
        }, {
            id: 'panel3',
            width: 200,
            title: '系统管理',
            xtype: "panel",
            html: "子元素3"
        }]
})