import React, { Component } from 'react';
import MakeSelector from './make-selector';
import MakeModal from './make-modal';

class MakeSection extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            chosenMakes : null
         };

        this.onModalSubmit = this.onModalSubmit.bind(this);
    }
    
    onModalSubmit(chosenMakes){
        this.setState({chosenMakes:chosenMakes});
        this.props.setData(chosenMakes);
    }

    render() {
        return (
            <div className="make-section">
                <MakeSelector chosenMakes={this.state.chosenMakes} />
                <MakeModal makeData={this.props.makeData} submitHandler={this.onModalSubmit}/>
            </div>
        );
    }
}

export default MakeSection;
