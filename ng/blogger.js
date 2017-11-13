var BlogObj = angular.module('blogApp', []);
BlogObj.blogger = null;
function intializeBlogger() {
    BlogObj.controller('BlogController', ['$scope', function ($scope) {
        var blogger = this;
        BlogObj.blogger = blogger;
        blogger.scope = $scope;
        blogger.objects = [{
            Title: 'test',
            Message: 'The quick brown fox'
        },{
            Title: 'next',
            Message: 'jumped over the lazy dogs back.'
        }
        ];
        blogger.update = function () {
            BlogObj.blogger.scope.$apply();
        }
    }]);
    BlogObj.list = addBlogList('Blog', '/data/Blog.json');
    function addBlogList(name, file) {
        angular.bootstrap(document.getElementById("Blog"), ['blogApp']);
        var list = RepeatObj.addList(name, file, function () {
            showService(name);
            function showService(name) {
                console.log(name + ' initialize(); complete');
                try {
                    BlogObj.blogger.objects = BlogObj.list.DataMap.map;
                    BlogObj.blogger.update();
                } catch (e) {
                    console.log('showService' + e.toString());
                }
            }
        });
        return (list);
    }
}
