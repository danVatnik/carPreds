import React, { Component } from 'react';

class LocationSelector extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if(this.props.zip){
            return (
                <div className="card">
                <div className="card-header">
                <div className="flex-header">
                    <h5 className="left-side-text mb-0">Location</h5>
                    <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#location-modal">
                        Edit
                    </button>
                </div>
                </div>
                    <div className="card-body">
                        <div className="zip">
                            <strong className="bold">Zip: </strong>
                            <span>{this.props.zip}</span>
                        </div>
                        <div className="radius">
                            <strong className="bold">Radius: </strong>
                            <span>{this.props.radius} Miles</span>
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="card">
                    <h5 className="card-header">Location</h5>
                    <div className="card-body">
                        <button type="button" className="btn btn-primary center-block" data-toggle="modal" data-target="#location-modal">
                        Set Location
                        </button>
                    </div>
                </div>
            );
        }
    }
}

export default LocationSelector;
