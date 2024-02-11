import { useEffect, useState, useContext } from "react";
import { getAll } from "../Service/product";
import Product from "../Component/Product/Product";
import { authContext } from "../Context/auth";
import Login from "./Login/Login";

export default function ListProduct() {

    const [listProduct, setListProduct] = useState([]);
    const {auth} = useContext(authContext);
    useEffect(() => {
        getAll(auth.token)
        .then((data) => setListProduct(data))
    }, [setListProduct]);

    return (
        <div>
            {auth.token !== null ?
                <div className="ms-5 d-flex flex-row">
                    {listProduct.map(product => <Product product={product} id="5" />)} 
                </div>
            : '' 
                
            }
            {auth.token === null &&
                <>
                    <span>Vous devez être connecté pour voir les produits</span>
                    <Login isOpen={true} />
                </>
            }
        </div>
    );
}