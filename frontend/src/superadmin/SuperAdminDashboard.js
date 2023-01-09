import React from "react";
import { signout, isAuthenticated } from "../apicalls/restaurantapicalls";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Menu from "../components/Menu";

const SuperAdminDashboard = ({ history }) => {
  const adminfront = () => {
    return (
      <div className="card page">
        <h4 className="card-header text-white text-center bg-success">
          Super Admin
        </h4>
        {isAuthenticated() && isAuthenticated().user.role === 2 && (
          <ul className="list-group">
            <Button className="list-group-item">
              <Link
                to="/admin/restaurants"
                className="nav-link text-light text-center bg-primary text-capitalize h5"
              >
                Manage Restaurants
              </Link>
            </Button>
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
        )}
      </div>
    );
  };

  return (
    <>
      <Menu />
      <div className="page2 page3">
        {/* <div className="p-2">
          <Link to="/" className="btn btn btn-outline-primary">
            Go to Home Page
          </Link>
        </div> */}
        <div className="container p-2">
          <h4 className="text-dark text-center text-capitalize py-2">
            Manage all things here
          </h4>
          {adminfront()}
        </div>
      </div>
    </>
  );
};

export default SuperAdminDashboard;
