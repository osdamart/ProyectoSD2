import React from "react";
import Link from "next/link";
import { baseImg } from "../utils/constants";

const Footer = (props) => {
  return (
    <footer>
      <div className="row" role="footer">
      <div className="col-md-4 text-center">
        <img
          src={require("../assets/img/facebook.png")}
          alt="icono de facebook"
          className="iconos-md text-left"
        />{" "}
        <Link href="https://www.facebook.com/acacigasociacion">
        <a title="Página Facebook"  className="links" target="_blank" rel="noopener noreferrer">
        Síguenos en nuestra página oficial
        </a></Link>
      </div>
      <div className="col-md-3">
        <h3 className="subtitulos">ACACIG</h3>
        <ul className="links">
          <li>
            <Link href="/">
            <a title="inicio">
              Inicio
            </a></Link>
          </li>
          <li>
            <Link href="/nosotros">
            <a title="Nosotros" >
              Nosotros
            </a></Link>        
          </li>
          <li>
            <Link href="/actividades">
            <a title="Actividades">
              Actividades
            </a></Link>
          </li>
          <li>
            <Link href="/donaciones">
            <a title="donaciones">
              Donaciones
            </a></Link>
          </li>
          <li>
            <Link href="/contacto">
            <a title="se miembro">
              Contacto
            </a></Link>
          </li>
        </ul>
      </div>
      <div className="col-md-3">
        <ul>
          <li className="info">
            <img
              src={require("../assets/img/ubicacion.png")}
              alt="icono de ubicación"
              className="iconos"
            />{" "}
            Lizardo García 831 y Alcedo esquina
          </li>
          <li className="info">
            <img
              src={require("../assets/img/telefono.png")}
              alt="icono de teléfono"
              className="iconos"
            />{" "}
            0999674622
          </li>
          <li className="info">
            <img
              src={require("../assets/img/correo-electronico.png")}
              alt="icono de correo"
              className="iconos"
            />{" "}
            acacig.77@gmail.com
          </li>
        </ul>
      </div>
      <div className="col-md-2">
        <img
          src={require("../assets/img/LOGO-removebg-preview.png")}
          alt="icono de ACACIG"
          style={{ width: "100px" }}
        />
      </div>
      </div>
    </footer>
  );
};

export default Footer;
