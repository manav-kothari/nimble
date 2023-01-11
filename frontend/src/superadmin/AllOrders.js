import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Pagination } from "react-bootstrap";
import { getAllOrders, isAuthenticated } from "../apicalls/restaurantapicalls";
import { LinkContainer } from "react-router-bootstrap";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import Menu from "../components/Menu";

const AllOrders = ({ match }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState("");
  const MINUTE_MS = 60000;

  // const pageNumber = match.params.pageNumber || 1;
  const pageNumber = 1;
  const { user, token } = isAuthenticated();

  const preload = (pageNumber) => {
    getAllOrders(user._id, token, pageNumber).then((data) => {
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
    preload(pageNumber);
    const interval = setInterval(() => {
      refreshPage();
    }, MINUTE_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [pageNumber]);

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

  return (
    <>
      <Menu />
      {loading ? (
        loadingMessage()
      ) : error ? (
        errorMessage()
      ) : (
        <div className="page page3">
          <div className="p-3">
            <Link
              to="/superadmin/dashboard"
              className="btn btn-md btn-dark mb-3"
            >
              Go Back
            </Link>
            {/* <button onClick={refreshPage}>Refresh</button> */}
            <div className="container">
              <h3 className="text-dark text-center p-2 headingalt">
                All Restaurants Orders :
              </h3>
            </div>
            <Table
              striped
              bordered
              responsive
              hover
              variant="light"
              className="table-sm text-dark"
            >
              <thead className="">
                <tr className="text-center">
                  <th>Timestamp</th>
                  <th>Table Number</th>
                  <th>Product(s)</th>
                  <th>Total Order Amount</th>
                  <th>Instruction</th>
                  <th>Cuomer's Name</th>
                  <th>Cuomer's Mobilr Number</th>
                  <th>Order ID</th>
                </tr>
              </thead>

              <tbody className="text-center text-dark">
                {orders.map((order) => (
                  <tr key={order._id}>
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

export default AllOrders;
