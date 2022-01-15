import React from "react";
import _ from "lodash";

const Actividad = ({ actividades }) => {
  return (
    <div className="container">
      <main id="main" tabindex="-1">
        <div className="row">
          <div className="col-md-12">
            <h1 className="titulos-primarios">Actividades</h1>
          </div>
        </div>
        <div className="row espaciado-filas">
          <div className="col-md-6 col-xs-12">
            <h2 className="titulos-secundarios">Talleres de desarollo personal</h2>
            <p>
              El 7 de noviembre de 2020 se realizó el Taller de Desarrollo
              Personal I - Empoderamiento y Liderazgo dirigido a todas las
              mujeres con discapacidad visual. Se agradece a la licenciada
              Marian Osorio coaching Profesional Vivencial que nos aportó con
              sus conocimientos.
              <br />
              <br />
              <strong>Dirigido:</strong> Señora Laura Chávez Pozo Laury Chavez
              Pozo
              <br />
              <strong>Secretaria:</strong> Lcda. Alicia Parrales
              <br />
              <strong>Coordinadora: </strong>Señora Pilar Cemis
              <br />
              <br />
              Invitamos a todas las mujeres con discapacidad a sumarse a nuestra
              institución.
            </p>
          </div>
          <div className="col-md-6 col-xs-12">
            <img
              className="imagenes-actividades"
              src={require("../../assets/img/desarrollo-emocional.jpg")}
              alt="Imagen de mujeres recibiendo una charla de desarrollo emocional."
            />
          </div>
        </div>
        <div className="row espaciado-filas">
          <div className="col-md-6 col-xs-12">
            <img
              className="imagenes-actividades"
              src={require("../../assets/img/asistencia-psicologica.jpg")}
              alt="Imagen de una mujer recibiendo asistencia psicológica."
            />
          </div>
          <div className="col-md-6 col-xs-12">
            <h2 className="titulos-secundarios">Asistencia Psicológica</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, rhoncus
              torquent phasellus integer mi aliquam cras, parturient nisl nibh
              tellus sed posuere. Habitasse erat sem blandit purus luctus
              faucibus per rutrum dignissim placerat egestas, habitant nostra
              aliquam ultricies interdum dictum vulputate lectus consequat
              sociis auctor, ornare taciti odio pretium nibh pellentesque mollis
              phasellus fringilla metus. Id bibendum placerat iaculis risus
              tellus urna habitant felis, viverra accumsan erat molestie congue
              malesuada fermentum, neque cubilia arcu enim senectus quisque
              eleifend.A dictum nullam curabitur mus et ad mollis ut, mauris
              massa rutrum euismod cubilia porttitor integer. Cras nisl
              curabitur orci dictum condimentum molestie bibendum.
            </p>
          </div>
        </div>
        <div className="row espaciado-filas">
          <div className="col-md-6 col-xs-12">
            <h2 className="titulos-secundarios">
              Talleres de braille para todas las edades
            </h2>
            <p>
              El braille es una herramienta de comunicación muy importante para
              las personas con problemas visuales y si se aprende a más temprana
              edad, puede ayudar a las personas a sobrellevar de buena forma su
              condición, logrando que estas puedan llevar vidas normales. El
              aprendizaje de este ayudará a comunicarse y a poder desenvolverse
              de mejor manera en distintos aspectos de la vida. Conocer braille
              ayudará a las personas a comunicarse, aprender, expresarse,
              movilizarse con mayor facilidad, conseguir empleo, utilizar
              dispositivos, etc. Los talleres serán impartidos por miembros de
              la asociación y todos los miembros podrán disfrutar de estos
              talleres de forma gratuita.
            </p>
          </div>
          <div className="col-md-6 col-xs-12">
            <img
              className="imagenes-actividades"
              src={require("../../assets/img/apredizaje-braille.jpg")}
              alt="Imagen de una maestra enseñandole a un niño en braille."
            />
          </div>
        </div>
        <div className="row espaciado-filas">
          <div className="col-md-6 col-xs-12">
            <img
              className="imagenes-actividades"
              src={require("../../assets/img/computacion.jpg")}
              alt="Imagen de una nuiña no vidente aprendiendo el uso de una computadora."
            />
          </div>
          <div className="col-md-6 col-xs-12">
            <h2 className="titulos-secundarios">
              Clases de computación para no videntes
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, rhoncus
              torquent phasellus integer mi aliquam cras, parturient nisl nibh
              tellus sed posuere. Habitasse erat sem blandit purus luctus
              faucibus per rutrum dignissim placerat egestas, habitant nostra
              aliquam ultricies interdum dictum vulputate lectus consequat
              sociis auctor, ornare taciti odio pretium nibh pellentesque mollis
              phasellus fringilla metus. Id bibendum placerat iaculis risus
              tellus urna habitant felis, viverra accumsan erat molestie congue
              malesuada fermentum, neque cubilia arcu enim senectus quisque
              eleifend.A dictum nullam curabitur mus et ad mollis ut, mauris
              massa rutrum euismod cubilia porttitor integer. Cras nisl
              curabitur orci dictum condimentum molestie bibendum.
            </p>
          </div>
        </div>
        {_.map(actividades, (actividad, index) => {
            const { titulo, descripcion, imagen} = actividad;
            return (
              <div className="row espaciado-filas" key={index}>
                <div className="col-md-6 col-xs-12">
                  <h2 className="titulos-secundarios">
                    {titulo}
                  </h2>
                  <p>
                    {descripcion}
                  </p>
                </div>
                <div className="col-md-6 col-xs-12">
                  <img
                    className="imagenes-actividades"
                    src={imagen}
                    alt={_.toLower(titulo)}
                  />
                </div>
              </div>
            );
          })}
      </main>
    </div>
  );
};

export default Actividad;
