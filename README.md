MapChat UI (frontend)
=====================

General idea is to post and display short messages in a Map.

### Status
[![Build Status](https://travis-ci.org/hoofmen/mapchat_ui.svg?branch=master)](https://github.com/hoofmen/mapchat_ui)

### Relevant Development Tools
* Express 4.15.2
* Babel 6.2.4
* React/React-DOM 15.5.4
* React Google Maps 6.3.0
* Superagent 3.5.2
* Webpack 2.4.1

### How to develop

Install dependencies
```sh
	npm install
```

Run the json-server (for Mocked API responses)
```sh
	npm run api
```

This will respond mocked map-messages if you hit the following URL http://localhost:3004/mapmessages
The mocked responses are defined in file db.json


Run the server in DEV mode, this will hot reload any code changes you make
```sh
	npm run dev
```

Then go to http://localhost:8090


### How to build/run for PROD
```sh 
	npm install
	npm run build
	npm run start
```

Then go to http://localhost:8090

### Live Demo
https://mymapchatui.herokuapp.com
