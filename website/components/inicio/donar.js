import React from "react";
import Link from "next/link"
import { baseImg } from "../../utils/constants";

const Donar = (props) => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-5">
            <div className="card " style={{ width: "100%" }}>
              <img
                src={require("../../assets/img/donaciones.png")}
                className="card-img-top"
                alt="Sé parte de nosotros"
              />
              <div className="card-body">
                <h2 className="card-title">Deseas apoyar nuestra labor?</h2>
                <p className="card-text">
                  Realiza una donación para que podamos seguir realizando y
                  ayudando a personas no videntes..
                </p>
                <Link href={'/donaciones'} >
                  <a className="btn btn-primary">Deseo donar
                </a></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donar;
