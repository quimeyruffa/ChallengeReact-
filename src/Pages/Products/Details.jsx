import axios from "axios";
import { Form } from "../../components";
import { MDBContainer } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const URL = "http://localhost:5000/users";
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  let { id } = useParams();
  const idProduct = parseInt(id);

  useEffect(() => {
    getDetailsProduct();
  }, []);

  const getDetailsProduct = async () => {
    return await axios
      .get(`${URL}?id=${idProduct + 1}`)
      .then((response) => {
        setData(response.data);
        setNewData(response.data[0]);
      })
      .catch((err) => alert(err));
  };

  const saveChanges = async () => {
    await axios
      .put(`${URL}/${idProduct + 1}/`, newData)
      .then((resp) => {
        const array = [resp.data];
        setData(array);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Delete = async () => {
    await axios
      .delete(`${URL}/${idProduct + 1}/`)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
      window.location.href = '/' 
  };
  return (
    <MDBContainer>
      <div className="flex card ">
        <h2>Details Product</h2>
        {data.map((item, index) => (
          <Form
            key={`productItem${index}`}
            item={item}
            handleChange={handleChange}
            saveChanges={saveChanges}
            Delete={Delete}
          />
        ))}
      </div>
    </MDBContainer>
  );
};

export default Details;
