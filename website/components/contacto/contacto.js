import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

const Contact = (props) => {
  return (
    <div className="col-md-12">
      <h1 className="titulos-primarios">Contacto</h1>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </div>
        <div className="col-md-3"></div>
        <div className="col-md">
          <FontAwesomeIcon icon={faPhoneAlt} />
        </div>
        <div className="col-md-3"></div>
        <div className="col-md">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="row margin-bottom-small center-xs">
        <div className="col-md">
          <br />
          <strong>Nuestra Ubicación</strong>
          <br />
          Lizardo García 831 y Alcedo esquina.
        </div>
        <div className="col-md">
          <br />
          <strong>Teléfono</strong>
          <br />
          0999674622
        </div>
        <div className="col-md">
          <br />
          <strong>Escríbenos</strong>
          <br />
          <a href="mailto:acacig.77@gmail.com">acacig.77@gmail.com</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
