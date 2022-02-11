import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import Link from "next/link";
import classes from './MainNavigation.module.css';

function MainNavigation() {
    const [stick, setStick] = useState(false)
    const router = useRouter()
    const cssClasses = [classes.header, stick ? "sticky-top" : '']

    let last_known_scroll_position = 0;
    let ticking = false;

    function StickHeader(scroll_pos) {
        if (scroll_pos > 130) {
            setStick(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', function (e) {
            last_known_scroll_position = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(function () {
                    StickHeader(last_known_scroll_position);
                    ticking = false;
                });

                ticking = true;
                setStick(false)
            }
        });
    }, [])

    return (
        <header className={cssClasses.join(' ')}>
            <Link href="/"><a><img className={classes.logo} src="https://bodegonasusalud.com/images/asusalud.png"/></a></Link>
            <nav>
                <ul>
                    <li>
                        <Link href='/contactanos'>
                            <a className={router.pathname == "/contactanos" ? classes.active : ""}>Contáctanos</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/nosotros'>
                            <a className={router.pathname == "/nosotros" ? classes.active : ""}>Nosotros</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
