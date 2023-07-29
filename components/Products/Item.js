import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

import {cartActions} from "../../store/cart-slice";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classes from "./Item.module.css";

const Item = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const {id, name, price, discount, category, weight, units, image} = props;
    //console.log("discount...", discount)

    const addToCartHandler = () => {
        dispatch(cartActions.addItemToCart({
            id, name, price, image, discount
        }));
    };

    const renderPrice = () => {
        if (discount) {
            const discountedPrice = price - (price * discount) / 100;
            return (
                <div>
                    <p className="text-decoration-line-through">Precio: $ {price}</p>
                    <p className={classes["price"]}>Oferta: $ {discountedPrice}</p>
                </div>
            );
        } else {
            return <p className={classes["price"]}>Precio: $ {price}</p>;
        }
    };

    const showDetailsHandler = () => {
        router.push('/productos/' + category + "/" + name.toLowerCase().replaceAll(" ", "-")).then()
    }

    return (<div className={`col-md-3 card ` + classes["item-div"]} style={{"width": "16rem"}}>
            <div>
                <button className="border-0 bg-transparent">
                    <img className={classes["product-image"]}
                         src={image}
                         alt={name} onClick={showDetailsHandler}/>
                </button>
            </div>
            <h5 className={classes["product-name"]}>{name}</h5>
            <div className={classes["description-wrapper"]}>
                <p>{weight}{units}</p>
                {renderPrice()}
            </div>
            <button className='btn btn-dark'
                    onClick={addToCartHandler}>Añadir al Carrito <FontAwesomeIcon
                    icon={"fa-solid fa-cart-arrow-down"}
                    width="32px"/></button>
        </div>)
};

export default Item;
