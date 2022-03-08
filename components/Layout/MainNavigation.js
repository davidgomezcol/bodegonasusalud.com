import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import CartButton from "../Cart/CartButton";
import classes from './MainNavigation.module.css';
import {useDispatch, useSelector} from "react-redux";
import {clearState, fetchUserBytoken, userSelector} from "../../store/users-slice";

function MainNavigation(props) {
    const [stick, setStick] = useState(false);
    const router = useRouter();
    const {isSuccess} = useSelector(userSelector);
    const dispatch = useDispatch();
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

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchUserBytoken(
                {
                    token: localStorage.getItem('token')
                }));
        }
    }, []);

    const onLogOut = () => {
        localStorage.removeItem('token');
        dispatch(clearState());
        router.push('/login');
    };

    return (<header className={cssClasses.join(' ')}>
        <Link href="/"><a><img className={classes.logo} alt="Bodegón a su Salud"
                               src="https://bodegonasusalud.com/images/asusalud.png"/></a></Link>
        <nav>
            <ul>
                <li>
                    <Link href='/productos'>
                        <a className={router.pathname == "/productos" ? classes.active : ""}>Productos</a>
                    </Link>
                </li>
                <li>
                    <Link href='/compra-y-recoje'>
                        <a className={router.pathname == "/compra-y-recoje" ? classes.active : ""}>Compra y recoje</a>
                    </Link>
                </li>
                <li>
                    <Link href='/mi-cuenta'>
                        <a className={router.pathname == "/mi-cuenta" ? classes.active : ""}>Mi Cuenta</a>
                    </Link>
                </li>
                <li>
                    {isSuccess && <Link href="">
                        <a onClick={onLogOut}>Salir</a>
                    </Link>}
                </li>
                <li><CartButton/></li>
            </ul>
        </nav>
    </header>)
};

export default MainNavigation;
