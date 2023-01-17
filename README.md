# Rent Dynamics 
==============

Here is my solution to the problem, I used a React frontend and a Python flask backend. I've also provided two separate ways to run the app (in case you don't have docker installed)

## Run with Docker
------------

1.  Open the repo in a terminal (make sure docker is running).
2.  Run `chmod +x start-docker.sh` to provide the shell script to execute permissions.
3.  Run `./start-docker.sh`. 
4.  Your docker instance should start automatically, the frontend is on `http://localhost:3000` and the backend is on `http://localhost:5000`.

## Run with pm2
-----

1.  Open the repo in a terminal (make sure docker is running).
2.  Run `chmod +x start-with-pm2.sh` to provide the shell script to execute permissions.
3.  Run `sudo ./start-with-pm2.sh` (sudo is needed to install pm2, a global npm module). 
4.  Your pm2 instance should start automatically, the frontend is on `http://localhost:3000` and the backend is on `http://localhost:5000`.
   
## Component
---------

The Breeds component is the main component of the app. It renders a search bar, pagination controls, and a table that displays the list of breeds and variants. The component makes a GET request to an API endpoint to fetch the data for the breeds and variants, and uses state hooks to store the data, search text, current page number, and number of breeds per page. The component also includes logic for filtering, pagination and sorting the data based on user inputs.

## API
---

The API endpoint that the component makes a GET request to is located at `http://localhost:5000/breeds`. This endpoint should return a JSON object containing the data for the breeds and variants, as well as images for those variants.

## Dependencies
------------

-   react
-   react-dom
-   axios