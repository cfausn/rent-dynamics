# Dog Breeds API
==============

This is a simple web application built using the Flask web framework that allows users to retrieve a list of all dog breeds and their variants, as well as retrieve a random image of a specific dog breed and variant.

## Installation
------------

1.  Install the required packages

`pip install -r requirements.txt`

## Usage
-----

The application has two main endpoints:

1.  `/breeds` - Retrieves a list of all dog breeds and their variants
2.  `/image/<breed>/<subBreed>` - Retrieves a random image of a specific breed and variant. Replace `<breed>` and `<subBreed>` with the desired breed and variant.

To run the application:

`flask run --host 0.0.0.0`

## Note
----

The code uses the public dog breeds API <https://dog.ceo/dog-api/documentation/breeds-list>, which lists all breeds and their variants. It also gets the random image from the same API by sending a GET request to the API with breed and sub-breed


## Dependencies
------------

-   Flask
-   Flask-Cors
-   requests