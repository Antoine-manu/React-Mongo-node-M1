import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import Login from '../../Page/Login/Login';
import { authContext } from "../../Context/auth";
import Cart from '../Cart/Cart';
import { useContext } from 'react';

export default function Header() {
    const {auth} = useContext(authContext);
    return (
        <nav class="navbar navbar-expand-lg bg-light  mb-5">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/"><img className='logoCustom' src="/plant.png" alt="" /></NavLink>
                    </li>
                </ul>
                </div>
                <div>
                    {auth.token !== null ?
                    <Cart />
                     : 
                    <Login />
                     }
                </div>
            </div>
        </nav>
    );
}