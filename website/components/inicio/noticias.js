import React from "react";
import { baseImg } from "../../utils/constants";
import moment from "moment";
import _ from "lodash";

const Noticias = ({noticias}) => {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="row center-xs">
          <div className="col-md">
            <h2 className="titulos-index">Noticias</h2>
          </div>
        </div>
      </div>
      <div className="container">

        {_.map(noticias,(noticia,index)=>{
          const {titulo, fecha, descripcion, imagen, fuente} =noticia;
          return(
            <div className="row mb-5" key={index}>
          <div className="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <img
              src={imagen}
              alt={_.toLower(titulo)}
            />
          </div>
          <div className="col-sm">
            <h3>{titulo}</h3>
            <span>{moment(fecha).calendar()}</span>  
            <p>
              {descripcion}
            </p>
            <p>Fuente: {fuente}</p>

          </div>
        </div>
          )
        })}
        

      </div>
    </section>
  );
};

export default Noticias;
