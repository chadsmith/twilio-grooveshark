# Twilio + Grooveshark Mashup

# Requirements
* Web Server
* Node.js
* [Twilio Account](https://www.twilio.com/try-twilio)

## Step 1: Install dependent modules
	npm install connect express socket.io twilio

## Step 2: Get the Code
Download the latest release and unpack the source code onto your server

## Step 3: Configure settings
Open server.js and bookmarklet.js and enter your domain name, port number, twilio account info

## Step 4: Use the app
Log into Grooveshark and run the bookmarklet (substitute your domain name and port):

	javascript:(function(){if('undefined'==(typeof window.twshark)){document.body.appendChild(document.createElement('script')).src='http://mydomain.com:4444/bookmarklet.js?_='+new%20Date().getTime()}})();
	
Text a song name to add the song to the queue or next/prev to move through the queue.
