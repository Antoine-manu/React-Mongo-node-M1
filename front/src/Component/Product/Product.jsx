import { useContext } from "react";
import { authContext } from "../../Context/auth";
import { cartContext } from "../../Context/cart";

export default function Product({product}){

    const {auth} = useContext(authContext);
    const {cart, setCart} = useContext(cartContext);
    const cartCurrent = cart.objects;

    function addToCart(){
        let foundProduct = cartCurrent.find(p => p._id === product._id);
        if(foundProduct){
          foundProduct.quantity+=1;
        }else{
            cartCurrent.push({...product,quantity:1});
        }
        setCart({objects : cartCurrent})
    }

    function removeToCart(){
        let cartCurrentUpdated = cartCurrent
        let foundProduct = cartCurrentUpdated.find(p => p._id === product._id);
        if(foundProduct && foundProduct.quantity>1){
          foundProduct.quantity-=1;
        }else{
            cartCurrentUpdated = cartCurrentUpdated.filter(p => p._id !== product._id)
        }
        setCart({objects : cartCurrentUpdated})
    }

    return(
        <div class="card me-3" key={product._id} style={{width: "18rem"}}>
            <img src={product.picture} class="card-img-top" alt=""/>
            <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <p class="card-text">{product.price}</p>
                {cartCurrent.find(p => p._id === product._id) !== undefined ? 
                    <div>
                        <ul class="pagination">
                            <li class="page-item"><a onClick={() => removeToCart()} class="page-link" href="#">-</a></li>
                            <li class="page-item w-100"><span class="page-link" href="#">{cartCurrent.find(p => p._id === product._id).quantity}</span></li>
                            <li class="page-item"><a onClick={() => addToCart()} class="page-link" href="#">+</a></li>
                        </ul>
                    </div>
                : 
                <   a href="#" class="btn btn-outline-primary" onClick={() => addToCart()}>Ajouter au panier</a>
                }
            </div>
        </div>
    );
}