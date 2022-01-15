import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { crearMiembro } from "../../api/miembros"
import { pathMiembros } from "../../utils/constants";
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const MiembroForm = (props) => {

  const MySwal = withReactContent(Swal);
  const [fileInscripcion, setFileInscripcion] = useState(null);
  const [fileCedula, setFileCedula] = useState(null);

  const [extInscripcion, setExtInscripcion] = useState(null);
  const [extCedula, setExtCedula] = useState(null);

  const suppImages = [
    "image/jpg",
    "image/jpeg",
    "image/png"
  ];

  const suppDoc = [
    "application/pdf",
    "application/msword"
  ]

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      //setFileInscripcion(i);


      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        setFileInscripcion(event.target.result);
      }
      setExtInscripcion(i.name.split(".")[1]);

    }
  };

  const uploadCedulaToClient = (event) => {


    if (event.target.files && event.target.files[0]) {
      const j = event.target.files[0];
      //setFileCedula(j);


      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        setFileCedula(event.target.result);
      }
      setExtCedula(j.name.split(".")[1]);


     }
  };

  const formik = useFormik({
    initialValues: {
      tipo:"",
      nombre: "",
      direccion: "",
      email: "",
      telefono: "",
      edad: "",
      inscripcion: "",
      cedula: "",
      carnet: ""

    },

    validationSchema: yup.object({
      nombre: yup
        .string()
        .max(100, "El nombre completo no debe exceder los 100 caracteres")
        .required("Porfavor ingrese su nombre completo"),
      email: yup
        .string()
        .email("Ingrese una dirección de correo electrónica válida")
        .required("Porfavor ingrese su correo electrónico"),
      tipo: yup
        .string()
        .required("Seleccione un tipo con la barra espaciadora"),
      
    }),

    onSubmit: async (data) => {

  /*
      const body= new FormData();
      body.append("file", fileCedula);
      body.append("file2", fileInscripcion);
      const response = await fetch("/api/file", {
        method: "POST",
        body
      });*/   
      data["cedula"] =fileCedula;
      data["inscripcion"] =fileInscripcion;
      data["carnet"] ="";
      data["formExt"] = extInscripcion;
      data["cedulaExt"] =extCedula;

      console.log(data);
      
      const miembro = await crearMiembro(data);
        console.log(miembro)
        MySwal.fire({
          text: "Se ha enviado el formulario con éxito",
          icon: "success",
          showConfirmButton: false,
          timer: 4000
        }).then(res=>{
          if(res){
            window. location. reload()
          }
        }).catch(err=>{
          MySwal.fire({
            text: "Algo ha ocurrido mal",
            icon: "error",
            showConfirmButton: false,
            timer: 4000
          })
          console.log(err)
        })
        
      

    },

    /*onChange: () =>{
      {formik.getFieldProps("tipo")}
    }*/

    

    
  });

  return (
    <form method="POST" action="" onSubmit={formik.handleSubmit}>
      <div className="row margin-bottom-small mt-4 center-xs">
        <div className="col-sm-6 padding-small">
          <div className="form-group custom-form-group campo-voluntario campo-miembro mb-2">
            <label for="tipo_miembro">
              Tipo <span className="text-danger">*</span>
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="tipo"
                id="id_radio_socio"
                value="socio"
                aria-label="Miembro con discapacidad visual"
                onChange={formik.handleChange}
                checked={formik.values.tipo === 'socio'}

              />
              <label className="form-check-label" for="id_radio_socio">
                Miembro con discapacidad visual
              </label>
          
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="tipo"
                id="id_radio_voluntario"
                value="voluntario"
                aria-label="Socio Voluntario"
                onChange={formik.handleChange}
                checked={formik.values.tipo === 'voluntario'}
              />
              <label className="form-check-label" for="id_radio_voluntario">
                Socio Voluntario
              </label>
              {formik.touched.tipo && formik.errors.tipo ? (<><br/>
              <span style={{ color: "red" }}>{formik.errors.tipo}</span>
              </>) : null}
            </div>
            
          </div>
          <div className="form-group custom-form-group campo-voluntario campo-miembro">
            <label for="nombre">
              Nombres <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              className="margin-bottom-small"
              maxlength="100"
              placeholder="Nombres y Apellidos"
              required=""
              id="id_nombre"
              aria-label="Ingrese sus nombres y apellidos (campo obligatorio)"
              {...formik.getFieldProps("nombre")}
              
            />
            {formik.touched.nombre && formik.errors.nombre ? (
              <span style={{ color: "red" }}>{formik.errors.nombre}</span>
            ) : null}
          </div>
          <div className="form-group custom-form-group campo-voluntario campo-miembro">
            <label for="direccion">
              Dirección de domicilio<span className="text-danger"></span>
            </label>
            <input
              type="text"
              name="direccion"
              className="margin-bottom-small"
              maxlength="200"
              placeholder="Dirección..."
              id="id_direccion"
              aria-label="Ingrese su dirección de domicilio"
              {...formik.getFieldProps("direccion")}
            />
          </div>
          <div className="form-group custom-form-group campo-voluntario campo-miembro">
            <label for="email">
              Correo <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="margin-bottom-small"
              maxlength="100"
              placeholder="Correo"
              required=""
              id="id_email"
              aria-label="Ingrese su correo electrónico (campo obligatorio)"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <span style={{ color: "red" }}>{formik.errors.email}</span>
            ) : null}
          </div>
          <div className="row">
            <div className="form-group custom-form-group campo-voluntario campo-miembro col-sm-6">
              <label for="telefono">
                Teléfono <span className="text-danger"></span>
              </label>
              <input
                type="tel"
                name="telefono"
                className="margin-bottom-small"
                maxlength="20"
                placeholder="Teléfono"
                id="id_telefono"
                aria-label="Ingrese su número telefónico"
                {...formik.getFieldProps("telefono")}
              />
            </div>
            <div className="form-group custom-form-group campo-voluntario campo-miembro col-sm-6">
              <label for="edad">
                Edad <span className="text-danger"></span>
              </label>
              <input
                type="number"
                name="edad"
                className="margin-bottom-small"
                maxlength="100"
                placeholder="Edad"
                required=""
                id="id_edad"
                aria-label="Ingrese su edad en números"
                {...formik.getFieldProps("edad")}
              />
            </div>
          </div>
          <div className="form-group custom-form-group campo-voluntario campo-miembro">
            <label for="inscripcion">
              Formulario de inscripción<span className="text-danger">*</span>
            </label>
            <em
              className="fa fa-info-circle p-0"
              data-toggle="tooltip"
              data-placement="top"
              title="Cargue su formulario brindado por la Asociación escaneado como pdf"
            ></em>
            <div className="custom-file">
              <input
                type="file" 
                name="inscripcion"

                className="margin-bottom-small custom-file-input"
                id="id_inscripcion"
                aria-label="Cargue su formulario brindado por la Asociación (campo obligatorio)"    onChange={uploadToClient}             
            
                onChange={uploadToClient}
              />
              
            </div>
          </div>
          <div className="form-group custom-form-group campo-voluntario campo-miembro">
            <label for="cedula">
              Cédula de Ciudadanía y Carnet de Discapacidad (si aplica)<span className="text-danger">*</span>
            </label>
            <em
              className="fa fa-info-circle p-0"
              data-toggle="tooltip"
              data-placement="top"
              title="Cargue su cédula escaneada como imagen"
            ></em>
            <div className="custom-file">
              <input
                type="file"
                name="cedula"
                className="margin-bottom-small custom-file-input"
                id="id_cedula"
                aria-label="Cargue su cédula escaneada ,(campo obligatorio)  y su carnet de discapacidad, (en caso de aplicar como miembro con discapacidad)"
                onChange={uploadCedulaToClient}
              />
            </div>
          </div>
          

          <input
            type="submit"
            value="Enviar"
            className="bg-dark-blue"
            aria-label="Enviar Formulario "
            onClick={()=>{
            
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default MiembroForm;
