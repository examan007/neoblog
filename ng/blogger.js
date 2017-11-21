var BlogObj = angular.module('blogApp', []);
BlogObj.blogger = null;
function intializeBlogger() {
    BlogObj.controller('BlogController', ['$scope', function ($scope) {
        var blogger = this;
        BlogObj.blogger = blogger;
        blogger.title = 'Blog';
        blogger.scope = $scope;
        blogger.objects = [{
            Title: 'test',
            Comment: 'The quick brown fox'
        },{
            Title: 'next',
            Comment: 'jumped over the lazy dogs back.'
        }
        ];
        blogger.update = function () {
            BlogObj.blogger.scope.$apply();
        }
        blogger.CurrentIndex = 0;
        blogger.getComments = function () {
            var list = ['a', 'b', 'c'];
            var obj = {};
            try {
                obj = blogger.objects[blogger.CurrentIndex];
                blogger.CurrentIndex++;
                if (blogger.CurrentIndex > blogger.objects.length) {
                    blogger.CurrentIndex = 0;
                }
                var comment = obj['Comment'];
                list = eval(comment);
            } catch (e) {
                alert('getComments()'  + e.toString());
            }
            alert(JSON.stringify(obj) + '|' + JSON.stringify(list));
            return (list);
        }
    }]);
    BlogObj.list = addBlogList('Blog', '/data/Blog.json');
    function addBlogList(name, file) {
        angular.bootstrap(document.getElementById("divBlog"), ['blogApp']);
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
