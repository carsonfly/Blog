/**
 * Created by carson on 2016/7/15.
 */
var VoteStore = Ext.create('Ext.data.JsonStore',
    {

        fields: [
            {name: 'id', type: 'int'},
            {name: 'isk', type: 'number'},
            {name: 'player', type: 'string'},
            {name: 'vote', type: 'int'},
            {name: 'time'},
            {name: 'taskName', type: 'string'},
            {name: 'userName', type: 'string'},
            {name: 'result', type: 'int'},
            {name: 'taskId', type: 'int'},
        ],
        proxy: {
            type: 'ajax',
            url: '/eve/vote/all.do',

            reader: {

                type: 'json',
                root: 'rows'
            }
        }
    });