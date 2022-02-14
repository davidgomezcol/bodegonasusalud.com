import {useDispatch, useSelector} from "react-redux";
import Head from 'next/head';

import Products from "../components/Products/Products";

import styles from '../styles/Home.module.css';
import Cart from "../components/Cart/Cart";

const PRODUCTS = [
    {
        'id': 1,
        'name': 'Cerveza Polar',
        'description': 'La Polarcita es una cerveza...',
        'weight': 255,
        'units': 'ml',
        'price': 0.99,
        'image': 'https://tienda.mozzarellaenlinea.com.ve/wp-content/uploads/2021/04/75902940T-1.jpg'
    },
    {
        'id': 2,
        'name': 'Cerveza Zulia',
        'description': 'La Zulia es una cerveza... asdasdsadsa dsa dasd asddasd asd asdasd as dasd asd sad asd asd asd asd asd asasd asd as sda ',
        'weight': 255,
        'units': 'ml',
        'price': 0.89,
        'image': 'https://www.pidebirras.com/wp-content/uploads/2021/02/Zulia.bmp'
    },
    {
        'id': 3,
        'name': 'Cerveza Regional Pilsen',
        'description': 'La Regional Pilsen es una cerveza...',
        'weight': 255,
        'units': 'ml',
        'price': 0.99,
        'image': 'https://www.elplazas.com/DB-IMG-PRODUCT/44001062/Img1.jpg'
    },
    {
        'id': 4,
        'name': 'Cerveza Solera Verde',
        'description': 'La Solera Verde es una cerveza...',
        'weight': 255,
        'units': 'ml',
        'price': 0.99,
        'image': 'https://pro2-bar-s3-cdn-cf.myportfolio.com/eaed3e9f-6c55-4e09-b25e-9a01a26db9ec/8304f602-8f80-45e4-acbe-09618d81b445_rw_1200.png'
    },
    {
        'id': 5,
        'name': 'Ron Cacique',
        'description': 'El Ron Cacique es un ron...',
        'weight': .700,
        'units': 'L',
        'price': 15,
        'image': 'https://cdn.shopify.com/s/files/1/0438/5715/0110/products/cacique_1200x1200.jpg'
    },
]

const Home = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    return (
        <div className={styles.container}>
            <Head>
                <title>Bodegón A Su Salud, C.A.</title>
                <meta name="description" content="Bodegón A Su Salud, C.A."/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Products products={PRODUCTS}/>
            </main>
        </div>
    )
}

export default Home;
