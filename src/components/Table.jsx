import axios from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

function Table() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(4);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");
  const sortOptions = ["name", "category", "code"];

  useEffect(() => {
    loadUsersData(0, 4, 0);
  }, []);
  const URL = "http://localhost:5000/users";

  // get details
  const handlerDetails = (selectedRow) => {
    window.location.href = '/details/' + selectedRow
  };
  const loadUsersData = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    switch (optType) {

      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(`${URL}?q=${value}&_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => alert(err));

      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `${URL}?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => alert(err));

      default:
        return await axios
          .get(`${URL}?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => alert(err));
    }
  };

  const handleReset = () => {
    setValue("");
    setSortValue("");
    setOperation("");
    setSortFilterValue("");
    loadUsersData(0, 4, 0);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    loadUsersData(0, 4, 0, "search");
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadUsersData(0, 4, 0, "sort", value);
  };

 
  const renderPagination = () => {
    if (data.length  < 4 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => loadUsersData(4, 8, 1, operation, sortFilterValue)}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 4,
                  currentPage * 4,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage + 1) * 4,
                  (currentPage + 2) * 4,
                  1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 4,
                  currentPage * 4,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return (
    <MDBContainer
      style={{
        background: "white",
        boxShadow: "rgb(0 0 0 / 10%) 0px 1px 20px 0px",
        borderRadius: "32px",
      }}
    >
      {data.length > 0 && (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "80px",
              paddingTop: "25px",
            }}
          >
            <h2>Product Table</h2>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <form
              style={{
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
              }}
              className="d-flex input-group w-auto"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search ..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <MDBBtn type="submit" color="dark">
                Search
              </MDBBtn>
              <MDBBtn
                className="mx-2"
                color="info"
                onClick={() => handleReset()}
              >
                Reset
              </MDBBtn>
            </form>

            <MDBCol size="5">
              <h5>Sort By:</h5>
              <select
                style={{ width: "100%", borderRadius: "2px", height: "35px" }}
                onChange={(e) => handleSort(e)}
                value={sortValue}
              >
                <option>Please Select Value</option>
                {sortOptions.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </MDBCol>
          </div>
        </>
      )}
      <div style={{ marginTop: "40px" }}>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Code</th>
                  
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">
                      No data found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, index) => (
                  <MDBTableBody key={index} className="row_hover">
                    <tr onClick={() => handlerDetails(item.id - 1)}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.code}</td>
                     
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "250px",
            alignContent: "center",
          }}
        >
          {renderPagination()}
        </div>
      </div>
    </MDBContainer>
  );
}

export default Table;
