socket = io.connect 'http://localhost:8080'

usersConnected = 0
socket.on 'clients', (data) ->
	App.set 'usersConnected', data

App = Ember.Application.create {
	usersConnected: usersConnected
}

jQuery(document).ready ($) ->

	$(document).foundation()