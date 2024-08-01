# hello-world-containerized

## How to run the app after cloning the repository and running a container
* Navigate to the root folder of the project in the terminal.
* Run the command ***npm run dev*** to start the server.  You should see a log message that says "Hello Universe" and another one that says "server started...".
* Navigate over to ***http://localhost:5000*** to see the landing page in the browser.

## How it works
* Selecting the different dropdown menu options in the landing page will do the following actions:
  * World --> Will display a "Hello World" page.
  * Universe --> Will display a "Hello Universe" page.
  * TRACE --> Will make the server log a trace level log to the terminal.
  * DEBUG --> Will make the server log a debug level log to the terminal.
  * INFO --> Will make the server log an info level log to the terminal.
  * WARN --> Will make the server log a warn level log to the terminal and to the ***requests.log*** file.
  * ERROR --> Will make the server log an error level log to the terminal and to the ***requests.log*** file.
  * CUSTOM --> Will make the server log a custom level log to the terminal.
* The server will only write WARN and ERROR level logs to a file called requests.log inside of the logs folder.  The logger is configured to suppress lower level logs.