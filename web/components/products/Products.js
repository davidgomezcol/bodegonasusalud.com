import Item from "./Item";

const Products = (props) => {
    let products = props.products;
    if (props.featured === 1) {
        products = props.products.filter((item) => item.featured === true);
    }
    return (

        <div className="row justify-content-around" style={{"width": "90%", "margin": "0 auto"}}>
            {products.map((item) => (<Item
                    key={item.id}
                    image={item.image}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    category={item.category.toString().toLowerCase()}
                    weight={item.weight}
                    units={item.units}
                    price={item.price}
                />))}
        </div>

    )
};

export default Products;
