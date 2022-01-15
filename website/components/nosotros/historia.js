import React from "react";
import { baseImg } from "../../utils/constants";

const Historia = (props) => {
  return (
    <div className="container" role="navigation" aria-label="Ejemplos">
      <main id="main" tabindex="-1">
        <div className="row">
          <div className="col-md-12">
            <h1 className="titulos-primarios">Nuestra historia</h1>
            <p>
              Los inicios de la asociación remontan en 1985, donde un 10 de
              febrero un grupo de jóvenes al ver que las personas no videntes
              estaban siendo diseminadas y no tenían un rumbo fijo o ocupación a
              que dedicarse deciden crear la primera y única agrupación del país
              “Unión Nacional de los ciegos del Ecuador “Once”, propuesta
              acogida por personas no videntes en las provincias del país,
              formando agrupaciones.{" "}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h2 className="titulos-secundarios">Cambio y Transformación</h2>
            <p>
              Con el pasar del tiempo, los grupos existentes en las provincias
              del país comenzaron a disolverse con la finalidad de
              independizarse. Bajo esta premisa, los fundadores el Dr. Clemente
              Jerovi, Dr. Byron Ordónez (fundador de la Escuela Municipal de los
              Ciegos 4 de enero), Dr. Jorge Bravo y el Dr. Vicente Vallejo
              Lovato tomaron acción y en 1986 deciden darle vida jurídica a tuvo
              a la Unión Nacional de Ciegos del Ecuador “ONCE”, filial de la
              provincia del Guayas
            </p>
            <h2 className="titulos-secundarios">Inclusión Educativa</h2>
            <p>
              Un grupo de jóvenes de nivel medio y superior en la ciudad de
              Guayaquil pensaron que era tiempo crear una nueva asociación para
              que los ciegos pueden agruparse bajo el nombre de Sociedad
              Estudiantil de Ciegos Unidos SECU, ellos la necesitaban para
              adquirir conocimientos y reunirse y absolver sus inquietudes pero
              el Dr. Juan Villacís Calle, docente en aquella época manifestó que
              debería ser más amplia la cobertura para todos los ciegos
              profesionales y aún más para aquellos que no habían tenido la
              oportunidad de educarse.{" "}
            </p>
          </div>
          <div className="col-md-4">
            <img
              className="img-nosotros"
              src={require("../../assets/img/foto-equipo.jpg")}
              alt="Ejemplo de imagen"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Historia;
