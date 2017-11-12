var exports = new Object();
var ScrollGovernor = {
    stopCurrent: function () { },
    registerScroll: function () { },
    total: 0
};
function scrollController(element) {
}
var Application = {
    Controller: {
        Classname: 'Service',
        sequence: 0
    },
    getOptionEntry: function () {
        return ({
            entry: {
                Action: 'Done'
            }
        });
    }
}
var Controller = {
    UserId: 0,
    Password: 'nginx',
    options: function (obj) {
        console.log('options' + JSON.stringify(obj));
    },
    interchange () {
        var entry = {};
        for (var i = 0; i < RepeatObj.useList.objects.length; i++) {
            var obj = RepeatObj.useList.objects[i];
            console.log('obj=' + JSON.stringify(obj));
            entry[obj['name']] = obj['value'];
        }
        console.log('interchange(), useList.entry=' + JSON.stringify(entry));
        return (entry);
    },
    clearflag: false,
    select: function (obj) {
        console.log('select' + JSON.stringify(obj));
//        console.log('useList.objects=' + JSON.stringify(RepeatObj.useList.objects));
        var entry = Controller.interchange();
        var modalobj = RepeatObj.useList.setModal('Post');
        modalobj.base_hide = modalobj.hide;
        modalobj.hide = function () {
            modalobj.base_hide();
            if (Controller.clearflag == true) {
                RepeatObj.useList.clearObjects(true);
                RepeatObj.useList.update();
                Controller.clearflag = false;
            }
        }
        console.log('select done!' + JSON.stringify(obj));
    },
    checkForm: function (success, failure, data) {
        var funcname = 'Controller.checkForm';
        var ret = false;
        try {
            console.log(funcname + data);
            ret = true;
            RepeatObj.useList.results = [];
            RepeatObj.useList.results.push({
                name: "Successfully sent:",
                message: "Blog will be updated after message has been approved."
            });
            Controller.clearflag = true;
            RepeatObj.useList.dialog.show();
            success();
        } catch (e) {
            console.log(funcname + e.toString());
        }
        return (ret);
    },

}
execute_routerApp();
config_routerApp();
addServicesList('Post', '/data/Post.json');
RepeatObj.useList.actions = ['Send to Blog.'];
RepeatObj.useList.userlinked =  function (value, obj) {
    var ret = false;
    if ((ret = RepeatObj.useList.username(value, obj)) == true) {
        if (value.length > 0) {
            RepeatObj.useList.results.push({
                name: "Not Allowed:",
                message: "Only anonymous posts are supported."
            });
            ret = false;
        }
    } else {
    }
    return (ret);
}

