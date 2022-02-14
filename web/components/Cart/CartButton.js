import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";

import classes from './CartButton.module.css';

const CartButton = (props) => {
    const dispatch = useDispatch();
    const cartQuantity = useSelector((state) => state.cart.totalQuantity);

    const toggleCartHandler = () => {
        dispatch(uiActions.toggle(null));
    }
    return (
        <button className={classes["cart-button"]} onClick={toggleCartHandler}>
            <span>Mi Carrito</span>
            <span className={classes["cart-badge"]}>{cartQuantity}</span>
        </button>
    );
};

export default CartButton;
