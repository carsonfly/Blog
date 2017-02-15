/**
 * Created by carson on 2016/7/15.
 */
var UserStore = Ext.create('Ext.data.JsonStore',
    {

        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'password', type: 'string'},
            {name: 'player', type: 'string'},
            {name: 'isk', type: 'number'},

        ],
        proxy: {
            type: 'ajax',
            url: '/eve/user/all.do',

            reader: {

                type: 'json',
                root: 'rows'
            }
        }
    });