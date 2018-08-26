import React, { Component } from 'react';

class MakeSelector extends Component {
    render() {
        return (
            <div className="card">
                <h5 className="card-header">Make</h5>
                <div className="card-body">
                    <button type="button" className="btn btn-primary center-block" data-toggle="modal" data-target="#make-modal">
                    Choose Make
                    </button>
                </div>
            </div>
        );
    }
}

export default MakeSelector;
