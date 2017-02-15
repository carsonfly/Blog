/**
 * Created by carson on 2016/7/15.
 */
var TaskStore = Ext.create('Ext.data.JsonStore',
    {

        fields: [
            {name: 'id', type: 'int'},
            {name: 'itemName', type: 'string'},
            {name: 'level', type: 'int'},
            {name: 'startTime'},
            {name: 'endTime'},
            {name: 'part', type: 'int'},
            {name: 'done', type: 'int'},
            {name: 'winNumber', type: 'int'},
            {name: 'value', type: 'number'},
        ],
        proxy: {
            type: 'ajax',
            url: '/eve/task/all.do',

            reader: {

                type: 'json',
                root: 'rows'
            }
        }
    });