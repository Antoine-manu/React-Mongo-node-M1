import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Page/Home';
import ListProduct from './Page/ListProduct';
import Login from './Page/Login/Login';
import Header from './Component/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartPlus, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { authContext } from './Context/auth';
import { cartContext } from './Context/cart';
import { useEffect, useState } from 'react';

function App() {
  const [auth, setAuth] = useState({id:null,token:null});
  const [cart, setCart] = useState({objects: []});

  library.add(faCartShopping, faCartPlus)

  return (
    <>
      <authContext.Provider value={{auth, setAuth}}>
        <cartContext.Provider value={{cart, setCart}}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<ListProduct />} />
          </Routes>
        </BrowserRouter>
        </cartContext.Provider>
      </authContext.Provider>
    </>
  )
}

export default App;
