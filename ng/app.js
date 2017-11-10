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
            entry[obj.name] = entry[value];
        }
        return entry;
    },
    select: function (obj) {
        console.log('select' + JSON.stringify(obj));
//        console.log('useList.objects=' + JSON.stringify(RepeatObj.useList.objects));
        var entry = Controller.interchange();
        console.log('useList.entry=' + JSON.stringify(entry));
    }
}
execute_routerApp();
config_routerApp();
addServicesList('Post', '/data/Post.json');
RepeatObj.useList.actions = ['Send for approval.']
