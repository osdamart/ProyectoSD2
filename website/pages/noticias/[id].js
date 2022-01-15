import { getNoticias } from "../../api/noticias";
import { getNoticiaById } from "../../api/noticias";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import Banner from "../../components/banner";
import Footer from "../../components/footer";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
    const data = await getNoticias();

    const paths = data.map(noticia => {
        return {
            params: {id: noticia._id.toString() }
        }
    })

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const data = await getNoticiaById(id);

    if (!data) {
        return{
            notFound: true,
        }
    }

    return {
        props: { noticia: data},
        revalidate:1
    }
}

const Details = ({noticia}) => {
    const router = useRouter();
    if(router.isFallback){
        return <div>CARGANDO...</div>
    }
    return(
        <Layout pageTitle="Noticia detalle">
        <header>
        <Navbar />
        <Banner classNames="banner-noticias" />
        </header> 

        <section className="portfolio" id="portfolio">
        <div className="container">
        <main id="main" tabindex="-1"> 

          <div className="row">
              <div className="col-md-12">
                  <h1 className="titulos-primarios">{noticia.titulo}</h1>
  
              </div>
          </div>
          <div className="row">
              <div className="col-md-8">  
              <p>{noticia.descripcion}</p>
              <p>Fuente: {noticia.fuente}</p>
              </div>
              <div className="col-md-4">
                  <img className="img-nosotros" src={noticia.imagen} alt={noticia.titulo}/>
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
