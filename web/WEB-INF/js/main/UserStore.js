/**
 * Created by carson on 2016/6/12.
 */
var userStore = Ext.create('Ext.data.JsonStore', {
    fields: [
        {name: 'id', type: 'int'},
        {name: 'userName', type: 'string'},
        {name: 'userPassword', type: 'string'},
    ],
    proxy: {
        type: 'ajax',
        url: '/user/all',

        reader: {

            type: 'json',
            root: 'rows'
        }
    }
});