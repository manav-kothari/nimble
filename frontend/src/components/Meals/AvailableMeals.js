import React, { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { IconContext } from "react-icons/lib";
import { getProducts, getCategories } from "../../apicalls/restaurantapicalls";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useParams } from "react-router-dom";
import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";

const AvailableMeals = ({ match }) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState();
  const [categories, setCategories] = useState([]);

  const { userId } = useParams();
  const { categoryId } = useParams();

  const preloadCategories = (userId) => {
    getCategories({ userId }).then((data) => {
      if (data.error) {
        setCategories(data.error);
      } else {
        setCategories(data.categories);
      }
    });
  };
  const loadAllProduct = (userId, categoryId) => {
    getProducts(userId, categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log("fucked");
      } else {
        setMeals(data.products);
        setIsLoading(false);
        console.log(data.products);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    loadAllProduct(userId, categoryId);
    preloadCategories(userId);
  }, [userId]);

  console.log(meals);

  if (isLoading) {
    return (
      <>
        <section className="text-center p-4 bg-white shadow-md rounded-2xl max-w-[60rem] w-[90%] my-8 mx-auto">
          <IconContext.Provider value={{ className: "spinner" }}>
            <ImSpinner9 />
          </IconContext.Provider>
        </section>
      </>
    );
  }

  if (Error) {
    return (
      <section className="p-4 bg-white shadow-md rounded-2xl max-w-[60rem] w-[90%] my-8 mx-auto text-center">
        <p className="text-2xl text-red-600">{Error}</p>
      </section>
    );
  }

  return (
    <>
      <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear">
        <div className="container-fluid px-3">
          <Row>
            <Col className="mb-3">
              <Dropdown className="text-center ">
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  style={{ backgroundColor: "#0f172a" }}
                >
                  <span className="text-capitalize">Filter by Category</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href={`/menu/${userId}/`}
                    className="h4 font-weight-bold"
                  >
                    All Items
                  </Dropdown.Item>

                  {categories &&
                    categories.map((cate, index) => (
                      <Dropdown.Item
                        href={`/menu/${userId}/category/${cate._id}`}
                        className="h4 font-weight-bold"
                        key={index}
                        value={cate._id}
                      >
                        {cate.name}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </div>
        {categories &&
          categories.map((cate, index) => (
            <div className="h4 font-weight-bold" key={index} value={cate._id}>
              {cate.name}
              <Card>
                <ul className="list-none m-0 p-0">
                  {meals.map((meal) => (
                    <MealItem
                      id={meal._id}
                      key={meal._id}
                      name={meal.name}
                      description={meal.description}
                      price={meal.price}
                      mealCateId={meal.category._id}
                      cateId={cate._id}
                    />
                  ))}
                </ul>
              </Card>
            </div>
          ))}
      </section>
    </>
  );
};

export default AvailableMeals;
