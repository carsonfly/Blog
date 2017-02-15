/**
 * Created by carson on 2016/7/15.
 */
var TransferAccountInformationStore = Ext.create('Ext.data.JsonStore',
    {

        fields: [
            {name: 'id', type: 'int'},
            {name: 'type', type: 'string'},
            {name: 'isk', type: 'string'},
            {name: 'balance', type: 'string'},
            {name: 'userId', type: 'int'},
            {name: 'date', type: 'string'},
            {name: 'userName', type: 'string'},
            {name: 'playerName', type: 'string'},
        ],
        proxy: {
            type: 'ajax',
            url: '/eve/EVETransferAccountInformation/all.do',
            params: {
                userId: null
            },
            reader: {

                type: 'json',
                root: 'rows'
            }
        }
    });