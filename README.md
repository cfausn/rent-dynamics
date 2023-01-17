# Rent Dynamics 
=====

Here is my solution to the problem, I used a React frontend and a Python flask backend. I've also provided two separate ways to run the app (in case you don't have docker installed)

## Run with Docker
------------

1.  Open the repo in a terminal (make sure docker is running).
2.  Run `chmod +x start-docker.sh` to provide the shell script with execute permissions.
3.  Run `./start-docker.sh`. 
4.  Your docker instance should start automatically, the frontend is on `http://localhost:3000` and the backend is on `http://localhost:5000`.

## Run with pm2
-----

1.  Open the repo in a terminal (make sure docker is running).
2.  Run `chmod +x start-with-pm2.sh` to provide the shell script with execute permissions.
3.  Run `sudo ./start-with-pm2.sh` (sudo is needed to install pm2, a global npm module). 
4.  Your pm2 instance should start automatically, the frontend is on `http://localhost:3000` and the backend is on `http://localhost:5000`.

## Dependencies
------------

-   python3
-   npm