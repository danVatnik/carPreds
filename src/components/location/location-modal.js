import React from 'react';
import SectionModal from '../section-modal';

class LocationModal extends SectionModal {
    constructor(props) {
        super(props);

        this.handleZipChange = this.handleZipChange.bind(this);
        this.handleRadiusChange = this.handleRadiusChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.setSelectedRadius = this.setSelectedRadius.bind(this);

        this.state = {
          inputZip: null,
          inputRadius: null
        };
    }

    componentDidMount() {
        this.setState({
            inputZip: this.props.zip,
            inputRadius: this.props.radius
          });
    }


    submitHandler(evt) {
        evt.preventDefault();
        // pass the input field value to the event handler passed
        // as a prop by the parent (App)
        let radius = this.state.inputRadius;
        if(this.state.inputZip && !this.state.inputRadius){
            radius = this.props.radiusData[0].value;
        }
        this.props.sendDataToParent(this.state.inputZip, radius);
    }
    
    handleZipChange(event) {
        this.setState({
            inputZip: event.target.value
        });
    }
    
    handleRadiusChange(event) {
    this.setState({
        inputRadius: event.target.value
    });
    }

    setSelectedRadius(radius){
        if(this.props.radius){
            if(this.props.radius === radius.value){
                return("selected");
            }
        }
        else{
            return(null);
        }
    }

    render() {
        return (
            <div className="modal fade" id="location-modal" tabIndex="-1" role="dialog" aria-labelledby="location-modal-label" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="location-modal-label">Set Location</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="row justify-content-center">
                                    <div className="col-5">
                                        <div className="form-group">
                                            <label htmlFor="select-zip-form">Zip</label>
                                            <input type="text" 
                                                className="form-control" 
                                                id="select-zip-form" 
                                                name="inputZip" 
                                                onChange={this.handleZipChange}/>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="form-group">
                                            <label htmlFor="select-radius-form">Radius</label>
                                            <select 
                                                className="form-control" 
                                                id="select-radius-form" 
                                                name="inputRadius" 
                                                onChange={this.handleRadiusChange}>
                                                {this.props.radiusData.map((radius, index) => {return(<option key={index} selected={this.setSelectedRadius(radius)} value={radius.value}>{radius.name}</option>)})}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.submitHandler}>Done</button>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LocationModal;
