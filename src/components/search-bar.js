import React from 'react'
import LocationSection from './location/location-section';
import MakeSection from './make/make-section';
import ModelSection from './model/modal-section';


export default class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            makes: null,
        }

        this.setLocation = this.setLocation.bind(this);
        this.setMakes = this.setMakes.bind(this);

        this.fetchData = this.fetchData.bind(this);
    }
    
    setLocation(zip, location){
       this.setState({location:{
           zip: zip,
           location: location
       }})
    }

    setMakes(chosenMakes){
        this.setState({makes: chosenMakes});
        this.fetchData();
    }


    fetchData(){
        if(this.state.location && this.state.makes){
            fetch('/api/cars')
            .then(response => response.json())
            .then(json => console.log(json));
        }
    }

    render(){
        return(
            <div>
                <LocationSection setData={this.setLocation} />
                <MakeSection setData={this.setMakes} />
                <ModelSection />
            </div>
        );
    }
}