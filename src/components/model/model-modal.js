import React, { Component } from 'react';
import CheckBoxGrid from "../checkbox-grid";

class ModelModal extends Component {
    constructor(props) {
        super(props);
        this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
        this.submitToSection = this.submitToSection.bind(this);

        this.renderCheckBoxes = this.renderCheckBoxes.bind(this);

        this.state = { chosenModels: [] }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.modelsData != this.props.modelsData){
            if(this.props.modelsData == null || this.props.modelsData.length == 0 || this.state.chosenModels.length == 0){
                this.setState({ chosenModels: [] });
                this.props.submitHandler(newChosenModels);
                return;
            }

            let chosenModels = this.state.chosenModels;
            let newChosenModels = [];

            chosenModels.map(chosenModel => {
                this.props.modelsData.map(m => {
                        if(m.map(model => {return(model.value)}).includes(chosenModel.value)){
                            newChosenModels.push(chosenModel);
                        }
                });
            });

            this.setState({chosenModels: newChosenModels});
            
            this.props.submitHandler(newChosenModels);
        }
    }

    onCheckBoxClick(event){
        let chosenModels = this.state.chosenModels;
        if(event.target.checked){
            this.props.modelsData.map(m => {
                m.map(model => {if(model.value === event.target.value){
                    chosenModels.push(model);
                }})
            });
        }
        else{
            var index = chosenModels.findIndex(model => model.value === event.target.value);
            if (index > -1) {
              chosenModels.splice(index, 1);
              if(chosenModels.lengh == 0){
                  chosenModels = null;
              }
            }  
        }
        this.setState({ chosenModels:chosenModels });
    }

    submitToSection(){
        this.props.submitHandler(this.state.chosenModels);
    }


    renderCheckBoxes(){
        if(this.props.modelsData != null){
            return(
                this.props.modelsData.map((m, i) => {
                    return(<CheckBoxGrid key={i} data={m} nCol={3} onCheckBoxClick={this.onCheckBoxClick}/>);
                })
            );
        }
    }

    render() {
        return (
            <div className="modal fade" id="model-modal" tabindex="-1" role="dialog" aria-labelledby="model-modal-label" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="model-modal-label">Choose models</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="container">
                            {this.renderCheckBoxes()}
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

export default ModelModal;
