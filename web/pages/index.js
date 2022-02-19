import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";

import Products from "../components/Products/Products";
import MetaTags from "../components/Layout/MetaTags";

const Home = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    return (
        <Fragment>
            <MetaTags meta={props.meta} url="/"/>
            <main>
                <div className="text-center"><h1>Productos Populares</h1></div>
                <Products products={props.products} featured={1}/>
            </main>
        </Fragment>
    )
}

export default Home;

export async function getStaticProps() {
    const res = await fetch('http://localhost:8000/api/products/', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Token ca26bcf85be14daedb6a636af5590638e559293c'
        })
    });
    const products = await res.json();

    return {
        props: {
            products,
        },
    }
}