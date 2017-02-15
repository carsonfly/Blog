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
            {name: 'remainPart', type: 'int'},
            {name: 'note', type: 'string'},
            {name: 'winNumber', type: 'int'},
            {name: 'value', type: 'number'},
        ],
        proxy: {
            type: 'ajax',
            url: '/eve//NowTask/all.do',
            params: {
                userId: function () {
                    if (loginUser != null) {
                        return loginUser.id;
                    } else {
                        return null;
                    }
                }
            },
            reader: {

                type: 'json',
                root: 'rows'
            }
        }
    });