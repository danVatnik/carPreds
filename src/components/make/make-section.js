import React, { Component } from 'react';
import MakeSelector from './make-selector';
import MakeModal from './make-modal';

class MakeSection extends Component {
    render() {
        return (
            <div className="make-section">
                <MakeSelector />
                <MakeModal />
            </div>
        );
    }
}

export default MakeSection;
