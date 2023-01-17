// In the frontend folder, create a new file called `src/App.js`
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Breeds() {
  const [breeds, setBreeds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:5000/breeds');
      console.log("result", JSON.stringify(result.data))
      setBreeds(result.data);
    }
    fetchData();
  }, []);

  const filteredBreeds = Object.entries(breeds).filter(([breed, subBreeds]) =>
    breed.toLowerCase().includes(searchText.toLowerCase()) ||
    subBreeds.some(subBreed => subBreed.toLowerCase().includes(searchText.toLowerCase()))
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredBreeds.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  
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
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredBreeds.length / entriesPerPage) }, (_, i) => (
          <span key={i} onClick={() => paginate(i + 1)} className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}>
            {i + 1}
          </span>
        ))}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header" style={{borderBottom: '2px solid black'}}>Breed</th>
            <th className="table-header" style={{borderBottom: '2px solid black'}}>SubBreed</th>
            <th className="table-header" style={{borderBottom: '2px solid black'}}>Image</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map(([breed, subBreeds]) => (
            <React.Fragment key={breed}>
              {subBreeds.map((subBreed, index) => (
                <tr key={subBreed} style={index === 0 ? {borderTop: '2px solid black'} : {}}>
                  {index === 0 ? <td className="table-data">{breed}</td> : <td className="table-data"></td>}
                  <td className="table-data">{subBreed}</td>
                  <td className="table-data">
                    <img
                      className="image"
                      src={`http://localhost:5000/image/${breed}/${subBreed}`}
                      alt={`${breed} ${subBreed}`}
                    />
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
