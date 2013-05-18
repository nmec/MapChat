App = Ember.Application.create();
App.ApplicationController = Ember.Controller.extend();
App.IndexController = Ember.Controller.extend({
	submitHandler: function(){
		this.message;
	}
});
App.IndexRoute = Ember.Route.extend({
	redirect: function(){ 
		this.transitionTo('application'); 
	}
});
App.FriendsController = Ember.ArrayController.extend({
	content: [
	    {name: 'my name'}, 
		{name: 'my other name'}
	]
});

$(function(){
	new GMaps({
		  div: '#map-canvas',
		  lat: -12.043333,
		  lng: -77.028333
		});
});
