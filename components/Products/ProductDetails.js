import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart-slice";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ProductDetails = (props) => {
    const dispatch = useDispatch();
    const {id, name, price} = props;

    const addToCartHandler = () => {
        dispatch(cartActions.addItemToCart({
            id, name, price,
        }));
    };
    return (<section className="row">
        <div className="text-center col-md-8">
            <h2>{props.name} {props.weight} {props.units}</h2>
            <img width="500px" src={props.image} alt={props.name}/>
            <h3 className="mt-5">Descripción</h3>
            <p>{props.description}</p>
        </div>
        <div className="col-md-4 border-2 border-start border-dark">
            <p>Precio: <span className="text-decoration-line-through">{props.price} $</span></p>
            <p>Precio Oferta: {props.price} $</p>
            <p>Categoria: {props.category}</p>
            <button className='btn btn-dark'
                    onClick={addToCartHandler}>Añadir al Carrito <FontAwesomeIcon
                    icon={"fa-solid fa-cart-arrow-down"}
                    width="32px"/></button>
        </div>
    </section>)
}

export default ProductDetails;
