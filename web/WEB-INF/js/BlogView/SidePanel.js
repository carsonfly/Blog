/**
 * Created by carson on 2016/6/13.
 */

var sidePanel = Ext.create('Ext.panel.Panel', {
    title: '分类',
    width: 240,
    height: 800,
    region: 'west',
    layout: {
        type: 'accordion',
        //纵向对齐方式 start：从顶部；center：从中部；end：从底部
        align: 'stretch'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸
    },

    items: [

        {
            xtype: "panel",
            width: 160,
            title: '按日期查看',
            layout: {
                type: 'vbox',
                pack: 'start',              //纵向对齐方式 start：从顶部；center：从中部；end：从底部
                align: 'stretch'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸
            },
            items: [
                {
                    xtype: 'button',
                    text: '重置',
                    handler: function () {
                        articleStore.setProxy({
                            type: 'ajax',
                            url: '/article/all',


                            reader: {

                                type: 'json',
                                root: 'rows'
                            }
                        });
                        articleStore.load();
                    }
                },
                {
                    xtype: 'button',
                    text: '最近一小时',
                    handler: function () {
                        var date1 = new Date();
                        var date2 = new Date((new Date().getTime() - 3600000));
                        articleStore.setProxy({
                            type: 'ajax',
                            url: '/article/selectDate',
                            extraParams: {
                                hql: 'default',
                                date1: date1.getTime(),
                                date2: date2.getTime()
                            },

                            reader: {

                                type: 'json',
                                root: 'rows'
                            }
                        });
                        articleStore.load();

                    }
                },
                {
                    xtype: 'button',
                    text: '最近一天',
                    handler: function () {
                        var date1 = new Date();

                        var date2 = new Date((new Date().getTime() - 3600000 * 24));
                        articleStore.setProxy({
                            type: 'ajax',
                            url: '/article/selectDate',
                            extraParams: {
                                hql: 'default',
                                date1: date1.getTime(),
                                date2: date2.getTime()
                            },

                            reader: {

                                type: 'json',
                                root: 'rows'
                            }
                        });
                        articleStore.load();
                    }
                },
                {
                    xtype: 'button',
                    text: '最近一周',
                    handler: function () {
                        var date1 = new Date();
                        var date2 = new Date((new Date().getTime() - 3600000 * 24 * 7));
                        articleStore.setProxy({
                            type: 'ajax',
                            url: '/article/selectDate',
                            extraParams: {
                                hql: 'default',
                                date1: date1.getTime(),
                                date2: date2.getTime()
                            },

                            reader: {

                                type: 'json',
                                root: 'rows'
                            }
                        });
                        articleStore.load();

                    }
                },
                {
                    xtype: "panel",

                    title: '自定义',
                    scrollable: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            id: "datepicker1",
                            format: 'Y-m-d',
                            value: new Date()
                        },
                        {
                            xtype: 'label',
                            text: '到'
                        },
                        {
                            xtype: 'datefield',
                            id: "datepicker2",
                            format: 'Y-m-d',
                            value: new Date()

                        }, {

                            xtype: 'button',
                            text: '查找',
                            handler: function () {
                                var date1 = Ext.getCmp('datepicker1').value;
                                var date2 = Ext.getCmp('datepicker2').value;

                                articleStore.setProxy({
                                    type: 'ajax',
                                    url: '/article/selectDate',
                                    extraParams: {
                                        hql: 'default',
                                        date1: date1.getTime(),
                                        date2: date2.getTime()
                                    },
                                    reader: {

                                        type: 'json',
                                        root: 'rows'
                                    }
                                });
                                articleStore.load();
                            }
                        }


                    ]

                }
            ]
        }, {
            id: 'categoryPanel',
            xtype: "panel",
            width: 160,
            title: '按分类查看',
            layout: {
                type: 'vbox',
                align: 'stretch'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸
            },
            items: {
                xtype: 'button',
                text: '重置',
                handler: function () {


                    articleStore.setProxy({
                        type: 'ajax',
                        url: '/article/all',


                        reader: {

                            type: 'json',
                            root: 'rows'
                        }
                    });
                    articleStore.load();
                }
            },
            listeners: {
                afterrender: function () {

                    Ext.Ajax.request({
                        url: '/category/all/',

                        success: function (response, opts) {
                            //Ext.MessageBox.alert('成功', '从服务端获取结果: ' + response.responseText);
                            var categories = Ext.decode(response.responseText);
                            var rows = categories['rows'];
                            var categoryPanel = Ext.getCmp('categoryPanel');
                            for (var index = 0; index < rows.length; index++) {

                                var category = rows[index]['value'];
                                categoryPanel.add({
                                    xtype: 'button',
                                    text: category,
                                    handler: function () {

                                        var query = this.text;

                                        articleStore.setProxy({
                                            type: 'ajax',
                                            url: '/article/select',
                                            extraParams: {
                                                hql: 'from Article article where category=\'' + query + '\''

                                            },

                                            reader: {
                                                type: 'json',
                                                root: 'rows'
                                            }
                                        });
                                        articleStore.load();

                                    }

                                });

                            }
                        },

                        failure: function (response, opts) {
                            Ext.MessageBox.alert('fail', '从服务端获取结果: ' + response.responseText);
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
                }
            }


        }, {
            id: 'userPanel',
            xtype: "panel",
            width: 160,
            title: '按作者查看',
            layout: {
                type: 'vbox',
                align: 'stretch'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸
            },
            items: {
                xtype: 'button',
                text: '重置',
                handler: function () {


                    articleStore.setProxy({
                        type: 'ajax',
                        url: '/article/all',


                        reader: {

                            type: 'json',
                            root: 'rows'
                        }
                    });
                    articleStore.load();
                }
            },
            listeners: {
                afterrender: function () {

                    Ext.Ajax.request({
                        url: '/user/all',

                        success: function (response, opts) {
                            //Ext.MessageBox.alert('成功', '从服务端获取结果: ' + response.responseText);
                            var categories = Ext.decode(response.responseText);
                            var rows = categories['rows'];
                            var categoryPanel = Ext.getCmp('userPanel');
                            for (var index = 0; index < rows.length; index++) {

                                var writer = rows[index]['userName'];
                                categoryPanel.add({
                                    xtype: 'button',
                                    text: writer,
                                    handler: function () {

                                        var query = this.text;

                                        articleStore.setProxy({
                                            type: 'ajax',
                                            url: '/article/select',
                                            extraParams: {
                                                hql: 'from Article article where writer=\'' + query + '\''

                                            },

                                            reader: {
                                                type: 'json',
                                                root: 'rows'
                                            }
                                        });
                                        articleStore.load();

                                    }

                                });

                            }
                        },

                        failure: function (response, opts) {
                            Ext.MessageBox.alert('fail', '从服务端获取结果: ' + response.responseText);
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
                }
            }
        }


    ]
});
