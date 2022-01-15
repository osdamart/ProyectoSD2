import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import Header from "../components/login/header";
import Footer from "../components/login/footer";
import Image from "next/image";
import logo from "../public/logo.png";

export default function Loginform(req, res){

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    async function submitForm(){
        const res = await fetch('/api/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({username, password})
        }).then((t)=>t.json())

        const token = res.token
        if (token){
            const json = jwt.decode(token) as { [key: string]: string }
            if(json.admin){
                console.log(json)
                localStorage.setItem('name',json.username)
                window.location.href="/miembros"
            }else{alert("Usuario o contraseña incorrectos")}

        }else {alert(`NO SE GUARDO NINGUN TOKEN`)}
    }

    return (
            <>
            <Header></Header>
            <br/><br/>
            <div className="row container my-auto"  >
            <div id="login" className="card col-lg-4 offset-lg-5 col-md-6 offset-md-3 col-12">
                <h2 className="text-center">Bienvenido</h2>
                <Image src={logo}
                    alt="acacigLogo"
                    layout="fixed"
                    width={300}
                    height={300}/>
                <form>   
                    <div className="form-group">
                        <label htmlFor="user">Usuario</label>
                        <input type="text" 
                        className="form-control" 
                        placeholder="usuario" 
                        name="username" 
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" 
                        className="form-control" 
                        placeholder="contraseña" 
                        name="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}/>
                    <br/>                    <br/>
                    </div>
                    <div className="col-lg-4 offset-lg-5">
                        <input type="button"
                        className="btn btn-primary mb-2" 
                        value="Login" 
                        onClick={submitForm} />
                    </div>
                </form>
            </div>
            </div>
            <br/><br/>
            <Footer ></Footer>
            </>
    )
}
