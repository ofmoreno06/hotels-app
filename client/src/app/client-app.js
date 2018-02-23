(function(){
'use strict';

angular.module('almundoApp', ['ui.router'])
.config(AppConfig);

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function AppConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home',{
			url: '/',
			templateUrl: './app/templates/home.template.html',
			controller: 'homeController as ctrl'
		})
};


})();
