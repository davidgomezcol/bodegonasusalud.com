import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './Footer.module.css'
import styles from './MainNavigation.module.css'

const Footer = (props) => {
    return (
        <footer>

            <div className={`container-fluid py-5 mt-5 text-white ` + classes.footer}>
                <div className="row">
                    <div className="col-md-4 align-left justify-items-center">
                        <ul className="list-group-flush">
                            <li className="list-group-item bg-black"><Link
                                href='/contactanos'><a className="text-light text-decoration-none">Contáctanos</a></Link></li>
                            <li className="list-group-item bg-black"><Link
                                href='/nosotros'><a className="text-light text-decoration-none">Nosotros</a></Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4 text-center">
                        <Link href="/"><a><img className={styles.logo}
                                               src="https://bodegonasusalud.com/images/asusalud.png"/></a></Link>
                    </div>
                    <div className="col-md-4 text-center">
                        <ul className="list-group-flush d-inline-flex align-middle">
                            {props.social.map((item) => (
                                <li
                                    key={item.id}
                                    className="list-group-item bg-black"
                                >
                                    <a className="text-capitalize text-light text-decoration-none" href={item.url} rel="noreferrer"
                                       target="_blank"><FontAwesomeIcon icon={`fa-brands fa-`+item.social} width="32px"/></a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer