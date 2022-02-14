import {useSelector, useDispatch} from "react-redux";

import {uiActions} from "../../store/ui-slice";

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

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
        </Card>);
};

export default Cart;
