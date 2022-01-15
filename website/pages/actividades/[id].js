import { getActividades } from "../../api/actividades";
import { getActividadById } from "../../api/actividades";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import Banner from "../../components/banner";
import Footer from "../../components/footer";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
    const data = await getActividades();

    const paths = data.map(actividad => {
        return {
            params: {id: actividad._id.toString() }
        }
    })

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const data = await getActividadById(id);

    if (!data) {
        return{
            notFound: true,
        }
    }
    
    return {
        props: { actividad: data},
        revalidate:1
    }
}

const Details = ({actividad}) => {
    const router = useRouter();
    if(router.isFallback){
        return <div>CARGANDO...</div>
    }
    return(
        <Layout pageTitle="Actividad detalle">
        <header>
        <Navbar />
        <Banner classNames="banner-actividades" />
        </header> 

        <section className="portfolio" id="portfolio">
        <div className="container">
        <main id="main" tabindex="-1"> 

          <div className="row">
              <div className="col-md-12">
                  <h1 className="titulos-primarios">{actividad.titulo}</h1>
              </div>
          </div>
          <div className="row">
              <div className="col-md-8">
              <p>{actividad.descripcion}</p>
              </div>
              <div className="col-md-4">
                  <img className="img-nosotros" src={actividad.imagen} alt={actividad.titulo}/>
              </div>
          </div>
        
        </main>
        </div>
        </section>

        <Footer />
        </Layout>
    )
}

export default Details;
