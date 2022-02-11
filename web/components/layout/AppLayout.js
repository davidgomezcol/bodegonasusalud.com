import {Fragment} from "react";

import Header from "./Header";
import Footer from "./Footer";

const AppLayout = (props) => {
    return (
        <Fragment>
            <Header/>
            {props.children}
            <Footer/>
        </Fragment>
    )
};

export default AppLayout