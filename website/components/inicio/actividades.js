import React from "react";
import { baseImg } from "../../utils/constants";
import _ from "lodash";

const Actividades = ({actividades}) => {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="row">
          <div className="col-md-12 center-xs">
            <h2 className="titulos-index">Actividades</h2>
          </div>
        </div>
        <div className="row team center-xs">
        {_.map(actividades,(actividad,index)=>{
          const { titulo, descripcion, imagen} = actividad;
          return(
            <div className="col-md" key={index}>
            <div className="row">
            <div className="hover-outer-box">
              <img className="homeimgs"
                src={imagen}
                alt={_.toLower(titulo)}
              />
              <div className="hover-inner-box">
                <div className="hover-content"></div>
              </div>
            </div></div>
            <div className="row hometitle">
            <h1 className="team-name ">
              {titulo}
              <br />
              
            </h1></div>
            <div className="row">
            <p>
              {descripcion}
            </p></div>
          </div>
          );
        })}


      </div>
      </div>
    </section>
  );
};

export default Actividades;
