/**
 * Created by carson on 2016/6/13.
 */
var categoryStore = Ext.create('Ext.data.JsonStore',
    {

        fields: [
            {name: 'id', type: 'int'},
            {name: 'value', type: 'string'},
        ],
        proxy: {
            type: 'ajax',
            url: '/category/all/',

            reader: {

                type: 'json',
                rootProperty: 'rows'
            }
        }
    });