import {Fragment} from "react";
import {useSelector} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./Header";
import Footer from "./Footer";
import Cart from "../Cart/Cart";


const AppLayout = (props) => {
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    return (
        <Fragment>
            <Header>
                {props.children}
            </Header>
            {showCart && <Cart/>}
            <Footer social={props.social}/>
        </Fragment>
    )
};

export default AppLayout
