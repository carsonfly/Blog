/**
 * Created by carson on 2016/7/15.
 */
var AwardStore = Ext.create('Ext.data.JsonStore',
    {

        fields: [
            {name: 'id', type: 'int'},
            {name: 'itemName', type: 'string'},
            {name: 'level', type: 'int'},
            {name: 'cycle', type: 'int'},
            {name: 'part', type: 'int'},
            {name: 'amount', type: 'int'},
            {name: 'value', type: 'number'},
        ],
        proxy: {
            type: 'ajax',
            url: '/eve/award/all.do',

            reader: {

                type: 'json',
                root: 'rows'
            }
        }
    });