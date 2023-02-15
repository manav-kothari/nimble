import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Pagination, Dropdown, Row, Col } from "react-bootstrap";
import {
  getAllOrders,
  isAuthenticated,
  updateOrder,
} from "../apicalls/restaurantapicalls";
import { LinkContainer } from "react-router-bootstrap";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import Menu from "../components/Menu";

const ManageOrders = ({ match }) => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState("");
  const MINUTE_MS = 30000;

  // const pageNumber = match.params.pageNumber || 1;
  const pageNumber = 1;
  const { user, token } = isAuthenticated();
  const userId = user._id;
  const { urlstatus } = useParams();
  const { tableno } = useParams();

  const tables = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
  ];

  const statuss = ["Recieved", "Preparing", "Delivered", "Paid"];

  const preload = (pageNumber, tableno, urlstatus) => {
    console.log("Status " + urlstatus);
    getAllOrders(userId, token, pageNumber, tableno, urlstatus).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrders(data.order);
        console.log(data);

        setPage(data.page);
        setPages(data.pages);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    preload(pageNumber, tableno, urlstatus);
    const interval = setInterval(() => {
      refreshPage();
    }, MINUTE_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [pageNumber, tableno, urlstatus]);

  const onSubmit = (event, orderId, status, userId) => {};

  const loadingMessage = () => {
    return (
      <div className="page3 page">
        <div className="alert alert-info text-center blink_me p-4 my-4">
          <h2 className="mt-4">Loading...</h2>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="alert alert-danger align-center text-center">
          Operation Failed!
        </h4>
      );
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Menu />
      {loading ? (
        loadingMessage()
      ) : error ? (
        errorMessage()
      ) : (
        <div className="pagem page3">
          <div className="p-3">
            <Row>
              <Col className="mb-3">
                <Link
                  to="/admin/dashboard"
                  className="btn btn-md btn-dark mb-3"
                >
                  Go Back
                </Link>
              </Col>
              <Col className="mb-3">
                <Dropdown className="float-right">
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Filter by Table
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href={`/admin/orders`}
                      className=" font-weight-bold"
                    >
                      All Orders
                    </Dropdown.Item>
                    {tables.map((table, index) => (
                      <Dropdown.Item
                        href={`/admin/orders/filter/table/${table}`}
                        className=" font-weight-bold"
                        key={index}
                        value={table}
                      >
                        {table}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Col className="mb-3">
                <Dropdown className="float-right">
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Filter by Status
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {statuss.map((status, index) => (
                      <Dropdown.Item
                        href={`/admin/orders/filter/status/${status}`}
                        className=" font-weight-bold"
                        key={index}
                        value={status}
                      >
                        {status}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            {/* <button onClick={refreshPage}>Refresh</button> */}
            <div className="container">
              <h3 className="text-dark text-center p-2 headingalt">
                All Orders :{" "}
                {tableno && (
                  <h3 className="text-dark text-center p-2 text-capitalize">
                    from Table No. {tableno}
                  </h3>
                )}
              </h3>
            </div>
            <Table
              striped
              bordered
              responsive
              hover
              variant="light"
              className="table-sm text-dark table"
            >
              <thead className="">
                <tr className="text-center">
                  <th>Timestamp</th>
                  <th>Table Number</th>
                  <th>Product(s)</th>
                  <th>Total Order Amount</th>
                  <th>Instruction</th>
                  <th>Cuomer's Name</th>
                  <th>Status</th>
                  <th>Cuomer's Mobile Number</th>
                  <th>Order ID</th>
                </tr>
              </thead>

              <tbody className="text-center text-dark">
                {orders.map((order) => (
                  <tr key={order._id}>
                    {/* <td>{order.user.name}</td>  */}
                    {/* <td>₹{order.amount / 100}</td> */}

                    {/* <td>{order.instruction}</td>
                    <td>{order.branch}</td>
                    <td>{order.number}</td> */}
                    <td>{order.timestamp}</td>
                    <td>{order.tableNumber}</td>
                    <td>
                      {order.orderedItems.map((product, id) => {
                        return (
                          <>
                            <span>
                              {product.name}{" "}
                              <b className="font-weight-bold">X</b>{" "}
                              {product.amount}
                              <hr />
                            </span>
                          </>
                        );
                      })}
                    </td>
                    {/* <td>{order.orderedItems.name}</td> */}
                    <td>₹ {order.amount}</td>
                    <td>{order.instruction}</td>
                    <td>{order.name}</td>
                    <td className="font-weight-bold">
                      {order.status}
                      <div className="form-group my-2">
                        <select
                          onChange={handleChange}
                          // value={status}
                          className="form-control"
                          placeholder="Status"
                        >
                          <option>Select Status</option>
                          <option>Recieved</option>
                          <option>Preparing</option>
                          <option>Delivered</option>
                          <option>Paid</option>
                        </select>
                      </div>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          setError("");
                          setLoading(true);
                          updateOrder(
                            userId,
                            token,
                            { status: status },
                            order._id
                          ).then((data) => {
                            if (data.error) {
                              setError(data.error);
                            } else {
                              refreshPage();
                              setError("");
                            }
                          });
                        }}
                        className="btn btn-md btn-outline-success btn-block"
                      >
                        Update
                      </button>
                    </td>

                    <td>{order.mobileNumber}</td>
                    <td>{order._id}</td>
                    {/* <td>{order.user._id}</td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {pages > 1 && (
            <div className="center ">
              {/* <Pagination className="my-4 font-weight-bold " pagination>
                <div className="">
                  <LinkContainer to={`/admin/allorders/page/${page - 1}`}>
                    <Pagination.Item
                      disabled={page === 1}
                      className=" text-capitalize font-weight-bold "
                    >
                      <HiArrowCircleLeft size="50px" className="text-dark" />
                    </Pagination.Item>
                  </LinkContainer>
                </div>
                <h3 className="mt-3 mx-3">
                  <strong>
                    {page}/{pages}
                  </strong>
                </h3>
                <div className="">
                  <LinkContainer to={`/admin/allorders/page/${page + 1}`}>
                    <Pagination.Item
                      disabled={page === pages}
                      className=" text-capitalize font-weight-bold "
                    >
                      <HiArrowCircleRight size="50px" className="text-dark" />
                    </Pagination.Item>
                  </LinkContainer>
                </div>
              </Pagination> */}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ManageOrders;
