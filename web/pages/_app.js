import {Fragment} from "react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter, faFacebook, faInstagram, faFontAwesome)

import '../styles/globals.css'

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
            <Header>
                <Component {...pageProps} />
            </Header>
            <Footer social={SOCIAL}/>
        </Fragment>
    )
}

export default MyApp
