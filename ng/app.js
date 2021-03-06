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
    Modal: null,
    List: null,
    setModal: function (name) {
        if (Controller.Modal == null) {
            Controller.Modal = RepeatObj.useList.setModal(name);
        }
        return (Controller.Modal);
    },
    options: function (obj) {
        console.log('options' + JSON.stringify(obj));
    },
    interchange: function () {
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
        Controller.Modal = null;
        var modalobj = Controller.setModal('Post');
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
        function complete (callback) {
            var success = callback
            return (function (json) {
                Controller.Complete = function () {
                    RepeatObj.useList.results = [];
                    RepeatObj.useList.results.push({
                        name: "Successfully sent:",
                        message: "Blog will be updated once message has been approved."
                    });
                    Controller.clearflag = true;
                    RepeatObj.useList.dialog.show();
                    RepeatObj.useList.update();
                }
                success(json);
            })
        }
        function error (callback) {
            var failure = callback;
            return (function (err) {
                RepeatObj.useList.results.push(err);
                failure(err);
            });
        }
        function translate (data) {
        	var objects = RepeatObj.useList.objects; //data;
            var fields = RepeatObj.useList.fields;;
	        for (var i = 0; i < objects.length; i++) {
	            var obj = objects[i];
	            var name = obj.name;
                obj.data = data;
	            RepeatObj.useList.checkAttr(obj, obj.value, 'output');
                console.log('translate()' + JSON.stringify(obj));
	        }
        }
        try {
            console.log(funcname + JSON.stringify(data));
            translate(data);
            console.log('translated' + JSON.stringify(data));
            ret = true;
            if (Controller.List == null) {
                failure('Error, Controller.List is null!');
            } else {
                Controller.List.sendData('http://chicnun.com:8090/private', data, complete(success), error(failure));
            }
        } catch (e) {
            console.log(funcname + e.toString());
            RepeatObj.useList.results.push(e.toString());
        }
        return (ret);
    }
}
try {
    $(document.getElementById('Account')).hide();
} catch (e) {}
execute_routerApp();
config_routerApp();
Controller.List = addServicesList('Post', '/data/Post.json');
RepeatObj.useList.actions = ['Send to Blog.'];
RepeatObj.useList.nonempty = function (value, obj) {
    var ret = true;
    if (value.length <= 0) {
        ret = false;
        obj.message = 'Empty value not allowed.'
    }
    obj.result = ret;
    return (ret);
}
RepeatObj.useList.userlinked =  function (value, obj) {
    var ret = RepeatObj.useList.username(value, obj);
    Controller.setModal('Post');
    if (ret == true  && value.length > 0) {
        RepeatObj.useList.results.push({
            name: "Not Allowed:",
            message: "Only anonymous posts are supported."
        });
        ret = false;
    }
    return (ret);
}
RepeatObj.useList.outputmessage = function (value, obj) {
    var ret = true;
    var lines = value.split('\n');
    var first = true;
    var data = obj.data;
    lines.forEach( function (value) {
        try {
            if (first) {
                first = false;
                data.forEach( function (pair) {
                    if (pair.key == obj.name) {
                        pair.value = value;
                        pair.type = 'array';
                        return (false)
                    }
                });
             } else {
                var newobj = {
                    key: obj.name,
                    value: value,
                    type: 'array'
                }
                data.push(newobj);
            }
        } catch (e) {
            alert(e.toString());
        }
    });
    console.log('outputmessage' + JSON.stringify(lines));
    obj.result = true;
    return (ret);
}
intializeBlogger();

