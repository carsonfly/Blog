/**
 * Created by carson on 2016/6/13.
 */
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.panel.*',
    'Ext.layout.container.Border'
]);
var html = "";
var tabIndex = 0;
Ext.onReady(function () {
    Ext.QuickTips.init();
    //Ext.util.CSS.swapStyleSheet("theme", "/ext/resources/css/ext-all-access.css" );
    init();
});
var init = function () {
    var bodyWidth = Ext.getBody().getWidth();
    var bodyHeight = Ext.getBody().getHeight();

    Ext.create('Ext.Panel', {
        id: 'mainPanel',
        title: '技师考试',
        renderTo: Ext.getBody(),
        width: bodyWidth,
        height: bodyHeight,
        layout: 'border',
        autoScroll: true,
        defaults: {
            split: true,                 //是否有分割线
            collapsible: true,           //是否可以折叠
            bodyStyle: 'padding:15px'
        },

        buttons: [{
            text: 'load',
            handler: function () {
                load(0);
            }
        }, {
            text: 'handin',
            handler: function () {
                load(1);
            }
        }],
        html: "loading..",
        listeners: [{
            //afterrender:load()
            //beforerender:load()
        }]

    });
}
function printObject(obj) {

    var temp = "";
    for (var i in obj) {//用javascript的for/in循环遍历对象的属性
        temp += i + ":" + obj[i] + "\n";
    }
    alert(temp);
}
function load(handin) {
    //printObject(Ext.getCmp('mainPanel'));

    //Ext.MessageBox.alert('成功', 'html');
    Ext.Ajax.request({
        url: 'js/ExamView/questions.json',


        method: 'GET',
        success: function (response, options) {
            html = '';
            //Ext.MessageBox.alert('成功', '从服务端获取结果: ' + response.responseText);
            var lib = Ext.decode(response.responseText);


            //panel.setHtml('loading...');
            //Ext.MessageBox.alert('questionLibs',lib['questionLibs'][1]);
            var jishiLib = lib['questionLibs'][1];
            var questions = jishiLib['questions'];
            questions.sort(function (a, b) {
                return b['id'] - a['id'];
            });
            //printObject(questions[0]['sterm']);
            //Ext.MessageBox.alert('question',questions[0]);
            //Ext.MessageBox.alert('questionLibs',questions);
            for (var i = 0; i < questions.length; i++) {
                var question = questions[i];
                var type = question['type'];
                //printObject(question);
                var sterm = question['sterm'][0];
                var choices = question['choices'];
                var regSterm = new RegExp('[A-F].');
                //Ext.MessageBox.alert('question',question);
                html = html + "<br>" + "(出现频率" + (question['id'] + 1) + ") " + sterm + "<br>";
                if (type == '单选题' || type == '判断题') {
                    for (var choice in choices) {
                        if (handin == 1 && choices[choice])
                            html = html + "<input type='radio' checked='checked'>" + choice.replace(regSterm, '') + "<br>";
                        else
                            html = html + "<input type='radio'>" + choice.replace(regSterm, '') + "<br>";
                    }
                }

                else if (type == '多选题') {
                    for (var choice in choices) {
                        if (handin == 1 && choices[choice])
                            html = html + "<input type='checkbox' checked='checked'>" + choice.replace(regSterm, '') + "<br>";
                        else
                            html = html + "<input type='checkbox'>" + choice.replace(regSterm, '') + "<br>";
                    }
                }
                //Ext.MessageBox.alert('html',html);
            }
            Ext.getCmp('mainPanel').setHtml(html);
            //Ext.MessageBox.alert('html',html);
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
        }
    });
    //Ext.MessageBox.alert('html',html);
    return null;
}