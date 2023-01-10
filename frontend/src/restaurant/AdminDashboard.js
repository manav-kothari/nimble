import React from "react";
import { signout, isAuthenticated } from "../apicalls/restaurantapicalls";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Menu from "../components/Menu";

const AdminDashboard = ({ history }) => {
  // const {
  //   user: { name, email, role },
  // } = isAuthenticated();

  const adminfront = () => {
    return (
      <>
        <div className="card mt-4">
          <h4 className="card-header text-white text-center bg-success">
            Navigation
          </h4>
          <ul className="list-group">
            <Button className="list-group-item">
              <Link
                to="/admin/orders"
                className="nav-link text-light text-center bg-primary text-capitalize h5"
              >
                All Orders
              </Link>
            </Button>
            <Button className="list-group-item">
              <Link
                to="/admin/create/category"
                className="nav-link text-light text-center bg-primary text-capitalize h5"
              >
                Add Category
              </Link>
            </Button>
            <Button className="list-group-item">
              <Link
                to="/admin/categories"
                className="nav-link text-light text-center bg-primary text-capitalize h5"
              >
                Manage Category
              </Link>
            </Button>
            <Button className="list-group-item">
              <Link
                to="/admin/create/product"
                className="nav-link text-light text-center bg-primary text-capitalize h5"
              >
                Add Menu Items
              </Link>
            </Button>
            <Button className="list-group-item">
              <Link
                to="/admin/products"
                className="nav-link text-light text-center bg-primary text-capitalize h5"
              >
                Manage Menu Items
              </Link>
            </Button>
            <Button className="list-group-item">
              <Link
                to="/profile"
                className="nav-link text-light text-center bg-primary text-capitalize h5"
              >
                Manage My Profile
              </Link>
            </Button>

            <Button className="list-group-item">
              <Link
                onClick={() => {
                  if (window.confirm("You will be signed out!")) {
                    signout(() => {
                      history.push("/");
                    });
                  }
                }}
                className="nav-link text-dark text-center bg-warning text-capitalize h5"
              >
                Sign Out
              </Link>
            </Button>
          </ul>
        </div>
      </>
    );
  };

  return (
    <>
      <Menu />
      <div className="page page3">
        {/* <div className="p-2">
          <Link to="/" className="btn btn btn-outline-primary">
            Go to Home Page
          </Link>
        </div> */}
        {isAuthenticated() && isAuthenticated().user.role !== 1 && (
          <h4 className="text-center text-bold mt-4 text-capitalize">
            Please contact owner to get started
          </h4>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <div className="container p-2">
            <h4 className="text-dark text-center text-capitalize py-2 my-2">
              Manage all things here
            </h4>
            {adminfront()}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
