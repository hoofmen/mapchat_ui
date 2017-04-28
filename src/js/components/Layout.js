import React from "react";

import Header from "./Header"
import GMap from "./GMap"
import Footer from "./Footer"


export default class Layout extends React.Component {
  render() {
    return (
    	<div>
    		<Header/>
        	<GMap/>
        	<Footer/>
        </div>
    );
  }
}