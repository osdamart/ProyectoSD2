import React from "react";

const Miembro = (props) => {

  const miembroFile = "/PlantillaCartaAfiliacionSocio.docx"
  const socioFile = "/PlantillaCartaAfiliacionVoluntario.docx"

  return (
    <>
    <div className="col-md-12">
      <h1 className="titulos-primarios">Sé miembro</h1>
      <p>
        Forma parte de la Asociación como miembro con discapacidades visuales y
        participa en nuestros cursos, actividades y programas. O afíliate como
        socio voluntario para colaborar en la gestión de eventos, atención a
        miembros o para ayudar fisica o económicamente a quienes lo necesiten.
      </p>
      <p>A continuación puede elegir descargar un formulario de inscripción:  </p>      
    </div>
    <div className="col-md-12 text-center">
      <a href={miembroFile} download>Descargar modelo de Formulario de Inscripción Miembro con discapacidad visual</a>
      <br/>
      <a href={socioFile} download>Descargar modelo de Formulario de Inscripción Socio Voluntario</a>
    </div>
    </>
  );
};

export default Miembro;
