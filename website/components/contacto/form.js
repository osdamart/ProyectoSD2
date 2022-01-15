import React,{useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { crearContacto } from "../../api/contactos";
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const ContactForm = (props) => {

  const MySwal = withReactContent(Swal);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      correo: "",
      telefono: "",
      asunto: "",
      mensaje: ""
    },

    validationSchema: yup.object({
      nombre: yup
        .string()
        .max(100, "El nombre completo no debe exceder los 100 caracteres")
        .required("Porfavor ingrese su nombre completo"),
      correo: yup
        .string()
        .email("Ingrese una dirección de correo electrónica válida")
        .required("Porfavor ingrese su correo electrónico"),
      asunto: yup
        .string()
        .max(100, "El asunto no debe exceder los 100 caracteres")
        .required("Porfavor ingrese el asunto"),
      mensaje: yup
        .string()
        .max(300, "El mensaje no debe exceder los 100 caracteres")
        .required("Porfavor ingrese el mensaje")
    }),

    onSubmit: async (data) => {
      
     
      try{
        
        const contact = await crearContacto(data);
        console.log(contact)
        MySwal.fire({
          text: "Se ha enviado el formulario con éxito",
          icon: "success",
          showConfirmButton: false,
          timer: 4000
        }).then(res=>{
          if(res){
            window. location. reload()
          }
        })
      }catch (error) {
        if(error instanceof CreationError){
          MySwal.fire({
            text: "Algo ha ocurrido mal",
            icon: "error",
            showConfirmButton: false,
            timer: 4000
          })
          console.log(error)
        }else{throw error}
      }

    }
  });

  return (
    <form method="POST" action="" onSubmit={formik.handleSubmit}>
      <div className="row margin-bottom-small mt-4 center-xs">
        <div className="col-sm-6 padding-small">
          <div className="form-group custom-form-group">
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
            <div className="form-group custom-form-group">
              <label for="email">
                Correo <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="correo"
                className="margin-bottom-small"
                maxlength="100"
                placeholder="Correo Electrónico"
                required=""
                id="correo"
                aria-label="Ingrese su correo electrónico (campo obligatorio)"
                {...formik.getFieldProps("correo")}
              />
              {formik.touched.correo && formik.errors.correo ? (
                <span style={{ color: "red" }}>{formik.errors.email}</span>
              ) : null}
            </div>
            <div className="form-group custom-form-group">
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
          <div className="form-group custom-form-group">
            <label for="asunto">
              Asunto <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="asunto"
              className="margin-bottom-small"
              maxlength="100"
              placeholder="Asunto"
              required=""
              id="id_asunto"
              aria-label="Ingrese el asunto de su mensaje (campo obligatorio)"
              {...formik.getFieldProps("asunto")}
            />
            {formik.touched.asunto && formik.errors.asunto ? (
              <span style={{ color: "red" }}>{formik.errors.asunto}</span>
            ) : null}
          </div>
          <div className="form-group custom-form-group">
            <label for="mensaje">
              Mensaje <span className="text-danger">*</span>
            </label>
            <textarea
              type="text"
              name="mensaje"
              className="margin-bottom-small"
              maxlength="300"
              rows="5"
              placeholder="Escriba su mensaje... (campo obligatorio)"
              required=""
              id="id_mensaje"
              {...formik.getFieldProps("mensaje")}
            ></textarea>
            {formik.touched.mensaje && formik.errors.mensaje ? (
              <span style={{ color: "red" }}>{formik.errors.mensaje}</span>
            ) : null}
          </div>

          <input
            type="submit"
            value="Enviar"
            className="bg-dark-blue"
            aria-label="Enviar formulario"
            onClick={()=>{
              
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
