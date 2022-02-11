import {Fragment} from "react";
import Item from "./Item";

const Products = (props) => {
    return (
        <Fragment>
            <div className="text-center"><h1>Popular Products</h1></div>
                <div className="row justify-content-around" style={{"width": "90%", "margin": "0 auto"}}>
                    {props.products.map((item) => (
                        <Item
                            key={item.id}
                            image={item.image}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            weight={item.weight}
                            units={item.units}
                            price={item.price}/>
                    ))}
                </div>
        </Fragment>
    )
};

export default Products;
