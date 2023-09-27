import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  useEffect(() => {
    const fetchData = async function () {
      const data = await fetch('https://api.publicapis.org/entries');
      const res = await data.json();
      setData(res?.entries);
      console.log(res?.entries);
    };
    fetchData();
  }, []);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const displayData = data.slice(firstIndex, lastIndex);
  function nextPageHandler() {
    setCurrentPage((prev) => {
      return prev + 1;
    });
  }
  function prevPageHandler() {
    setCurrentPage((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  }
  return (
    <>
      <div>
        {displayData && (
          <table>
            <tr>
              <th>API</th>
              <th>Description</th>
              <th>Auth</th>
              <th>Category</th>
              <th>Cors</th>
              <th>HTTPS</th>
              <th>Link</th>
            </tr>
            {displayData.map((item) => {
              return (
                <tr>
                  <td>{item?.API}</td>
                  <td>{item?.Description}</td>
                  <td>{item?.Auth}</td>
                  <td>{item?.Category}</td>
                  <td>{item?.Cors}</td>
                  <td>{String(item?.HTTPS)}</td>
                  <td>{item?.Link}</td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
      <div className="buttons">
        <button onClick={prevPageHandler}>Previous</button>
        <button onClick={nextPageHandler}>Next</button>
      </div>
    </>
  );
}

export default App;
