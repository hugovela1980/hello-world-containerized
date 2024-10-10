# hello-world-containerized
## Description
This is a simple hello world application that is containerized using Docker.

### Options for running the container in the development environment:
- `docker run -p <host_port>:<container_port> -e HOST_PORT=<host_port> --name <container_name> <image_name>`
  - ***Example***: `docker run -p 50:5000 -e HOST_PORT=50 --name hwc-cont hwc:latest`
  - Make sure to match the environment variable HOST_PORT with your selected host port in your port mapping.

- `docker-compose up`
  - Host port will be 50 by default.  Simplest way to run the container in the development environment.

- `$env:HOST_PORT=YOUR_DESIRED_PORT; & docker-compose up`
  - ***Example***: `$env:HOST_PORT=8080; & docker-compose up`
  - Same as `docker-compose up` but with the HOST_PORT environment variable set to a custom host port.

### Running the container in the production environment:
- `docker-compose -f docker-compose.prod.yaml up`
  - Host port will be 50 by default.  Simplest way to run the container in the production environment.

- `$env:HOST_PORT=YOUR_DESIRED_PORT; & docker-compose -f docker-compose.prod.yaml up`
  - Example: `$env:HOST_PORT=8080; & docker-compose -f docker-compose.prod.yaml up`
  - Same as `docker-compose -f docker-compose.prod.yaml up` but with the HOST_PORT environment variable set to a custom host port.
  
### How it works
* Selecting the different dropdown menu options in the landing page will do the following actions:
  * World --> Will display a "Hello World" page.
  * Universe --> Will display a "Hello Universe" page.
  * TRACE --> Will make the server log a trace level log to the terminal.
  * DEBUG --> Will make the server log a debug level log to the terminal.
  * INFO --> Will make the server log an info level log to the terminal.
  * WARN --> Will make the server log a warn level log to the terminal and to the ***http.log*** file.
  * ERROR --> Will make the server log an error level log to the terminal and to the ***http.log*** file.
  * CUSTOM --> Will make the server log a custom level log to the terminal and to the ***http.log*** file.
* The server will only write ERROR, FATAL and CUSTOM level logs to a file called http.log inside of the logs folder.