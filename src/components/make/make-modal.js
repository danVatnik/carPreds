import React from 'react';
import CheckBoxGrid from '../checkbox-grid';
import SectionModal from '../section-modal';

class MakeModal extends SectionModal {
    constructor(props) {
        super(props);
        this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
        this.submitToSection = this.submitToSection.bind(this);
        this.state = { chosenMakes: [] }
    }

    onCheckBoxClick(event){
        let chosenMakes = this.state.chosenMakes;
        if(event.target.checked){
            chosenMakes.push({value:event.target.value, name: event.target.name})
        }
        else{
            var index = this.findWithAttr(chosenMakes, "value", event.target.value);
            if (index > -1) {
              chosenMakes.splice(index, 1);
              if(chosenMakes.lengh == 0){
                  chosenMakes = null;
              }
            }  
        }
        this.setState({ chosenMakes:chosenMakes });
    }

    submitToSection(){
        this.props.submitHandler(this.state.chosenMakes);
    }

    render() {
        return (
            <div className="modal fade" id="make-modal" tabindex="-1" role="dialog" aria-labelledby="make-modal-label" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="make-modal-label">Choose makes</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="container">
                            <CheckBoxGrid data={this.props.makeData} nCol={3} onCheckBoxClick={this.onCheckBoxClick}/>
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.submitToSection}>Done</button>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MakeModal;
