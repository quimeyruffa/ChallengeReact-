import axios from "axios";
import { MDBContainer } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Form } from "../../components";
import { useParams } from "react-router-dom";

const Create = () => {
  let { index } = useParams();
  const idProduct = parseInt(index);
  const URL = "http://localhost:5000/users";
  const [newData, setNewData] = useState({
    name: "",
    category: "",
    code: "",
    id: idProduct * 2,
  });

  const handleSave = async () => {
    await axios
      .post(`${URL}`, newData)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.href = "/";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <MDBContainer>
      <div className="flex card">
        <h2>Create Product</h2>
        <Form handleChange={handleChange} handleSave={handleSave} />
      </div>
    </MDBContainer>
  );
};

export default Create;
