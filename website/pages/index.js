import React from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Footer from "../components/footer";
import Objetivos from "../components/inicio/objetivos";
import Actividades from "../components/inicio/actividades";

import Noticias from "../components/inicio/noticias";

import Donar from "../components/inicio/donar";
import { getLastActividades } from "../api/actividades";
import { getLastNoticias } from "../api/noticias";

export async function getStaticProps() {
  const actividades = await getLastActividades();
  const noticias = await getLastNoticias();
  return {
    revalidate: 10,
    props: { actividades, noticias }
  };
}



const Inicio = ({actividades, noticias}) => {
  return (
    <Layout pageTitle="Inicio">
      <header>
        <Navbar />
        <Banner />
      </header>
      <div className="wrapper">
        <main id="main" tabindex="-1">
          <Objetivos />
          <Actividades actividades={actividades}/>
          {/* <CallToAction /> */}
          <Noticias noticias={noticias} />
          {/* <NewsLetter /> */}
          <Donar />
        </main>
      </div>
      <Footer />
    </Layout>
  );
};

export default Inicio;
