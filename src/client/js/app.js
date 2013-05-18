App = Ember.Application.create({});
App.ApplicationController = Ember.Controller.extend({
	init: function(){
		var _this = this;
		
		getGeoLocation();
		initMap();
		
		function initMap(){
			$(function(){
				_this.map = new GMaps({
					div: '#map-canvas',
					lat: _this.get('lat'),
					lng: _this.get('lng'),
					zoom: 4,
					mapTypeControl: false
				});
				_this.addObserver('lat', _this, 'geoPositionChangeHandler');
				_this.addObserver('lng', _this, 'geoPositionChangeHandler');
			});
		}
		
		function getGeoLocation(){
			GMaps.geolocate({
				success: function(position) {
					var coords = position.coords;
					_this.set('lat', coords.latitude);
					_this.set('lng', coords.longitude);
				},
				error: function(error) {
					alert('Geolocation failed: '+error.message);
				},
				not_supported: function() {
					alert("Your browser does not support geolocation");
				}
			});
		}
	},
	geoPositionChangeHandler: function(){
		this.map.setCenter(this.get('lat'), this.get('lng'));
	},
	map: null,
	lat: 0,
	lng: 0
});
App.IndexController = Ember.Controller.extend({
	loggedIn: false,
	name: null,
	loginHandler: function(name){
		if(name) {
			this.toggleProperty('loggedIn');
		} else {
			alert('ENTER A NAME!');
		}	
	},
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
App.LoginController = Ember.Controller.extend({
	needs: 'index',
	loginHandler: function(){
		var index = this.get('controllers.index');
		index.loginHandler(this.name);
		index.set('name', this.name);
	}
});