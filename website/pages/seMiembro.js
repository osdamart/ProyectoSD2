import React from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Footer from "../components/footer";
import Miembro from "../components/seMiembro/seMiembro";
import MiembroForm from "../components/seMiembro/form";

const SeMiembro = (props) => {
  return (
    <Layout pageTitle="Sé Miembro">
      <header>
        <Navbar />
        <Banner classNames="banner-miembros" />
      </header>
      <div className="container">
        <div className="row">
          <main id="main" tabindex="-1">
            <Miembro />
            <MiembroForm />
          </main>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default SeMiembro;
