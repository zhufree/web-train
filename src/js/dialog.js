require.config({
    baseUrl: '../dist/js',
    paths: {
        'jquery': ['http://cdn.bootcss.com/jquery/2.2.3/jquery'],
        'bdtemplate': ['lib/baiduTemplate.min']
    }
});
require(['jquery', 'bdtemplate'], 
function($) {
    var bt = baidu.template;
    var dftDialog = {
        context: '.container',
        hasMask: true,
        hasTitle: true,
        title: 'Dialog',
        hasMsg: true,
        msgContent: 'TEXT',
        hasInput: false,
        placeHolder: 'notice',
        hasTemplate: false,
        template: '',
        hasCancelBtn: false,
        isLoginDialog: false
    };

    $(document).on('click', '.create', function(event) {
        event.preventDefault(); 
        var fnDialog = {};
        switch (event.target.id) {
            case 'create-sp' :
                $.extend(true, fnDialog, dftDialog);
                break;
            case 'create-inp' :
                $.extend(true, fnDialog, dftDialog, {
                    title: 'inputDialogTitle',
                    hasMsg: false,
                    hasInput: true,
                    placeHolder: 'inputPlaceHolder',
                    hasCancelBtn: true
                });
                break;
            case 'create-cpl' :
                $.extend(true, fnDialog, dftDialog, {
                    title: 'CompleteDialogTitle',
                    hasMsg: false,
                    hasTemplate: true,
                    template: '<textarea></textarea>',
                    hasCancelBtn: true
                });
                break;
            case 'create-login' :
                $.extend(true, fnDialog, dftDialog, {
                    title: 'LoginDialog',
                    hasMsg: false,
                    isLoginDialog: true
                })
            default:
                break;
        }
        // console.log(fnDialog);
        var dialogDom = bt('testDialog', fnDialog);
        $(fnDialog.context)[0].innerHTML = dialogDom;
    })
    .on('click', '.dlg-sure-btn, .dlg-cancel-btn', function(event) {
        thisDialog = $(event.target).closest('.dlg-cover') || $(event.target).closest('.dlg-box');
        thisDialog.remove();
    });
});
