import Link from "next/link";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import classes from './Footer.module.css'
import styles from './MainNavigation.module.css'

const Footer = (props) => {
    return (<footer>

        <div className={`container-fluid py-5 mt-5 text-white ` + classes.footer}>
            <div className="row">
                <div className="col-md-4 align-left justify-items-center">
                    <ul className="list-group-flush">
                        <li className="list-group-item bg-black"><Link
                            href='/contactanos'><a
                            className="text-light text-decoration-none">Contáctanos</a></Link></li>
                        <li className="list-group-item bg-black"><Link
                            href='/nosotros'><a className="text-light text-decoration-none">Nosotros</a></Link></li>
                    </ul>
                </div>
                <div className="col-md-4 text-center">
                    <Link href="/"><a><img className={styles.logo} alt="Bodegón a Su Salud"
                                           src="https://bodegonasusalud.com/images/asusalud.png"/></a></Link>
                </div>
                <div className="col-md-4 text-center">
                    <ul className="list-group-flush d-inline-flex align-middle">
                        {props.social.map((item) => (<li
                            key={item.id}
                            className="list-group-item bg-black"
                        >
                            <a className="text-capitalize text-light text-decoration-none" href={item.url}
                               rel="noreferrer"
                               target="_blank"><FontAwesomeIcon icon={`fa-brands fa-` + item.social}
                                                                width="32px"/></a>
                        </li>))}
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 text-center mt-3">
                    <p className="mb-0">Dirección: Calle 11, Centro Comercial el Parral, Nivel PB, Local 03.</p>
                    <p>Barquisimeto, Edo Lara. Venezuela</p>
                    <a href="tel:+582512548914" className="text-decoration-none text-light">Teléfono: (+58)
                        251-2548914</a>
                    <p>
                        <a href="mailto:asusaludca@gmail.com" target="_blank" rel="noreferrer"
                           className="text-decoration-none text-light"> Email:
                            asusaludca@gmail.com</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>)
};

export default Footer
