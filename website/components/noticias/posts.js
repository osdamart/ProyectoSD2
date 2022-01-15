import React from 'react';
import _ from "lodash";
import moment from "moment";
import Link from "next/link";

const Posts = ({posts, loading}) => {

    const MAX_LENGTH = 200;

    if (loading){
        return <h2>Loading...</h2>
    }

    return (
        <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="row center-xs">
          <div className="col-md">
            <h2 className="section-title">Noticias</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <main id="main">

        {posts.map(post=>(
            <div className="row mb-5" key={post.id}>
            <div className="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <img src={post.imagen} alt={_.toLower(post.titulo)} />
            </div>
            <div className="col-sm">
              <h3>{post.titulo}</h3>
              <span>Fecha: {moment(post.fecha).format('DD/MM/yyyy')}</span>
              {post.descripcion.length > MAX_LENGTH ? 
                (<>
                  <p>{`${post.descripcion.substring(0,MAX_LENGTH)}...`}</p>
                  <Link href={'/noticias/'+post._id}>
                  <a aria-label={"Leer más sobre "+post.titulo}>Leer más</a>
                </Link></>
                ) : <p>{post.descripcion}</p>
              }              
              <p>Fuente: {post.fuente}</p>
            </div>
          </div>
        ))}

        </main>
      </div>
    </section>


    )

}

export default Posts;