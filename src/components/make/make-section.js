import React, { Component } from 'react';
import MakeSelector from './make-selector';
import MakeModal from './make-modal';
import {makeData} from './make-data';

class MakeSection extends Component {
    constructor(props) {
        super(props);
        this.state = { makeData : makeData };
    }
    
    render() {
        return (
            <div className="make-section">
                <MakeSelector />
                <MakeModal makeData={this.state.makeData} />
            </div>
        );
    }
}

export default MakeSection;
