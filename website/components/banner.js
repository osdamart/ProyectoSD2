import React from "react";
import { useRouter } from "next/router";
import { menus } from "../utils/constants";

const Banner = ({ classNames }) => {
  const router = useRouter();
  const path = router.pathname;
  return path === menus.inicio ? (
    <div className="hero flex middle-xs banner-index">
      <div className="hero-text banner-size">
        <h1>ACACIG</h1>
        <h1 className="text-center font-weight-light banner-text">
          Asociación de ciegos y amigos de los ciegos del Guayas.
        </h1>
      </div>
    </div>
  ) : (
    <section className={classNames}></section>
  );
};

export default Banner;
