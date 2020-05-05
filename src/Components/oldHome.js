import React, { useState } from 'react'
import { Image } from 'semantic-ui-react'
import ReactMapGL, { Marker, Popup } from "react-map-gl"

export default function Home(props) {

    const [viewport, setViewport] = useState({
        latitude: 37.0902,
        longitude: -95.7129,
        width: '100vw',
        height: `100vh`,
        zoom: 4
    })
    const [selectedBar, setSelectedBar] = useState(null)


    const handleClick = () => {
        console.log("handle click works")
    }
    
    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={"pk.eyJ1IjoiZ2ltbWlldXJhcGlzIiwiYSI6ImNrOWtneGs3dzAxMDkza3BteHNkODVub3UifQ.fw_-jP8bLXc2AVEw8KqAsg"}
                onViewportChange={(viewport) => { setViewport(viewport) }}
                mapStyle={"mapbox://styles/gimmieurapis/ck98mgfwf01ll1instq3ufgsq"}
            >
                {props.bars.map((bar) => (
                    <Marker
                        key={bar.id}
                        latitude={bar.latitude}
                        longitude={bar.longitude}
                    >
                        <button
                            className="marker-btn"
                            onClick={(e) => {
                                e.preventDefault()
                                setSelectedBar(bar)
                            }}
                        >
                            <img src="/beers/beer5.svg" />
                        </button>
                    </Marker>
                ))}
                {selectedBar ? (
                    <Popup
                        className="popup"
                        latitude={selectedBar.latitude}
                        longitude={selectedBar.longitude}
                        onClose={() => {
                            setSelectedBar(null)
                        }}
                    >
                        <div>
                            <h2><a href='#' onClick={handleClick}>{selectedBar.name}</a></h2>
                            <p>Est: {selectedBar.opened}</p>
                            <img className="pop-img" src={selectedBar.image} />
                        </div>
                    </Popup>
                ) : null}

            </ReactMapGL>
        </div>
    )
}
