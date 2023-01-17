# Dog Breeds Frontend
=====

This is a standard create-react-app that displays a list of dog breeds and their variants. The app allows the user to search for specific breeds and variants, paginate through the results, and sort the results by different columns.

## Installation
------------

1.  Install the dependencies: `npm install`
2.  Start the development server: `npm start`

## Usage
-----

1.  Open <http://localhost:3000> to view the app in the browser.
2.  Use the search bar to filter the list of breeds and variants by breed name or variant name.
3.  Use the "Breeds Per Page" input to change the number of breeds displayed per page.
4.  Use the pagination controls at the bottom of the page to navigate through the pages.
5.  Click on the headers of the table columns (Breed, Variant, Number of Variants, Image) to sort the list by that column in ascending or descending order.

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