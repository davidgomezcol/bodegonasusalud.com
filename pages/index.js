import {Fragment} from "react";

import Products from "../components/Products/Products";
import MetaTags from "../components/Layout/MetaTags";

const Home = (props) => {
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
    const res = await fetch(process.env.API_URL + 'products/', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': process.env.TOKEN,
        })
    });
    const products = await res.json();

    return {
        props: {
            products,
        },
    }
}
