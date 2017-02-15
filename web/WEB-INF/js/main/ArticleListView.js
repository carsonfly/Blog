/**
 * Created by carson on 2016/6/12.
 */

var listView = Ext.create('Ext.ListView', {
    title: '文章管理',
    store: store,
    multiSelect: true,
    emptyText: '无数据',
    reserveScrollOffset: true,
    hideHeaders: false,        //是否隐藏标题

    columns: [{
        header: "标题",
        dataIndex: 'title',
        width: 200
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
        width: 200
    }],
    tbar: [{
        xtype: 'button',

        text: '添加',
        handler: function () {
            tabIndex++;
            var article = newArticle;

            article.title = '';
            article.items[0].value = '';
            article.items[1].value = '';
            article.items[2].value = '';
            article.items[3].value = '';
            article.items[4].value = null;
            tabPanel.add({
                id: tabIndex,
                title: '新文章' + tabIndex,
                closable: true,
                items: [newArticle]
            });
            tabPanel.setActiveTab(tabIndex);
        }
    }, {
        xtype: 'button',
        text: '刷新',
        handler: function () {
            store.load();
        }
    }, {
        xtype: 'button',
        text: '展示',
        handler: function () {
            var items = listView.getSelectionModel().getSelection();
            tabIndex++;
            tabPanel.add({
                closable: true,
                title: items[0].get('title'),
                html: Ext.util.Format.htmlDecode(items[0].get('content'))
            })
            tabPanel.setActiveTab(tabIndex);
        }
    }, {
        xtype: 'button',
        text: '删除',
        handler: function () {
            var items = listView.getSelectionModel().getSelection();
            var id = items[0].get('id');
            Ext.Ajax.request({
                url: 'article/delete',

                params: {
                    id: id
                },
                method: 'post',
                success: function (response, options) {
                    Ext.MessageBox.alert('成功', '删除成功');
                    store.load();
                },
                failure: function (response, options) {
                    Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                }
            });
        }
    }, {
        xtype: 'button',
        text: '编辑',
        handler: function () {
            var items = listView.getSelectionModel().getSelection();
            tabIndex++;
            var article = newArticle;

            article.title = items[0]['data']['title'];
            article.items[0].value = items[0]['data']['title'];
            article.items[1].value = items[0]['data']['writer'];
            article.items[2].value = items[0]['data']['category'];
            article.items[3].value = Ext.htmlDecode(items[0]['data']['content']);
            article.items[4].value = items[0]['data']['id'];
            tabPanel.add({
                id: tabIndex,
                title: items[0]['data']['title'],
                closable: true,
                items: [article]
            });

            tabPanel.setActiveTab(tabIndex);
        }
    }]
});
