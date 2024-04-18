
! ADD NEW NOTE IS AT THE BOTTOM !

----------------------------------------------------------------

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

----------------------------------------------------------------

browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

As soon as the note is created, the browser executes the JavaScript-file and thus:

- Browser executes the JS-script that fetches the updated (with the new note) data.json from /exampleapp/data.json

- Browser executes the redrawNotes() (Updates the UI) function immadetially after the data with the new note is loaded, thus displaying the notes on the page without reloading the page after the new note is added

activate server

server->browser: {"message": "note created"} (logged to console)

deactivate server
