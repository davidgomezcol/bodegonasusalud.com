import {useEffect, useRef, useState} from "react";

const Maps = () => {
    const ref = useRef();
    const [map, setMap] = useState();
    const myLatLng = {lat: 10.061639444954514, lng: -69.28795309758308};

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: myLatLng, zoom: 17, mapTypeId: "roadmap",
            }));
        }
    }, [ref, map]);

    new window.google.maps.Marker({
        position: myLatLng, map, title: "Bodegón A Su Salud",
    });

    return <div style={{"width": "100%", "height": "60vh"}} ref={ref}/>;
}

export default Maps;
