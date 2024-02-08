import { useState, useEffect } from "react"

export default function Login(){

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [unfound, setUnfound] = useState(false)

    function connect(){
        
    }

    return(
        <div className="authContent">
            <div className="authContent-login">
                <div className="authContent-login-left">
                    <img src="./img/logo.png" alt="" className="authContent-login-left-img mb-4" />
                    <div className="w-100">
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class={unfound === true ? "form-control is-invalid" : "form-control"} defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                            <div class="invalid-feedback">
                                Utilisateur non trouvé
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Mot de passe</label>
                            <input type="password" class={unfound === true ? "form-control is-invalid" : "form-control"}  defaultValue={password} onChange={(e) => setPassword(e.target.value)}/>
                            <div class="invalid-feedback">
                                Utilisateur non trouvé
                            </div>
                        </div>
                    </div>
                    <span className="mb-4">Pas encore de compte ? <a className="text-warning">Créez en un !</a></span>
                    <button className="btn btn-warning text-light">Se connecter</button>
                </div>  
                <div className="authContent-login-right">
                    <img src="/img/plantes.jpg" className="authContent-login-right-img" alt="" />
                </div>  
            </div>
        </div>
    )
}