import React, { Component } from 'react';

class ModelSelector extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if(this.props.chosenModels != null && this.props.chosenModels.length > 0){
            return (
                <div className="card">
                    <div className="card-header">
                        <div className="flex-header">
                            <h5 className="left-side-text mb-0">Make</h5>
                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#model-modal">
                                Edit
                            </button>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        {this.props.chosenModels.map((model, item) => {return(<li className="list-group-item" key={item}>{model.name}</li>)})}
                    </ul>
                </div>
            );
        }
        else{
            return (
                <div className="card">
                    <h5 className="card-header">Model</h5>
                    <div className="card-body">
                        <button type="button" className="btn btn-primary center-block" data-toggle="modal" data-target="#model-modal">
                        Choose Model
                        </button>
                    </div>
                </div>
            );
        }
    }
}

export default ModelSelector;
