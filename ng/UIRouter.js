var UIRouterModule = angular.module('routerApp', ['ui.router']);
var UIRouter = null;
var UIRouterManager = {
    getController: function () {
        return (UIRouter);
    },
    Current: 'Blog',
    switchToSection: function (section) {
        console.log('switchToSection(); [' + section + ']');
        try {
            $(document.getElementById(UIRouterManager.Current)).hide();
        } catch (e) {
            console.log('switchToSection.hide' + e.toString());
        }
        UIRouterManager.Current = section;
        try {
            $(document.getElementById(UIRouterManager.Current)).show();
        } catch (e) {
            console.log('switchToSection.hide' + e.toString());
        }
    }
}
function execute_routerApp() {
    UIRouterModule.controller('UIRouterController', ['$scope', function ($scope) {
        UIRouter = this;
        UIRouter.objects = []
        UIRouter.update = function (map) {
            UIRouter.objects = map;
            try {
                console.log('before triggerHandler');
                var element = angular.element('#UIRouterUpdate');
                element.triggerHandler('click');
                console.log('done triggerHandler');
            } catch (e) {
                console.log(e);
            }
            $scope.load = function () {

            }
        }
    }]);
    UIRouterModule.component('home', {
      template:  '',
      controller: function() {
          UIRouterManager.switchToSection('Blog');
      }
    });
    UIRouterModule.component('about', {
      template:  '',
      controller: function() {
          UIRouterManager.switchToSection('about');
      }
    });
    UIRouterModule.component('post', {
      template:  '',
      controller: function() {
          UIRouterManager.switchToSection('Account');
      }
    });
    UIRouterModule.component('contact', {
      template:  '',
      controller: function() {
          UIRouterManager.switchToSection('contact');
      }
    });
}
function config_routerApp() {
    console.log('config_routerApp(); ');
    UIRouterModule.config(function($stateProvider) {
        var homeState = {
            name: 'home',
            url: '/home',
            component: 'home'
        }
        var aboutState = {
            name: 'about',
            url: '/about',
            component: 'about'
        }
        var postState = {
            name: 'post',
            url: '/post',
            component: 'post'
        }
        var contactState = {
            name: 'contact',
            url: '/contact',
            component: 'contact'
        }
          $stateProvider.state(homeState);
          $stateProvider.state(aboutState);
          $stateProvider.state(postState);
          $stateProvider.state(contactState);
    });
}

