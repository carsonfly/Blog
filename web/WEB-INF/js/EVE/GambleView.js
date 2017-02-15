/**
 * Created by carson on 2016/6/13.
 */
var centerPanel = Ext.create('Ext.TabPanel', {
    region: 'center', //border 布局，将页面分成东，南，西，北，中五部分，这里表示TabPanel放在中间

    activeTab: 0,
    deferredRender: false,
    defaults: {
        autoScroll: true
    },

    items: [TaskListView, InformationListView, VoteListView]
});