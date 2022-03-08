import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {uiActions} from "../../store/ui-slice";
import {cartActions} from "../../store/cart-slice";

import Card from '../UI/Card';
import CartItem from './CartItem';
import classes from './Cart.module.css';


const Cart = (props) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const {cartTotalQuantity, cartTotalAmount} = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(cartActions.getTotals());
    }, [cartItems])

    const closeCartHandler = () => {
        dispatch(uiActions.toggle())
    }

    return (<Card className={classes.cart}>
        <div className="row justify-content-between">
            <div className="col-6"><h2>Tu Carrito de Compras</h2></div>
            <div className="col-6 text-end">
                <button
                    onClick={closeCartHandler}>X
                </button>
            </div>
        </div>
        {cartItems.length > 0  && <div className="mt-5">
             {cartTotalQuantity === 1 ? cartTotalQuantity + " Producto Añadido" : cartTotalQuantity + " Productos Añadidos"}
        </div>}
        {cartItems.length === 0 ? <div className="position-relative text-center top-50">
            <p>No tienes productos agregados al carrito</p></div> : <ul>
            {cartItems.map((item) => (<CartItem
                key={item.id}
                item={{
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    total: item.totalPrice,
                    price: item.price,
                }}
            />))}
        </ul>}
        {cartItems.length > 0 && <div className="mt-3 mb-5">
            Total: ${cartTotalAmount.toFixed(2)}
        </div>}
        {cartItems.length > 0 && <div className="text-center">
            <button
                className="btn btn-warning"
                style={{fontSize: '20px'}}>
                Ir a Pagar
            </button>
        </div>}
    </Card>);
};

export default Cart;
