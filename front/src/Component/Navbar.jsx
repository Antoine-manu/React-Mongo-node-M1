import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {  NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navbar(){

    return(
        <>
            <div className="navCustom">
                <div className="navCustom-content">
                    <img src="./img/logo.png" alt="" className='navCustom-img' />
                    <div className=''>
                        <FontAwesomeIcon size='xl' icon={faCartShopping} className='me-3' color='#FFC265'/>
                        {/* <NavLink to='/signin' className='btn btn-light me-3'>S'inscrire</NavLink >
                        <NavLink to='/login' className='btn btn-warning'>Se connecter</NavLink > */}
                    </div>
                </div>
            </div>
        </>
    )
}