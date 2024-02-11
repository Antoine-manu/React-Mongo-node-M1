import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cartContext } from "../../Context/cart";
import { authContext } from "../../Context/auth";
import { useContext, useEffect, useState } from 'react';
import { purchase } from '../../Service/list';

export default function Cart(){

    const {cart, setCart} = useContext(cartContext);
    const {auth} = useContext(authContext);
    const [itemInCart, setItemInCart] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const cartObject = cart.objects;

    function addToCart(product){
        let foundProduct = cartObject.find(p => p._id === product._id);
        if(foundProduct){
          foundProduct.quantity+=1;
        }else{
            cartObject.push({...product,quantity:1});
        }
        setCart({objects : cartObject})
    }

    function removeToCart(product){
        let cartObjectUpdated = cartObject
        let foundProduct = cartObjectUpdated.find(p => p._id === product._id);
        if(foundProduct && foundProduct.quantity>1){
          foundProduct.quantity-=1;
        }else{
            cartObjectUpdated = cartObjectUpdated.filter(p => p._id !== product._id)
        }
        setCart({objects : cartObjectUpdated})
    }

    function handlePurchase(){
        console.log(auth.token)
        console.log('ouiii')
        const purchaseArray = [];
        cartObject.map(product => {
            purchaseArray.push({
                "product" : product._id,
                "quantity" : product.quantity,
            })
        })
        purchase(purchaseArray, auth.token)
        .then(setCart({objects : []}))
        .then(setIsOpen(true))
    }

    useEffect(() => {
        let count = 0
        let totalToPay = 0;
        cartObject.map(product => {
            count +=  product.quantity
            totalToPay += (parseFloat(product.quantity) * parseFloat(product.price))
        })
        setItemInCart(count)
        setTotal(totalToPay)
    }, [cart]);

    useEffect(() => {
        if(isOpen === true){
            let openModalBtn = document.getElementById("triggerSuccess");
            openModalBtn.click();
        }
    }, [isOpen]);

    return(
        <>
            <button id='triggerSuccess' className='d-none' data-bs-toggle="modal" data-bs-target="#success"></button>
            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className='text-warning c-pointer' size='xl'data-bs-toggle="modal" data-bs-target="#cart" />
            <span className='cart-number bg-danger'>{itemInCart}</span>
            <div class="modal modal-lg fade" id="cart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Résumé de votre panier</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Quantitée</th>
                            <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartObject.map(product => 
                            <tr key={product._id}>
                                <th className='pt-2'>{product.name}</th>
                                <td className='pt-2'>{parseFloat(product.price)}</td>
                                <td className='text-center'>
                                    <ul class="pagination">
                                        <li class="page-item"><a onClick={() => removeToCart(product)} class="page-link" href="#">-</a></li>
                                        <li class="page-item w-100"><span class="page-link">{parseFloat(product.quantity)}</span></li>
                                        <li class="page-item"><a onClick={() => addToCart(product)} class="page-link" href="#">+</a></li>
                                    </ul>
                                </td>
                                <td className='pt-2'>{(parseFloat(product.price) * parseFloat(product.quantity)).toFixed(2)}</td>
                            </tr>  
                            )}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <th className='mt-3'>{total.toFixed(2)}</th>
                            </tr>
                        </tbody>
                        </table>
                        
                    </div>
                    <div class="modal-footer">
                        <button onClick={() => handlePurchase()} className="btn btn-warning w-100 text-light" data-bs-dismiss="modal" aria-label="Close" >Commander</button>
                    </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="success" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Votre commande a été effectuée</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-footer">
                        <button className="btn btn-warning text-light" data-bs-dismiss="modal" aria-label="Close" >Retour au site</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}