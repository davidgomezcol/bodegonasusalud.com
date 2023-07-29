import {Fragment} from "react";
import Products from "../../../components/Products/Products";

const ProductCategories = (props) => {
    return (
        <Fragment>
            <h1 className="text-center">{props.products.category}</h1>
            <Products products={props.products} featured={0} />
        </Fragment>
    )
}

export default ProductCategories;

// export async function getStaticPaths(props) {
//     const res = await fetch(`http://localhost/api/products/`, {
//         headers: new Headers({
//             'Content-Type': 'application/json',
//             'Authorization': 'Token ca26bcf85be14daedb6a636af5590638e559293c'
//         })
//     });
//     const products = await res.json();
//     return {
//         paths: products.map(products => ({params: {productCategory: products.name.toString().toLowerCase()}})),
//         fallback: 'blocking' // so it can work after deployment
//     };
// }

export async function getServerSideProps({params}) {
    const resProducts = await fetch(process.env.API_URL + 'products/', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': process.env.TOKEN
        })
    });
    let products = await resProducts.json();
    products = products.filter(
        products => products.category.toString().toLowerCase() === params.productCategory.toLowerCase()
    );
    // console.log("Products", products);
    return {
        props: {
            products
        },
    }
}
