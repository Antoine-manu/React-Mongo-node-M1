import { useState,useContext, useEffect } from "react";
import "./Login.css"
import { signin,signup } from "../../Service/auth";
import { authContext } from "../../Context/auth";

export default function Login({isOpen}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const {auth, setAuth} = useContext(authContext);
    const onLogin = () => {

        if(isLogin){
        signup(email, password)
            .then(data => {
                const {id, token} = data
                setAuth({id, token});
            })
        }else{
            signin(email, password)
            .then(data => console.log(data))
        }
    }

    useEffect(() => {
    if(isOpen === true){
        let openModalBtn = document.getElementById("openLogin");
        openModalBtn.click();
    }
    }, []);

    return (
        <>
        {isOpen === true ? "" : 
            <button type="button" class="btn btn-warning text-light" id="openLogin" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Connexion
            </button>
        }

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{isLogin ? "Connexion" : "Inscription"}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div className="form">
                        <div className=" w-100">
                            <label className="form-label" htmlFor="email">E-mail</label>
                            <input type="email" id="email" className="form-control" onKeyUp={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mt-4 w-100">
                            <label className="form-label" htmlFor="password">Mot de passe</label>
                            <input type="password" className="form-control" id="password" onKeyUp={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mt-4">
                            <button className="switch-login text-warning" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "je n'ai pas de compte" : "j'ai déjà un compte"}</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button className="btn btn-warning w-100" data-bs-dismiss="modal" aria-label="Close" onClick={() => onLogin()}>{isLogin ? "Connexion" : "Inscription"}</button>
                </div>
                </div>
            </div>
        </div>
        </>

    );
}