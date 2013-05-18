express = require 'express'
app = express()
server = require('http').createServer(app)
io = require('socket.io').listen(server)
port = 8080
# app.use express.static __dirname + '/public'

# app.get '/', (req, res) ->
# 	res.sendfile __dirname + '/public/index.html'

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
server.listen port
console.log 'Listening on port ' + port