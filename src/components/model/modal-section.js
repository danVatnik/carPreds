import React, { Component } from 'react';
import ModelSelector from './model-selector';
import ModelModal from './model-modal';

class ModelSection extends Component {
    render() {
        return (
            <div className="model-section">
                <ModelSelector />
                <ModelModal />
            </div>
        );
    }
}

export default ModelSection;
