import {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import CartButton from "../Cart/CartButton";
import {useDispatch, useSelector} from "react-redux";
import {clearState, fetchUserBytoken, userSelector} from "../../store/users-slice";
import {Navbar, Nav, Dropdown, Container, Offcanvas} from 'react-bootstrap'
import {uiActions} from "../../store/ui-slice";

import classes from './MainNavigation.module.css';


function MainNavigation(props) {
    const router = useRouter();
    const {name, isSuccess} = useSelector(userSelector);
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log("isSuccess", isSuccess);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchUserBytoken(
                {
                    token: localStorage.getItem('token')
                }));
        }
        if (isSuccess) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false)
        }
    }, [isSuccess]);


    const onLogOut = () => {
        localStorage.removeItem('token');
        clearState();
        setIsLoggedIn(false);
        closeDropdown();
        router.push('/login');
    };

    const closeMenuHandler = () => {
        document.getElementsByClassName("btn-close")[0].click();
    }

    const cartHandler = () => {
        dispatch(uiActions.toggle());
        closeMenuHandler();
    }

    const closeDropdown = () => {
        const dropDown = document.getElementById('dropdown-autoclose-true');
        dropDown.click();
        setTimeout(() => {
            if (document.getElementById('InputEmail')) {
                document.getElementById('InputEmail').focus();
            }
            ;
            if (document.getElementsByName("first_name")[0]) {
                document.getElementsByName("first_name")[0].focus();
            }
        }, 100)
    }

    return (<header className={classes.header}>
        <Navbar bg="dark" fixed={"top"} expand={false}>
            <Container fluid>
                <Navbar.Brand href="#">
                    <Link href="/">
                        <img className={classes.logo}
                             alt="Bodegón a su Salud"
                             src="https://bodegonasusalud.com/images/asusalud.png"
                        />
                    </Link>
                </Navbar.Brand>
                <Nav.Link as={Link} href="/">
                    <a className={
                        `d-none d-lg-block 
                        ${router.pathname === "/" ? classes.active : ""}`
                    }>
                        Inicio
                    </a>
                </Nav.Link>
                <Nav.Link as={Link} href="/productos">
                    <a className={
                        `d-none d-lg-block 
                        ${router.pathname === "/productos" ? classes.active : ""}`
                    }>
                        Productos
                    </a>
                </Nav.Link>
                <Nav.Link as={Link} href="/compra-y-recoje">
                    <a className={
                        `d-none d-lg-block 
                        ${router.pathname === "/compra-y-recoje" ? classes.active : ""}`
                    }>
                        Compra y recoje
                    </a>
                </Nav.Link>

                <Dropdown className="d-none d-lg-block">
                    <Dropdown.Toggle variant="dark" id="dropdown-autoclose-true">
                        <a>{isLoggedIn ? name : "Mi Cuenta"}</a>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{width: "190px"}}>
                        {isLoggedIn ?
                            <Fragment>
                                <Dropdown.Item as={Link} href="/mi-cuenta">
                                    <a onClick={closeDropdown}
                                       style={{fontSize: "16px"}}
                                       className={
                                           `ms-3 fw-light ${router.pathname === "/mi-cuenta" ? classes.active : ""}`}>
                                        Mi Cuenta
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Divider as={"hr"}/>
                                <Dropdown.Item as={Link} href="#"><a style={{fontSize: "16px"}}
                                                                     className="ms-3 fw-light"
                                                                     onClick={onLogOut}>Salir</a></Dropdown.Item>
                            </Fragment>
                            :
                            <Fragment>
                                <Dropdown.Item as={Link} href="/login">
                                    <a onClick={closeDropdown}
                                       style={{fontSize: '16px'}} className="ms-3">Inicia Sesión
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Divider/>
                                <p style={{fontSize: "14px"}} className="ms-3 me-3 fw-light text-white">
                                    ¿Aún no tienes cuenta?
                                </p>
                                <Dropdown.Item as={Link} href="/registro">
                                    <a onClick={closeDropdown}
                                       style={{fontSize: '16px'}}
                                       className="ms-3">Regístrate
                                    </a>
                                </Dropdown.Item>
                            </Fragment>
                        }
                    </Dropdown.Menu>
                </Dropdown>

                <div className="d-none d-lg-block">
                    <CartButton/>
                </div>
                <Navbar.Toggle className="d-lg-none d-xl-none d-xxl-none navbar-dark"
                               aria-controls="offcanvasNavbar"/>
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    className={classes["offcanvas-bg"]}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            <img className={classes.logo}
                                 alt="Bodegón a su Salud"
                                 src="https://bodegonasusalud.com/images/asusalud.png"/>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className={classes["link-text"] + ` justify-content-end flex-grow-1 pe-3`}>
                            <Nav.Link as={Link} href="/">
                                <a onClick={closeMenuHandler} className={router.pathname === "/" ?
                                    classes.active : ""}>Inicio
                                </a>
                            </Nav.Link>
                            <Nav.Link className={classes["link-text"]} as={Link} href="/productos">
                                <a onClick={closeMenuHandler} className={router.pathname === "/productos" ?
                                    classes.active : ""}>Productos
                                </a>
                            </Nav.Link>
                            <Nav.Link as={Link} href="/compra-y-recoje">
                                <a onClick={closeMenuHandler} className={router.pathname === "/compra-y-recoje" ?
                                    classes.active : ""}>Compra y recoje
                                </a>
                            </Nav.Link>
                            <Nav.Link as={Link} href="/mi-cuenta">
                                <a onClick={closeMenuHandler} className={router.pathname === "/mi-cuenta" ?
                                    classes.active : ""}>Mi Cuenta
                                </a>
                            </Nav.Link>
                            <Nav.Link as={Link} href="#">
                                <a onClick={cartHandler}>Mi Carrito</a>
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    </header>)
};

export default MainNavigation;
