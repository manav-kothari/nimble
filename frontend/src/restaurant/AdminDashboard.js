import React from "react";
import { signout, isAuthenticated } from "../apicalls/restaurantapicalls";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Menu from "../components/Menu";

const AdminDashboard = () => {
  // const {
  //   user: { name, email, role },
  // } = isAuthenticated();

  const userId = isAuthenticated().user._id;
  let navigate = useNavigate();

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
                to="/admin/create/carousel"
                className="nav-link text-light text-center bg-primary text-capitalize h5"
              >
                Add Carusel Images
              </Link>
            </Button>
            <Button className="list-group-item">
              <Link
                to="/admin/carousel"
                className="nav-link text-light text-center bg-primary text-capitalize h5"
              >
                Manage Carousel Images
              </Link>
            </Button>
            <Button className="list-group-item">
              <Link
                to={`/menu/${userId}`}
                className="nav-link text-light text-center bg-primary text-capitalize h5"
              >
                My Menu
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
                      navigate("/signin");
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
      <div className="pagem page3">
        {/* <div className="p-2">
          <Link to="/" className="btn btn btn-outline-primary">
            Go to Home Page
          </Link>
        </div> */}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <>
            <h4 className="text-center text-bold mt-4 text-capitalize">
              Please contact owner to get started
            </h4>
            <div className=" mt-4 center">
              <span className="text-center my-2">
                (If roles asigned please logout and signin again)
              </span>
              <Button className="list-group-item mx-auto my-4">
                <Link
                  onClick={() => {
                    if (window.confirm("You will be signed out!")) {
                      signout(() => {
                        navigate("/signin");
                      });
                    }
                  }}
                  className="nav-link text-dark text-center bg-warning text-capitalize h5"
                >
                  Sign Out
                </Link>
              </Button>
            </div>
          </>
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
