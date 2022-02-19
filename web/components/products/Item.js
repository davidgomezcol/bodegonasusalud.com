import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

import {cartActions} from "../../store/cart-slice";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classes from "./Item.module.css";

const Item = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const {id, name, price, category, weight, units} = props;

    const addToCartHandler = () => {
        dispatch(cartActions.addItemToCart({
            id, name, price,
        }));
    };

    const showDetailsHandler = () => {
        router.push('/productos/' + category + "/" + name.toLowerCase().replaceAll(" ", "-")).then()
    }

    return (<div className={`col-md-3 card ` + classes["item-div"]} style={{"width": "16rem"}}>
            <div>
                <button className="border-0 bg-transparent">
                    <img className={classes["product-image"]}
                         src={props.image}
                         alt={props.name} onClick={showDetailsHandler}/>
                </button>
            </div>
            <h5 className={classes["product-name"]}>{name}</h5>
            <div className={classes["description-wrapper"]}>
                <p>{weight}{units}</p>
                <p>Precio: $ {price}</p>
            </div>
            <button className='btn btn-dark'
                    onClick={addToCartHandler}>Añadir al Carrito <FontAwesomeIcon
                    icon={"fa-solid fa-cart-arrow-down"}
                    width="32px"/></button>
        </div>)
};

export default Item;
