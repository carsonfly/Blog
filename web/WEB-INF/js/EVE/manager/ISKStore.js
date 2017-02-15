/**
 * Created by carson on 2016/7/15.
 */
var ISKStore = Ext.create('Ext.data.JsonStore',
    {

        fields: [
            {name: 'id', type: 'int'},
            {name: 'type', type: 'string'},
            {name: 'amount', type: 'string'},
            {name: 'balance', type: 'string'},
            {name: 'describe', type: 'string'},
            {name: 'date', type: 'string'},
        ],
        proxy: {
            type: 'ajax',
            url: '/eve/isk/all.do',

            reader: {

                type: 'json',
                root: 'rows'
            }
        }
    });