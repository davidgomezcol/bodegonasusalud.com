import {Fragment} from "react";
import {Provider} from "react-redux";
import store from '../store/index'

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {faTwitter, faFacebook, faInstagram, faFontAwesome} from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter, faFacebook, faInstagram, faFontAwesome)

import AppLayout from "../components/Layout/AppLayout";
import '../styles/globals.css'

const SOCIAL = [{
    'id': 1, 'social': 'instagram', 'url': 'https://www.instagram.com'
}, {
    'id': 2, 'social': 'twitter', 'url': 'twitter.com'
}, {
    'id': 3, 'social': 'facebook', 'url': 'facebook.com'
},]

const METADATA = [
    {
        'id': 1,
        'title': 'Bodegón a Su Salud - Principal',
        'content': 'Los Mejores Licores y Alimentos los encontraras aqui...',
        'url': '/'
    },
    {
        'id': 2,
        'title': 'Bodegón a Su Salud - Productos',
        'content': 'Los Mejores Productos los encontraras aqui...',
        'url': '/productos'
    }
]

export const PRODUCTS = [{
    'id': 1,
    'name': 'Cerveza Polar',
    'description': 'La Polarcita es una cerveza...',
    'category': 'Cerveza',
    'weight': 255,
    'units': 'ml',
    'price': 0.99,
    'image': 'https://tienda.mozzarellaenlinea.com.ve/wp-content/uploads/2021/04/75902940T-1.jpg',
    'featured': 1
}, {
    'id': 2,
    'name': 'Cerveza Zulia',
    'description': 'La Zulia es una cerveza... asdasdsadsa dsa dasd asddasd asd asdasd as dasd asd sad asd asd asd asd asd asasd asd as sda ',
    'category': 'Cerveza',
    'weight': 255,
    'units': 'ml',
    'price': 0.89,
    'image': 'https://www.pidebirras.com/wp-content/uploads/2021/02/Zulia.bmp',
    'featured': 1
}, {
    'id': 3,
    'name': 'Cerveza Regional Pilsen',
    'description': 'La Regional Pilsen es una cerveza...',
    'category': 'Cerveza',
    'weight': 255,
    'units': 'ml',
    'price': 0.99,
    'image': 'https://www.elplazas.com/DB-IMG-PRODUCT/44001062/Img1.jpg',
    'featured': 1
}, {
    'id': 4,
    'name': 'Cerveza Solera Verde',
    'description': 'La Solera Verde es una cerveza...',
    'category': 'Cerveza',
    'weight': 255,
    'units': 'ml',
    'price': 0.99,
    'image': 'https://pro2-bar-s3-cdn-cf.myportfolio.com/eaed3e9f-6c55-4e09-b25e-9a01a26db9ec/8304f602-8f80-45e4-acbe-09618d81b445_rw_1200.png',
    'featured': 0
}, {
    'id': 5,
    'name': 'Ron Cacique',
    'description': 'El Ron Cacique es un ron...',
    'category': 'Ron',
    'weight': .700,
    'units': 'L',
    'price': 15,
    'image': 'https://cdn.shopify.com/s/files/1/0438/5715/0110/products/cacique_1200x1200.jpg',
    'featured': 1
}, {
    'id': 6,
    'name': "Vodka Gordon's",
    'description': 'El Vodka Gordons es...',
    'category': 'Vodka',
    'weight': .700,
    'units': 'L',
    'price': 18,
    'image': 'https://curda24.com/wp-content/uploads/2016/11/Vodka-Gordons_Original_836617-01.jpg',
    'featured': 0
}, {
    'id': 7,
    'name': 'Vodka Glacial',
    'description': 'El Vodka Glacial es...',
    'category': 'Vodka',
    'weight': .700,
    'units': 'L',
    'price': 13,
    'image': 'https://costazul.sigo.com.ve/images/thumbs/0003040_vodka-guarana-glacial-070-l_450.jpeg',
    'featured': 0
}, {
    'id': 8,
    'name': 'Toddy',
    'category': 'Alimentos',
    'description': 'Bebida achocolatada...',
    'weight': 400,
    'units': 'L',
    'price': 8,
    'image': 'https://empresaspolar.com/files/subcategoria/pequena/imagen_pequena52.png',
    'featured': 0
},]

function MyApp({Component, pageProps}) {
    return (<Fragment>
            <Provider store={store}>
                <AppLayout social={SOCIAL}>
                    <Component products={PRODUCTS} meta={METADATA} {...pageProps} />
                </AppLayout>
            </Provider>
        </Fragment>)
}

export default MyApp
