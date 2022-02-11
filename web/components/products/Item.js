import classes from "./Item.module.css";

const Item = (props) => {
    return (
        <div className={`col-md-3 card ` + classes["item-div"]} style={{"width": "16rem"}}>
            <div><img className={classes["product-image"]} src={props.image}/></div>
                <h5 className={classes["product-name"]}>{props.name}</h5>
                <div className={classes["description-wrapper"]}>
                    <p>{props.weight}{props.units}</p>
                    <p>Precio: {props.price} $</p>
                </div>
            <button className='btn btn-dark'>Añadir al Carrito</button>
        </div>
    )
};

export default Item;
