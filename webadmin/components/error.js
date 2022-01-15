import Link from "next/link";
import { useRouter } from "next/router";

export default function Error(){

    const router = useRouter();

    return(
        <div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <div className="text-center card" style={{paddingTop:"100",backgroundColor:"#F8F8F0"}}>
            <h1 className="align-items-center" style={{fontSize:50}}>ERROR 403 - PROHIBIDO</h1>
            <h5 >
            <p className="align-items-center">Usted no tiene permiso para acceder a esta pagina</p>
            <p className="align-items-center">Debería intentar <Link href="/"><a>iniciar sesión</a></Link> para poder acceder al contenido                  
            </p></h5>
            </div>     
            </div>   
    )
}