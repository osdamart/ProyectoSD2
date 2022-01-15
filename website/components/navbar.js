import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { menus } from "../utils/constants";

const Navbar = (props) => {
  const router = useRouter();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark-blue">
      <div className="container-fluid">
        <Link href={'/'}>
        <a className="navbar-brand" >
          <img
            alt="logo de la asociación de ciegos del Guayas."
            className="logo-navbar"
            tabindex="-1"
            src={require("../assets/img/logo_blanco.png")}
          />
        </a></Link>
        <div id="skip-to-content">
          <a href="#main">Saltar al contenido</a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" role="navigation">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href={menus.inicio}>
                <a
                  className={`nav-link ${
                    router.pathname === menus.inicio ? "active" : ""
                  }`}
                >
                  Inicio
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={menus.nosotros}>
                <a
                  className={`nav-link ${
                    router.pathname === menus.nosotros ? "active" : ""
                  }`}
                >
                  Nosotros
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={menus.actividades}>
                <a
                  className={`nav-link ${
                    router.pathname === menus.actividades ? "active" : ""
                  }`}
                >
                  Actividades
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={menus.donaciones}>
                <a
                  className={`nav-link ${
                    router.pathname === menus.donaciones ? "active" : ""
                  }`}
                >
                  Donaciones
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={menus.seMiembro}>
                <a
                  className={`nav-link ${
                    router.pathname === menus.seMiembro ? "active" : ""
                  }`}
                >
                  Sé miembro
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={menus.noticias}>
                <a
                  className={`nav-link ${
                    router.pathname === menus.noticias ? "active" : ""
                  }`}
                >
                  Noticias
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={menus.contacto}>
                <a
                  className={`nav-link ${
                    router.pathname === menus.contacto ? "active" : ""
                  }`}
                >
                  Contacto
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
