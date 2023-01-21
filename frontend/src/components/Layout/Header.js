import React from "react";
import logo from "../../logo.jpeg";
import mealsImage from "../../assets/banner.jpg";
import HeaderCartButton from "./HeaderCartButton";
import CarouselElement from "../CarouselElement";
import { useParams } from "react-router-dom";

const Header = (props) => {
  const { userId } = useParams();
  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 md:h-20 leading-1 bg-white text-white flex justify-between items-center px-8 md:px-10% shadow-md z-10">
        {/* <h1 className="text-2xl md:text-[2rem]">Nimble</h1> */}
        <img className="logo" src={logo} alt="Logo" />
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <CarouselElement className="carouselc" userId={userId} />
      {/* <div className="w-full h-25 z-0 my-4 overflow-hidden">
        <img
          className="w-8/7 h-full object-cover transform-img"
          src={mealsImage}
          alt="A table full of delicious food"
        />
      </div> */}
    </>
  );
};

export default Header;
