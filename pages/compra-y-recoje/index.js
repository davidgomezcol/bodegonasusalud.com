import {Fragment} from "react";
import {Wrapper} from "@googlemaps/react-wrapper";

import Maps from "../../components/Maps/Maps";

const Direccion = () => {
    return (
        <Fragment>
            <div className="text-center mb-5">
                <h1>Compra y Recoje</h1>
                <p>Lunes a Sábado de 9am a 8pm.</p>
            </div>
            <Wrapper apiKey="AIzaSyAc5Dp9KHkPr4HzniBA5mzX_g9T9P_g7H8">
                <Maps />
            </Wrapper>
        </Fragment>
    )
}

export default Direccion;
