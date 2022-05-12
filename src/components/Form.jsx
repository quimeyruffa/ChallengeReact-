import React from "react";

const Form = (props) => {
  const { item, handleChange, saveChanges, handleSave, Delete } = props;

  return (
    <div key={item ? item.id : "form_createProduct"}>
      <div className="input">
        <h5>Name</h5>
        <div>{item && <span> {item.name} </span>}</div>
        <input type="text" name="name" onChange={(e) => handleChange(e)} />
        {item && <button onClick={() => saveChanges()}>edit</button>}
      </div>
      <div className="input">
        <h5>Category</h5>
        <div>{item && <span> {item.category} </span>}</div>
        <input type="text" name="category" onChange={(e) => handleChange(e)} />
        {item && <button onClick={() => saveChanges()}>edit</button>}
      </div>
      <div className="input">
        <h5>Code</h5>
        <div>{item && <span> {item.code} </span>}</div>
        <input type="text" name="code" onChange={(e) => handleChange(e)} />
        {item && <button onClick={() => saveChanges()}>edit</button>}
      </div>
      <div className="input" style={{ width: "100%" }}>
        {!item ? (
          <button style={{ width: "100%" }} onClick={() => handleSave()}>
            Save
          </button>
        ) : (
          <button style={{ width: "100%", background:'#FF4949', border:'none'}} onClick={() => Delete()}>
            Delete Product
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
