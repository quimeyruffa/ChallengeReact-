import axios from "axios";
import Create from "./Pages/Products/Create";
import Details from "./Pages/Products/Details";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar, Table } from "./components";

const App = () => {
  const URL = "http://localhost:5000/users";

  const [data, setData] = useState([]);

  useEffect(() =>{
    getLastIndex()
  },[])

  const getLastIndex = async () => {
     await axios
          .get(`${URL}`)
          .then((response) => {
            setData(response.data.length);
          })
          .catch((err) => alert(err));
  }

  return (
    <>
    <Sidebar index={data}/>
    <Routes>
      <Route path='/' element={<Table />} />
      <Route path={`/create/:index`} element={<Create />} />
      <Route path='/details/:id' element={<Details />} />
    </Routes>
    </>
  );
};

export default App;
