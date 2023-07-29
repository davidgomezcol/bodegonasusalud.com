import {Fragment, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {uiActions} from "../../store/ui-slice";
import {cartActions} from "../../store/cart-slice";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Card from '../UI/Card';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import {useRouter} from "next/router";


const Cart = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const {cartTotalQuantity, cartTotalAmount} = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(cartActions.getTotals());
    }, [cartItems])

    const closeCartHandler = () => {
        dispatch(uiActions.toggle());
    };

    const checkoutHandler = () => {
        dispatch(uiActions.toggle());
        router.push('/verificar')
    };

    const clearCart = () => {
        dispatch(cartActions.removeAllItemsFromCart())
    }

    return (
        <Card className={classes.cart}>
            <div className="row justify-content-between">
                <div className="col-6">
                    <h2>Tu Carrito de Compras</h2>
                </div>
                <div className="col-6 text-end">
                    <button
                        onClick={closeCartHandler}><FontAwesomeIcon width="16px" icon="fa-solid fa-xmark" />
                    </button>
                </div>
            </div>
            {cartItems.length > 0 && <div className="mt-5">
                {cartTotalQuantity === 1 ? cartTotalQuantity + " Producto Añadido" :
                    cartTotalQuantity + " Productos Añadidos"}
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
                        discount: item.discount,
                    }}
                />))}
            </ul>}
            {cartItems.length > 0 && <div className="mt-3 mb-5">
                Total: ${cartTotalAmount.toFixed(2)}
            </div>}
            {cartItems.length > 0 && <div className="text-center">
                <button
                    className="btn btn-warning"
                    style={{fontSize: '20px'}}
                    onClick={checkoutHandler}
                >
                    Crear Orden
                </button>
                <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
            </div>}
        </Card>
    );
};

export default Cart;
