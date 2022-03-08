import {Fragment, useState} from "react";
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

function MyApp({Component, pageProps}) {
    return (<Fragment>
            <Provider store={store}>
                <AppLayout social={SOCIAL}>
                    <Component meta={METADATA} {...pageProps} />
                </AppLayout>
            </Provider>
        </Fragment>)
}

export default MyApp
