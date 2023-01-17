import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

function Breeds() {
  const [breeds, setBreeds] = useState([]); 
  const [searchText, setSearchText] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [breedsPerPage, setBreedsPerPage] = useState(10); 
  const [sortOrder, setSortOrder] = useState({ breed: 'asc', variant: 'asc', number: 'asc', image: 'asc' }); // added state to store the sort order of each column
  const [sortBy, setSortBy] = useState('breed'); // added state to store the column to sort by

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:5000/breeds'); // Making a GET request to the '/breeds' endpoint on the flask backend
      setBreeds(result.data); // Setting the fetched data to the 'breeds' state
    }
    fetchData(); // Calling the function to fetch the data on component mount
  }, []);

  // added function to handle sorting
  const handleSort = (column) => {  
    if (sortBy === column) {
      setSortOrder({ ...sortOrder, [column]: sortOrder[column] === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortBy(column);
      setSortOrder({ breed: 'asc', variant: 'asc', number: 'asc', image: 'asc', [column]: 'asc' });
    }
  }

  const filteredBreeds = Object.entries(breeds).filter(([breed, subBreeds]) => // Filtering the breeds data based on the search text input
    breed.toLowerCase().includes(searchText.toLowerCase()) ||
    subBreeds.some(subBreed => subBreed.toLowerCase().includes(searchText.toLowerCase()))
  );

  // added sorting logic
  const sortedBreeds = filteredBreeds.sort((a, b) => {
    let sortVal = 0;
    if (sortBy === 'breed') {
      sortVal = a[0].localeCompare(b[0]);
    } else if (sortBy === 'variant') {
      sortVal = a[1][0].localeCompare(b[1][0]);
    } else if (sortBy === 'number') {
      sortVal = a[1].length - b[1].length;
    } else if (sortBy === 'image') {
      sortVal = a[1][0].localeCompare(b[1][0]);
    }
    if (sortOrder[sortBy] === 'desc') {
      sortVal *= -1;
    }
    return sortVal;
  });

  const indexOfLastEntry = currentPage * breedsPerPage; // Calculating the index of the last entry to display on the current page
  const indexOfFirstEntry = indexOfLastEntry - breedsPerPage; // Calculating the index of the first entry to display on the current page
  const currentEntries = filteredBreeds.slice(indexOfFirstEntry, indexOfLastEntry); // Getting the current entries to display

  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Function to update the current page number

  return (
    <div className="container">
      <div className="search-container">
        <label>
          Search by Breed:
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </label>
      </div>
      <div className="breeds-per-page">
        <label>
          Breeds Per Page
          <input
            type="number"
            value={breedsPerPage}
            onChange={e => {e.target.value >= 1 ? setBreedsPerPage(e.target.value) : setBreedsPerPage(1)}}
          />
        </label>
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredBreeds.length / breedsPerPage) }, (_, i) => (
          <span key={i} onClick={() => paginate(i + 1)} className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}>
            {i + 1}
          </span>
        ))}
      </div>
      <table className="table">
        <thead>
          <tr>
                <th className="table-header" style={{borderBottom: '2px solid black'}} onClick={() => handleSort('breed')}>Breed</th>
                <th className="table-header" style={{borderBottom: '2px solid black'}} onClick={() => handleSort('variant')}>Variant</th>
                <th className="table-header" style={{borderBottom: '2px solid black'}} onClick={() => handleSort('number')}>Number of Variants</th>
                <th className="table-header" style={{borderBottom: '2px solid black'}} onClick={() => handleSort('image')}>Image</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map(([breed, subBreeds]) => (
            <React.Fragment key={breed}>
              {subBreeds.map((subBreed, index) => (
                <tr key={subBreed} style={index === 0 ? {backgroundColor: '#F5F5DC'} : {backgroundColor: '#D8D8A9'}}>
                  {index === 0 ? <td className="table-data">{breed}</td> : <td className="table-data"></td>}
                  <td className="table-data">{subBreed}</td>
                  {index === 0 ? <td className="table-data">{subBreeds.length}</td> : <td className="table-data"></td>}
                  <td className="table-data">
                    <img className="image" src={`http://localhost:5000/image/${breed}/${subBreed}`} alt={`${breed} ${subBreed}`} />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default Breeds;