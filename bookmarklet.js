var gs = window.Grooveshark, twshark = {
	actions: {
		add: function(data) {
			gs.addSongsByID([data.song], 'playing' == gs.getCurrentSongStatus().status ? false : true);
		},
		next: function() {
			gs.next();
		},
		previous: function() {
			gs.previous();
		},
		welcome: function(data) {
			$('<div>Text a song to ' + data.number + '</div>').css({
				background: 'rgba(0, 0, 0, .6)',
				color: '#fff',
				overflow: 'hidden',
				fontSize: '32px',
				fontWeight: 400,
				lineHeight: '64px',
				margin: 0,
				padding: 0,
				position: 'absolute',
				top: '30%',
				left: 0,
				zIndex: 10000,
				width: '100%',
				textAlign: 'center'
			}).appendTo('body');
		}
	},
	init: function() {
		$('#pixelFrame,#pixelFrameWrapper').height(1);
		$.getScript('http://cdn.socket.io/stable/socket.io.js', function() {
			var socket = new io.Socket('mydomain.com', { port: 4444 });
			socket.connect();
			socket.on('message', function(data){
				if(data.action in twshark.actions)
					twshark.actions[data.action](data);
			});
			gs.addSongsByID([24959934], true);
		});
	}
};
twshark.init();
