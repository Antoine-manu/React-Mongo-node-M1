import { useEffect, useState } from "react";
import { getAll } from "../Service/product";
import Navbar from "../Component/Navbar";

export default function Home(){

    const [listproduct, setListProduct] = useState(0)

    useEffect(() => {
        getAll()
        .then((data) => setListProduct(data))
  },[setListProduct]);

    return(
        <>
            <Navbar/>
            <div style={{marginTop: 100}}>
                <h1>TEST</h1>
            </div>
        </>
    )
}