import {Fragment} from "react";

import Products from "../../components/Products/Products";
import MetaTags from "../../components/Layout/MetaTags";

const Productos = (props) => {
    return (
        <Fragment>
            <MetaTags meta={props.meta} url="/productos" />
            <h1 className="text-center">Productos</h1>
            <Products products={props.products}/>
        </Fragment>
    )
}

export default Productos;

export async function getServerSideProps({params}) {
    const resProducts = await fetch(process.env.API_URL + 'products/', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Token ca26bcf85be14daedb6a636af5590638e559293c'
        })
    });
    const products = await resProducts.json();

    return {
        props: {
            products
        },
    }
}
