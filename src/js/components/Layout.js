import React from "react";

import Header 	from "./Header"
import Map 		from "./Map"


export default class Layout extends React.Component {
  render() {
    return (
    	<div>
    		<Header/>
        	<Map/>        	
        </div>
    );
  }
}