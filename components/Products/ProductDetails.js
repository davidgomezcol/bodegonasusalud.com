import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart-slice";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classes from "./Item.module.css";

const ProductDetails = (props) => {
    const dispatch = useDispatch();
    const {id, name, price, discount} = props;

    const addToCartHandler = () => {
        dispatch(cartActions.addItemToCart({
            id, name, price, discount
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

    return (<section className="row">
        <div className="text-center col-md-8">
            <h2>{props.name} {props.weight} {props.units}</h2>
            <img width="500px" src={props.image} alt={props.name}/>
            <h3 className="mt-5">Descripción</h3>
            <p>{props.description}</p>
        </div>
        <div className="col-md-4 border-2 border-start border-dark">
            {renderPrice()}
            <p>Categoria: {props.category}</p>
            <button className='btn btn-dark'
                    onClick={addToCartHandler}>Añadir al Carrito <FontAwesomeIcon
                    icon={"fa-solid fa-cart-arrow-down"}
                    width="32px"/></button>
        </div>
    </section>)
}

export default ProductDetails;
