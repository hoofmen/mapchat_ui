import _ from "lodash";

import { 
    default as React, 
	Component,
} from "react";

import { 
	withGoogleMap, 
	GoogleMap,
	Marker,
} from "react-google-maps";

import superagent from 'superagent';


const InitialMap = withGoogleMap(props => (	
	<GoogleMap
		ref={props.onMapLoad}
		defaultZoom={14}
		defaultCenter={{ lat: 37.7610494, lng: -121.9018853 }}
		onClick={props.onMapClick}>

		{props.markers.map(marker => (
			<Marker
				{...marker}
	        	onClick={() => props.onMarkerClick(marker)}
	      	/>
	    ))}
	</GoogleMap>
));

export default class Map extends Component {
    state = {
        center: { lat: 37.7610494, lng: -121.9018853 },
        markers: [],
	};

    componentDidMount(){        
        const url = 'https://mymapchat.herokuapp.com/messages?lat=' + this.state.center.lat + '&lng=' + this.state.center.lng + '&rad=4&max_messages=50';

        superagent
		.get(url)
		.query(null)
		.set('X-AUTH-TOKEN','thisisaverysecrettoken')
		.set('Accept', 'application/json')
		.end((error, response) => {
			if (error || !response.ok){
				console.log("Error!");
			}else {
                var nextMarkers = [
                  ...this.state.markers
                ];

                response.body.map((msg, i) => {
                    const marker = {
                        position: {
                            lat: msg.location.lat,
                            lng: msg.location.lng,
                        },
                        key: msg.id,
                        defaultAnimation: 2,
                    };
                    nextMarkers.push(marker);
                });

                console.log(nextMarkers);

                this.setState({
                    markers: nextMarkers,
                });
            }
		});
	}

    handleMapLoad = this.handleMapLoad.bind(this);
  	handleMapClick = this.handleMapClick.bind(this);
  	handleMarkerClick = this.handleMarkerClick.bind(this);

  	handleMapLoad(map) {
    	this._mapComponent = map;
    	if (map) {
      		//console.log(map.getZoom());
    	}
  	}

  	handleMapClick(event) {
    	const nextMarkers = [
      		...this.state.markers,
      		{
		        position: event.latLng,
		        defaultAnimation: 2,
		        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      		},
		  ];

	    this.setState({
            markers: nextMarkers,
	    });
  	}

  	handleMarkerClick(targetMarker) {
    	const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);

    	this.setState({
      		markers: nextMarkers,
    	});
  	}

  	render() {
	    return (
	    	<div style={{height: "100%"}}>
	      		<InitialMap
	        		containerElement={
	          			<div style={{ height: '100vh', width: 'auto' }} />
	        		}
	        		mapElement={
	          			<div style={{ height: '100vh', width: '100vw' }} />
	        		}
	        		onMapLoad={this.handleMapLoad}
        			onMapClick={this.handleMapClick}
        			markers={this.state.markers}
        			onMarkerClick={this.handleMarkerClick}
	      		/>
	  		</div>
	    );
	}
}