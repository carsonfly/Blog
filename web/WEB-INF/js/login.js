//main
Ext.onReady(init);
//init
function init() {


    /*
     * ================  Login form  =======================
     */


    var div = Ext.get('login');
    div.center();
    var loginForm = Ext.create('Ext.form.Panel', {
        url: 'login.do',
        frame: true,

        region: 'center',
        //renderTo:div,
        title: '登录',
        model: true,
        bodyStyle: 'padding:5px 5px 0',
        width: 350,
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75,
            maxLength: 20
        },
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },

        items: [{
            fieldLabel: '账号',
            name: 'name',
            id: 'user_name',
            allowBlank: false

        }, {
            fieldLabel: '密码',
            id: 'user_password',
            name: 'password',
            inputType: 'password'


        }],

        buttons: [{
            text: '登录',
            handler: function () {
                var UserName = Ext.getCmp('user_name').getValue();
                var UserPassword = Ext.getCmp('user_password').getValue();
                var form = loginForm.getForm();
                //Ext.Msg.alert('test','name'+name+'passord'+password);
                //Ext.Msg.alert('test','test');
                var mask = new Ext.LoadMask(Ext.getBody(), {msg: '登录中，请稍后...'});
                mask.show();
                form.submit({
                    url: 'login.do',
                    method: 'POST',

                    success: function (form, action) {
                        //var data=Ext.JSON.decode(action);
                        mask.hide();
                        var result = Ext.JSON.decode(action.response.responseText);

                        if (result.success == "true") {

                            mask.hide();
                            //Ext.Msg.alert('r'+result.success);
                            Ext.Msg.alert('登录成功', '恭喜，登录成功！');
                            var redirect = "/mainView"
                            window.location.href = redirect;
                        } else {
                            mask.hide();
                            //Ext.Msg.alert('r'+result.success);
                            Ext.Msg.alert('账号密码错误，请重新登录');
                        }
                    },
                    failure: function (form, action) {
                        mask.hide();

                        Ext.Msg.alert('提示', '连接错误，请重新登录');
                    }
                });

            }
        }]
    });
    var win = Ext.create('Ext.window.Window', {
        title: '调度设备状态管理器',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        //frame:true,
        plain: true,

        constrain: true,
        width: 1200,
        height: 500,
        //applyTo:Ext.get('login'),
        //renderTo:Ext.get('login'),
        autoShow: false,
        model: true,
        items: loginForm

    });
    //window.render(Ext.getBody());
    win.show();
    //loginForm.render(document.body);

}