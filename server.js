var	config = {
		account_sid: 'Twilio Account SID',
		auth_token: 'Twilio Auth Token',
		hostname: 'mydomain.com',
		port: 4444,
		number: '+15555551212'
	},
	http = require('http'),
	fs = require('fs'),
	io = require('socket.io'),
	twilio = require('twilio'),
	app = http.createServer(function(req, res){
		if('/bookmarklet.js' == req.url)
			fs.readFile(__dirname + req.url, function(err, data){
				res.writeHead(200, {'Content-Type': 'application/javascript'});
				res.write(data, 'utf8');
				res.end();
			});
	}),
	client = new twilio.Client(config.account_sid, config.auth_token, config.hostname, { port: config.port + 1 }),
	phone = client.getPhoneNumber(config.number),
	clients = {};

app.listen(config.port);
io = io.listen(app);
io.on('connection', function(socket) {
	clients[socket.sessionId] = socket;
	socket.send({ action: 'welcome', number: config.number });
	socket.on('message', function(data) {});
	socket.on('disconnect', function() {
		delete clients[socket.sessionId];
	});
});

phone.setup(function() {
	phone.on('incomingSms', function(req, res) {
		switch(req.Body.toLowerCase()) {
			case'prev':
				broadcast({ action: 'previous' });
				break;
			case'next':
				broadcast({ action: 'next' });
				break;
			default:
				http.get({
					host: 'tinysong.com',
					port: 80,
					path: '/s/' + escape(req.Body) + '?format=json&limit=1'
				}, function(resp) {
					var
						body = [],
						results;
					resp.setEncoding('utf8');
					resp.on('data', function(data) {
						body.push(data);
					});
					resp.on('end', function() {
						results = JSON.parse(body.join(''));
						if(results.length)
							broadcast({ action: 'add', song: results[0].SongID });
					});
				}).end();
		}
		res.send();
	});
});

var broadcast = function(data, id) {
	for(id in clients)
		clients[id].send(data);
};
