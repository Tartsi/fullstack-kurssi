browser->server: POST https://studies.cshelsinki.fi/exampleapp/new_note

activate server

server->browser: Redirected to GET request below
 
deactivate server

----------------------------------------------------------------

browser->server: GET https://studies.cs.helsinkifi/exampleapp/notes

activate server

server->browser: HTML document

deactivate server

----------------------------------------------------------------

browser->server: GET https://studies.cs.helsinkifi/exampleapp/main.css

activate server

server->browser: the css file

deactivate server

----------------------------------------------------------------

browser->server: GET https://studies.cs.helsinkifi/exampleapp/main.js

activate server

server->browser: the JavaScript file

deactivate server

Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

----------------------------------------------------------------

browser->server: GET https://studies.cs.helsinkifi/exampleapp/data.json ! With updated notes !

activate server

server->browser: [{ "content": "testnote","date": "2024-18-04" }, ... ]

deactivate server

Note right of browser: The browser executes the callback function that renders the notes
