// In the frontend folder, create a new file called `src/App.js`
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Breeds() {
  const [breeds, setBreeds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [displayedBreeds, setDisplayedBreeds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:5000/breeds');
      setBreeds(result.data);
      setDisplayedBreeds(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setDisplayedBreeds(
      Object.entries(breeds).filter(
        ([breed, subBreeds]) =>
          breed.toLowerCase().includes(searchText.toLowerCase()) ||
          subBreeds.some(subBreed =>
            subBreed.toLowerCase().includes(searchText.toLowerCase())
          )
      )
    );
  }, [searchText, breeds]);

  
  return (
    <div className="container">
      <div className="search-container">
        <label>
          Search by Breed:<br/>
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </label>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Breed</th>
            <th className="table-header">SubBreed</th>
            <th className="table-header">Image</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(breeds)
            .filter(
              ([breed, subBreeds]) =>
                breed.toLowerCase().includes(searchText.toLowerCase()) ||
                subBreeds.some(subBreed =>
                  subBreed.toLowerCase().includes(searchText.toLowerCase())
                )
            )
            .slice(0, 10)
            .map(([breed, subBreeds]) => (
              <React.Fragment key={breed}>
                {subBreeds.map(subBreed => (
                  <tr key={subBreed}>
                    <td className="table-data">{breed}</td>
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
