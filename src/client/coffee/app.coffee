users = io.connect(":8080/users")
App = Ember.Application.create()

App.ApplicationRoute = Ember.Route.extend(activate: ->

	self = this

	users.on "allUsers", (data) ->
		self.controllerFor("friends").set "content", data

)

App.ApplicationController = Ember.Controller.extend(

	init: ->

		initMap = ->
			$ ->
				self.map = new GMaps(
					div: "#map-canvas"
					lat: self.get("lat")
					lng: self.get("lng")
					zoom: 4
					mapTypeControl: false
				)
				self.addObserver "lat", self, "geoPositionChangeHandler"
				self.addObserver "lng", self, "geoPositionChangeHandler"

		getGeoLocation = ->
			GMaps.geolocate
				success: (position) ->
					coords = position.coords
					self.set "lat", coords.latitude
					self.set "lng", coords.longitude
					users.emit "location",
						lat: self.get("lat")
						lng: self.get("lng")


				error: (error) ->
					alert "Geolocation failed: " + error.message

				not_supported: ->
					alert "Your browser does not support geolocation"

		self = this
		getGeoLocation()
		initMap()
		users.on "pins", (data) ->
			self.map.removeMarkers()
			self.map.addMarkers data


	geoPositionChangeHandler: ->
		@map.setCenter @get("lat"), @get("lng")

	map: null
	lat: 0
	lng: 0
)

App.IndexController = Ember.Controller.extend(
	loggedIn: false
	name: null
	loginHandler: (name) ->
		if name
			@toggleProperty "loggedIn"
			users.emit "login", name
		else
			alert "ENTER A NAME!"

	submitHandler: ->
		msg = @message
)

App.IndexRoute = Ember.Route.extend(redirect: ->
	@transitionTo "application"
)

App.FriendsController = Ember.ArrayController.extend(content: [])

App.LoginController = Ember.Controller.extend(
	needs: "index"
	loginHandler: ->
		index = @get("controllers.index")
		index.loginHandler @name
		index.set "name", @name
)