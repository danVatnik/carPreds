import React from 'react'
import LocationSection from './location/location-section';
import MakeSection from './make/make-section';
import ModelSection from './model/modal-section';


export default class SearchBar extends React.Component{

    render(){
        return(
            <div>
                <LocationSection />
                <MakeSection />
                <ModelSection />
            </div>
        );
    }
}