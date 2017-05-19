import _ from "lodash";

import { 
    default as React, 
	Component,
} from "react";

import { 
	withGoogleMap, 
	GoogleMap,
	Marker,
  InfoWindow,
} from "react-google-maps";

import superagent from 'superagent';


const InitialMap = withGoogleMap(props => (	
	<GoogleMap
		ref={props.onMapLoad}
		defaultZoom={14}
		defaultCenter={{ lat: 37.7610494, lng: -121.9018853 }}
		onClick={props.onMapClick}>


    { props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        onClick={() => props.onMarkerClick(marker)}
      >
        {/*
          Show info window only if the 'showInfo' key of the marker is true.
          That is, when the Marker pin has been clicked and 'onCloseClick' has been
          Successfully fired.
        */}
        { marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.content}</div>
          </InfoWindow>
        )}
      </Marker>
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
      //const url = 'http://localhost:8080/messages?lat=' + this.state.center.lat + '&lng=' + this.state.center.lng + '&rad=4&max_messages=50';
      //const url = 'http://localhost:3004/mapmessages';

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
                    showInfo: false,
                    key: msg.id,
                    content: msg.message,
                    defaultAnimation: 2,
                };                
                nextMarkers.push(marker);
            });

            this.setState({
                markers: nextMarkers,
            });
          }
        });
    }

    handleMapLoad = this.handleMapLoad.bind(this);
  	handleMapClick = this.handleMapClick.bind(this);
  	handleMarkerClick = this.handleMarkerClick.bind(this);
    handleMarkerClose = this.handleMarkerClose.bind(this);

  	handleMapLoad(map) {
    	this._mapComponent = map;
    	if (map) {

    	}
  	}

  	handleMapClick(event) {
    	const nextMarkers = [
      		...this.state.markers,
      		{
		        position: event.latLng,
            content: 'new mesage ' + Date.now(),
		        defaultAnimation: 2,
		        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      		},
		  ];

	    this.setState({
            markers: nextMarkers,
	    });
  	}

  	handleMarkerClick(targetMarker) {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              showInfo: true,
            };
          }
          return marker;
        }),
      });
  	}

    handleMarkerClose(targetMarker) {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              showInfo: false,
            };
          }
          return marker;
        }),
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
              onMarkerClose={this.handleMarkerClose}
	      		/>
	  		</div>
	    );
	}
}