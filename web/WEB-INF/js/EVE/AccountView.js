var loginUser;
var hashCode;
var leftPanel = Ext.create('Ext.form.Panel', {
    url: '/eve/login.do',
    frame: true,
    region: 'west',

    //renderTo:div,
    title: '登录',
    model: true,
    bodyStyle: 'padding:5px 5px 0',
    width: 200,
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 75,
        maxLength: 20
    },
    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    items: [{
        fieldLabel: '账号',
        name: 'name',
        id: 'user_name',
        allowBlank: false

    }, {
        fieldLabel: '绑定角色',
        allowBlank: false,
        hidden: true,
        id: 'player',
        allowBlank: false

    }, {
        fieldLabel: '密码',
        id: 'user_password',
        name: 'password',
        inputType: 'password',
        allowBlank: false

    },
        {
            fieldLabel: '密码2',
            id: 'user_password2',
            name: 'password2',
            inputType: 'password',
            hidden: true,
            allowBlank: false

        }, {
            xtype: 'label',
            id: 'userName',
            hidden: true,

            readOnly: true

        },
        {
            xtype: 'label',
            id: 'playerName',
            hidden: true,
            readOnly: true
        }, {
            xtype: 'label',
            id: 'playerIsk',
            hidden: true,
            readOnly: true
        }
    ],
    listeners: {
        render: function (component, eOpts) {
            //alert('beforeshow');

            loginUser = Ext.decode(Ext.util.Cookies.get("loginUser"));
            hashCode = Ext.util.Cookies.get("hashCode");
            if (loginUser == null) {
                return true;
            }
            var UserName = loginUser.name;
            var UserPassword = loginUser.password;
            //printObject(loginUser);
            //printObject(hashCode);
            var mask = new Ext.LoadMask(Ext.getBody(), {msg: '登录中，请稍后...'});
            mask.show();
            Ext.Ajax.request({
                url: '/eve/login.do',
                method: 'POST',
                params: {
                    name: UserName,
                    password: UserPassword
                },
                success: function (response) {

                    //var data=Ext.JSON.decode(action);
                    mask.hide();
                    var result = Ext.JSON.decode(response.responseText);

                    if (result.success == "true") {


                        //Ext.Msg.alert('r'+result.success);

                        Ext.getCmp('user_name').hide();
                        Ext.getCmp('user_password').hide();
                        Ext.getCmp('login').hide();
                        Ext.getCmp('register').hide();
                        //printObject(Ext.getCmp('userName'));
                        Ext.getCmp('userName').setText('用户名：' + result.user.name + '');
                        Ext.getCmp('playerName').setText('绑定角色名：' + result.user.player);
                        Ext.getCmp('playerIsk').setText('账户余额：' + result.user.isk + ' isk');
                        //printObject(Ext.getCmp('userName'));
                        Ext.getCmp('playerIsk').show();
                        Ext.getCmp('logout').show();
                        Ext.getCmp('edit').show();
                        Ext.getCmp('userName').show();
                        Ext.getCmp('playerName').show();
                        //printObject(Ext.getCmp('userName'));
                        hashCode = result.hashCode;
                        loginUser = result.user;
                        Ext.util.Cookies.set('hashCode', hashCode);
                        Ext.util.Cookies.set('loginUser', Ext.encode(loginUser));
                    } else {


                        Ext.getCmp('user_password').setValue('');
                        //Ext.Msg.alert('r'+result.success);
                        Ext.Msg.alert('账号密码错误，请重新登录');
                    }
                }

            });
            return false;
        }
    },
    buttons: [{
        text: '提交修改',
        id: 'edit.do',
        hidden: true,
        handler: function () {
            var password2 = Ext.getCmp('user_password2').getValue();
            var password = Ext.getCmp('user_password').getValue();
            if (password != password2) {
                Ext.Msg.alert('提示', '两次输入密码不一致');
                return;
            }
            if (password.length < 6) {
                Ext.Msg.alert('提示', '密码长度至少6位');
                return;
            }
            Ext.Ajax.request({
                url: '/eve/user/register.do',
                method: 'post',
                params: {
                    id: loginUser.id,
                    name: loginUser.name,
                    password: Ext.getCmp('user_password').getValue(),
                    player: Ext.getCmp('player').getValue(),
                    isk: loginUser.isk,
                    hashCode: Ext.util.Cookies.get('hashCode')
                },
                success: function (response, options) {

                    var result = Ext.JSON.decode(response.responseText);

                    if (result.success == "true") {
                        Ext.Msg.alert('提示', '修改成功请重新登录');
                        Ext.getCmp('edit.do').hide();
                        Ext.getCmp('user_name').show();
                        Ext.getCmp('login').show();
                        Ext.getCmp('register').show();
                        Ext.getCmp('player').hide();
                        Ext.getCmp('logout').hide();
                        Ext.getCmp('playerName').hide();
                        Ext.getCmp('playerIsk').hide();
                        Ext.getCmp('userName').hide();
                        Ext.getCmp('player').setValue('');
                        Ext.getCmp('user_password').setValue('');
                        Ext.getCmp('user_password2').hide();
                        Ext.getCmp('user_password2').setValue('');
                        loginUser = null;
                        Ext.util.Cookies.clear('hashCode');
                        Ext.util.Cookies.clear('loginUser');
                    } else {
                        Ext.Msg.alert('提示', result.msg);
                    }
                },
                failure: function () {
                    Ext.Msg.alert('提示', '网络超时');
                }
            });

        }
    }, {
        text: '修改账号信息',
        id: 'edit',
        hidden: true,
        handler: function () {
            this.hide();
            //printObject(loginUser);
            Ext.getCmp('edit.do').show();
            Ext.getCmp('player').show();
            Ext.getCmp('player').setValue(loginUser.player);
            Ext.getCmp('user_password').setRawValue(loginUser.password);
            Ext.getCmp('user_password2').setRawValue(loginUser.password);
            Ext.getCmp('user_password').show();
            Ext.getCmp('user_password').setValue('');
            Ext.getCmp('user_password2').show();
            Ext.getCmp('user_password2').setValue('');

        }
    }, {
        text: '登出',
        id: 'logout',
        hidden: true,
        handler: function () {

            Ext.Msg.alert('提示', '登出');
            loginUser = null;
            Ext.getCmp('user_name').show();
            Ext.getCmp('user_password').show();
            Ext.getCmp('user_password').setValue('');
            Ext.getCmp('login').show();
            Ext.getCmp('register').show();
            Ext.getCmp('playerIsk').hide();
            Ext.getCmp('edit').hide();
            Ext.getCmp('logout').hide();
            Ext.getCmp('userName').hide();
            Ext.getCmp('playerName').hide();
            Ext.util.Cookies.clear('hashCode');
            Ext.util.Cookies.clear('loginUser');
        }
    }, {
        text: '登录',
        id: 'login',
        handler: function () {
            var UserName = Ext.getCmp('user_name').getValue();
            var UserPassword = Ext.getCmp('user_password').getValue();
            var form = leftPanel.getForm();
            //Ext.Msg.alert('test','name'+name+'passord'+password);
            //Ext.Msg.alert('test','test');
            var mask = new Ext.LoadMask(Ext.getBody(), {msg: '登录中，请稍后...'});
            mask.show();
            Ext.Ajax.request({
                url: '/eve/login.do',
                method: 'POST',
                params: {
                    name: UserName,
                    password: UserPassword
                },
                success: function (response) {

                    //var data=Ext.JSON.decode(action);
                    mask.hide();
                    var result = Ext.JSON.decode(response.responseText);

                    if (result.success == "true") {


                        //Ext.Msg.alert('r'+result.success);
                        Ext.Msg.alert('登录成功', '恭喜，登录成功！');
                        Ext.getCmp('user_name').hide();
                        Ext.getCmp('user_password').hide();
                        Ext.getCmp('login').hide();
                        Ext.getCmp('register').hide();
                        //printObject(Ext.getCmp('userName'));
                        Ext.getCmp('userName').setText('用户名：' + result.user.name + '');
                        Ext.getCmp('playerName').setText('绑定角色名：' + result.user.player);
                        Ext.getCmp('playerIsk').setText('账户余额：' + result.user.isk + ' isk');
                        //printObject(Ext.getCmp('userName'));
                        Ext.getCmp('playerIsk').show();
                        Ext.getCmp('logout').show();
                        Ext.getCmp('edit').show();
                        Ext.getCmp('userName').show();
                        Ext.getCmp('playerName').show();
                        //printObject(Ext.getCmp('userName'));
                        hashCode = result.hashCode;
                        loginUser = result.user;
                        Ext.util.Cookies.set('hashCode', hashCode);
                        Ext.util.Cookies.set('loginUser', Ext.encode(loginUser));
                    } else {


                        Ext.getCmp('user_password').setValue('');
                        //Ext.Msg.alert('r'+result.success);
                        Ext.Msg.alert('账号密码错误，请重新登录');
                    }
                },
                failure: function (response) {
                    mask.hide();
                    Ext.Msg.alert('提示', '网络连接失败');

                }

            });

        }
    },
        {
            text: '取消',
            id: 'cancel',
            hidden: true,
            handler: function () {
                Ext.getCmp('user_password2').hide();
                Ext.getCmp('register.do').hide();
                this.hide();
                Ext.getCmp('register').show();
                Ext.getCmp('login').show();
            }
        },
        {
            text: '注册',
            id: 'register.do',
            hidden: true,
            handler: function () {
                var password2 = Ext.getCmp('user_password2').getValue();
                var password = Ext.getCmp('user_password').getValue();
                if (password != password2) {
                    Ext.Msg.alert('提示', '两次输入密码不一致');
                    return;
                }
                if (password.length < 6) {
                    Ext.Msg.alert('提示', '密码长度至少6位');
                    return;
                }
                Ext.Ajax.request({
                    url: '/eve/user/register.do',
                    method: 'post',
                    params: {
                        name: Ext.getCmp('user_name').getValue(),
                        password: Ext.getCmp('user_password').getValue()

                    },
                    success: function (response, options) {

                        var result = Ext.JSON.decode(response.responseText);

                        if (result.success == "true") {
                            Ext.Msg.alert('提示', '注册成功');
                            Ext.getCmp('user_password').setValue('');
                            Ext.getCmp('user_password2').hide();
                            Ext.getCmp('register.do').hide();
                            Ext.getCmp('cancel').hide();
                            Ext.getCmp('register').show();
                            Ext.getCmp('login').show();
                        } else {
                            Ext.Msg.alert('提示', result.msg);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('提示', '网络超时');
                    }
                });
            }
        }, {
            text: '注册',
            id: 'register',
            handler: function () {
                Ext.getCmp('user_password2').show();
                Ext.getCmp('register.do').show();
                Ext.getCmp('cancel').show();
                this.hide();
                Ext.getCmp('login').hide();

            }

        }]
});