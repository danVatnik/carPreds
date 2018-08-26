import React, { Component } from 'react';

class ModelSelector extends Component {
    render() {
        return (
            <div className="card">
                <h5 className="card-header">Featured</h5>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#model-modal">
                        Launch demo modal
                        </button>
                </div>
            </div>
        );
    }
}

export default ModelSelector;
