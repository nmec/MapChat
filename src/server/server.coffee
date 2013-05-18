port = 8080
io = require('socket.io').listen port

numClients = 0

io.sockets.on 'connection', (socket) ->
	countEmit 'up'

	socket.on 'disconnect', ->
		countEmit 'down'

countEmit = (dir) ->
	if dir == 'up'
		numClients++
	else if dir == 'down'
		numClients--

	io.sockets.emit 'clients', numClients

loggedInUsers = []

users = io.of '/users'

users.on 'connection', (socket) ->

	socket.on 'login', (data) ->
		loggedInUsers.push {
			name: data
		}
		console.log loggedInUsers
		users.emit 'allUsers', loggedInUsers


# chat = io.of '/chat'
# chatLog = [
# 	{
# 		text: 'hello world!'
# 		time: 'soon'
# 	},
# 	{
# 		text: 'Ember!'
# 		time: 'now'
# 	}
# ]

# chat.on 'connection', (socket) ->

# 	socket.emit 'log', chatLog

# 	socket.on 'msg', (data) ->
# 		chatLog.push data
# 		chat.emit 'msg', data


io.set 'log level', 2
io.set 'transports', ['websocket']

console.log 'Listening on port ' + port