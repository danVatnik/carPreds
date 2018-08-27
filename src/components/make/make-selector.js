import React, { Component } from 'react';

class MakeSelector extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if(this.props.chosenMakes != null && this.props.chosenMakes.length > 0){
            return (
                <div className="card">
                    <div className="card-header">
                        <div className="flex-header">
                            <h5 className="left-side-text mb-0">Make</h5>
                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#make-modal">
                                Edit
                            </button>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        {this.props.chosenMakes.map((make, item) => {return(<li className="list-group-item" key={item}>{make.name}</li>)})}
                    </ul>
                </div>
            );
        }
        else{
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
}

export default MakeSelector;
