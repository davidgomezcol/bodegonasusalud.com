import {Fragment} from "react";
import {Provider} from "react-redux";

import store from '../store/index'

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {faTwitter, faFacebook, faInstagram, faFontAwesome} from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter, faFacebook, faInstagram, faFontAwesome)

import '../styles/globals.css'
import AppLayout from "../components/Layout/AppLayout";

const SOCIAL = [
    {
        'id': 1,
        'social': 'instagram',
        'url': 'https://www.instagram.com'
    },
    {
        'id': 2,
        'social': 'twitter',
        'url': 'twitter.com'
    },
    {
        'id': 3,
        'social': 'facebook',
        'url': 'facebook.com'
    },
]

function MyApp({Component, pageProps}) {
    return (
        <Fragment>
            <Provider store={store}>
                <AppLayout social={SOCIAL}>
                    <Component {...pageProps} />
                </AppLayout>
            </Provider>
        </Fragment>
    )
}

export default MyApp
