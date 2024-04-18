browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa

activate server

server->browser: HTML file
 
deactivate server

----------------------------------------------------------------

browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.css

activate server

server->browser: CSS file

deactivate server

----------------------------------------------------------------

browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js

activate server

server->browser: JavaScript file

deactivate server

NOTE: Browser executes the JS-script that fetches the data.json from /exampleapp/data.json

NOTE: Browser executes the redrawNotes() function immadetially after the data below is loaded, thus displaying the notes on the page

----------------------------------------------------------------

browser->server: GET https://studies.cs.helsinki.fi/exampleapp/data.json

activate server

server->browser: [{"content": "test","date": "2024-04-18T20:20:46.626Z"}, ...], an array of Objects

deactivate server
