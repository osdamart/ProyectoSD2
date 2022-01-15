import React from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Footer from "../components/footer";
import Historia from "../components/nosotros/historia";

const Nosotros = (props) => {
  return (
    <Layout pageTitle="Acerca de nosotros">
      <header>
        <Navbar />
        <Banner classNames="banner-nosotros" />
      </header>
      <Historia />
      <Footer />
    </Layout>
  );
};

export default Nosotros;
