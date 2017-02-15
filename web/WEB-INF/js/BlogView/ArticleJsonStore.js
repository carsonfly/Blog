var articleStore = Ext.create('Ext.data.JsonStore',
    {

        fields: [
            {name: 'id', type: 'int'},
            {name: 'title', type: 'string'},
            {name: 'content', type: 'string'},
            {name: 'writer', type: 'string'},
            {name: 'category', type: 'string'},
            {
                name: 'updateTime', xtype: 'datecolumn',
                convert: function (v, record) {
                    //将一个long型的time转换为标准的日期对象
                    //此时V为一个long型的时间毫秒数
                    return new Date(v).toLocaleString();
                }
            }
        ],
        proxy: {
            type: 'ajax',
            url: '/article/all',

            reader: {

                type: 'json',
                rootProperty: 'rows'
            }
        }
    });