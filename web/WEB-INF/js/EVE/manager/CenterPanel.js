/**
 * Created by carson on 2016/7/15.
 */
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
    items: [UserListView, ISKListView, AwardListView, TaskListView, VoteListView, TransferAccountInformationListView]
});