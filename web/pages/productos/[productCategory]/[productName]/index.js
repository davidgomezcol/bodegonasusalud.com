import ProductDetails from "../../../../components/Products/ProductDetails";

const ProductDetailsIndex = (props) => {
    return (<ProductDetails
            id={props.products.id}
            image={props.products.image}
            name={props.products.name}
            description={props.products.description}
            category={props.products.category}
            price={props.products.price}
            weight={props.products.weight}
            units={props.products.units}
        />)
}

export default ProductDetailsIndex;

export async function getStaticPaths(props) {
    const res = await fetch('http://localhost:8000/api/products/', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Token ca26bcf85be14daedb6a636af5590638e559293c'
        })
    });
    const products = await res.json();
    return {
        paths: products.map(product => ({
            params: {
                productCategory: product.name.toString().toLowerCase(),
                productName: product.name.toString().toLowerCase().replaceAll(" ", "-")
            }
        })), fallback: 'blocking' // so it can work after deployment
    };
}

export async function getStaticProps({params}) {
    const res = await fetch('http://localhost:8000/api/products/', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Token ca26bcf85be14daedb6a636af5590638e559293c'
        })
    });
    let products = await res.json();
    products = products.filter(
        product => product.name.toString().toLowerCase().replaceAll(" ", "-") === params.productName
    );
    return {
        props: {
            products: products[0],
        },
    }
}
