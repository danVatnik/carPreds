import React, { Component } from 'react';
import ModelSelector from './model-selector';
import ModelModal from './model-modal';

class ModelSection extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            chosenModels : null
         };

        this.onModalSubmit = this.onModalSubmit.bind(this);
    }

    onModalSubmit(chosenModels){
        this.setState({chosenModels:chosenModels});
        this.props.setData(chosenModels);
    }

    render() {
        return (
            <div className="model-section">
                <ModelSelector chosenModels={this.state.chosenModels} />
                <ModelModal modelsData={this.props.modelsData} submitHandler={this.onModalSubmit}/>
            </div>
        );
    }
}

export default ModelSection;
