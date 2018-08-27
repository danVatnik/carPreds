import React, { Component } from 'react';
import LocationSelector from './location-selector';
import LocationModal from './location-modal';
import {radiusData} from './radius-data';

class LocationSection extends Component {
    constructor(props) {
        super(props);
        this.state = {zip: null, radius: null, radiusData: radiusData }

        this.onModalDone = this.onModalDone.bind(this);
    }

    onModalDone(zip, radius){
        this.setState({
            zip: zip,
            radius: radius
        })

        this.props.setData(zip, radius);
    }

    render() {
        return (
            <div className="location-section">
                <LocationSelector zip={this.state.zip} radius={this.state.radius} />
                <LocationModal zip={this.state.zip} radius={this.state.radius} sendDataToParent={this.onModalDone} radiusData ={this.state.radiusData} />
            </div>
        );
    }
}

export default LocationSection;
