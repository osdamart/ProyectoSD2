import React from "react";
import Link from "next/link";

const Donacion = (props) => {
  return (
    <div className="container">
      <main id="main" tabindex="-1">
        <div className="row">
          <div className="col-md-12">
            <h1 className="titulos-primarios">Donaciones</h1>
          </div>
        </div>
        <div className="row espaciado-filas">
          <div className="col-md-6 col-xs-12">
            <h2 className="titulos-secundarios">¿Por qué es importante donar?</h2>
            <p>
              Somos una organización sin fines de lucro, que no recibe apoyo del
              estado ni de otras organizaciones gubernamentales ni no
              gubernamentales. Al realizar una donación haces posible que
              podamos seguir con nuestra labor. El dinero donado es utilizado
              para las diversas actividades de la asosiación y también para el
              mantenimiento de la misma. <br /> Otra forma de apoyarnos es
              convirtiendote en miembro voluntario{" "}
              <Link href="/seMiembro">
                <a>
                  <strong>Quiero ser miembro!</strong>
                </a>
              </Link>
            </p>
            <p>
              <strong>Banco del Pacífico</strong>
            </p>
            <ul>
              <li>
                <strong>Número de cuenta: </strong> 1061408794
              </li>
              <li>
                <strong>Tipo de cuenta: </strong> Ahorros
              </li>
              <li>
                <strong>Nombre de la cuenta: </strong> ACACIG
              </li>
              <li>
                <strong>RUC: </strong> 0991505245001
              </li>

            </ul>
          </div>
          <div className="col-md-6 col-xs-12">
            <img
              className="imagenes-actividades"
              src={require("../../assets/img/foto-equipo.jpg")}
              alt="Miembros de la ACACIG."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donacion;
