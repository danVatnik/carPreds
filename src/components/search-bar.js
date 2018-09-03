import React from 'react'
import LocationSection from './location/location-section';
import MakeSection from './make/make-section';
import ModelSection from './model/model-section';
import CarsService from '../api';
import {makeData} from './make/make-data';

export default class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            zip: null,
            radius: null,
            makes: null,
            models: null,
            makeData: makeData,
            modelsData: null
        }

        this.getMakes = this.getMakes.bind(this);
        this.getModels = this.getModels.bind(this);

        this.setLocation = this.setLocation.bind(this);
        this.setMakes = this.setMakes.bind(this);
        this.setModels = this.setModels.bind(this);

        this.propagateMakes = this.propagateMakes.bind(this);

        this.getMakes();
    }
    
    setLocation(zip, radius){
        const params = {
            zip: zip,
            radius: radius
        }
       this.setState({zip: zip, radius: radius});
       this.getMakes(params);
       this.propagateMakes();
    }

    setMakes(chosenMakes){
        const params = {
            zip: this.state.zip,
            radius: this.state.radius,
            makes: chosenMakes.map(m => m.value)
        }
        
        this.setState({makes: chosenMakes});
        this.getModels(params);
    }

    setModels(chosenModels){
        this.setState({models: chosenModels});

    }

    getMakes(location){
        var that = this;
        CarsService.getMakes(location)
        .then(function(makes){
            that.setState({makeData : makes});
        }); 
    }

    getModels(params){
        var that = this;
        CarsService.getModels(params)
        .then(function(models){
            that.setState({modelsData : models});
        });
    }

    propagateMakes(){
        
    }

    render(){
        return(
            <div>
                <LocationSection setData={this.setLocation} />
                <MakeSection setData={this.setMakes} makeData={this.state.makeData}/>
                <ModelSection setData={this.setModels} modelsData={this.state.modelsData}/>
            </div>
        );
    }
}