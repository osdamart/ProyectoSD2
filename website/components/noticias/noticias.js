import React from "react";
import _ from "lodash";
import moment from "moment";

const Noticia = ({ noticias }) => {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="row center-xs">
          <div className="col-md">
            <h2 className="section-title">Noticias</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <main id="main" tabindex="-1">
          <div className="row mb-5">
            <div className="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <img
                src={require("../../assets/img/reunion.jpg")}
                alt="reunion con miembros sobre desarrollo personal"
              />
            </div>
            <div className="col-sm">
              <h3>Reunion de directiva</h3>
              <span>12/04/2021</span>
              <p>
                Duis autem vel eum iriure dolor in hendrerit in vulputate velit
                esse molestie consequat, vel illum dolore eu feugiat nulla
                facilisis at vero eros et accumsan et iusto odio dignissim qui
                blandit praesent luptatum zzril delenit augue duis dolore te
                feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat.
              </p>

              <a href="#">Leer más</a>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <img
                src={require("../../assets/img/brailer.jpeg")}
                alt="taller braille"
              />
            </div>
            <div className="col-sm">
              <h3>Nuevos miembros recibieron taller de braille</h3>
              <span>12/04/2021</span>
              <p>
                Duis autem vel eum iriure dolor in hendrerit in vulputate velit
                esse molestie consequat, vel illum dolore eu feugiat nulla
                facilisis at vero eros et accumsan et iusto odio dignissim qui
                blandit praesent luptatum zzril delenit augue duis dolore te
                feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat.
              </p>
              <a href="noticias_internas.html">Leer más</a>
            </div>
          </div>
          {_.map(noticias, (noticia, index) => {
            const { titulo, descripcion, imagen, fecha } = noticia;
            return (
              <div className="row mb-5" key={index}>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <img src={imagen} alt={_.toLower(titulo)} />
                </div>
                <div className="col-sm">
                  <h3>{titulo}</h3>
                  <span>{moment(fecha).calendar()}</span>
                  <p>{descripcion}</p>
                  <a href="noticias_internas.html">Leer más</a>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </section>
  );
};

export default Noticia;
