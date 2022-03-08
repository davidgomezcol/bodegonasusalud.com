import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {cartActions} from "../../store/cart-slice";
import {uiActions} from "../../store/ui-slice";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classes from './CartButton.module.css';

const CartButton = (props) => {
    const dispatch = useDispatch();
    // const cartTotalQ = useSelector((state) => state.cart.totalQuantity);
    const {cartTotalQuantity} = useSelector((state) => state.cart);

    useEffect(()=>{
        dispatch(cartActions.getTotals())
    },[{cartTotalQuantity}])

    const toggleCartHandler = () => {
        dispatch(uiActions.toggle(null));
    }
    return (
        <button className={classes["cart-button"]} onClick={toggleCartHandler}>
            <span><FontAwesomeIcon icon={"fa-solid fa-cart-shopping"} width={"32px"}/></span>
            <span className={classes["cart-badge"]}>{cartTotalQuantity}</span>
        </button>
    );
};

export default CartButton;
