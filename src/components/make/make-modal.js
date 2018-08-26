import React, { Component } from 'react';

class MakeModal extends Component {
    constructor(props) {
        super(props);
        this.renderCheckBoxGrid = this.renderCheckBoxGrid.bind(this);
        this.renderCheckBoxRow = this.renderCheckBoxRow.bind(this);
        this.renderCheckBox = this.renderCheckBox.bind(this);   
    }
    
    renderCheckBox(item, index){
        return(
            <div key={index} class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="check"{...item.name} />
                <label class="form-check-label" for="defaultCheck1">
                    {item.name}
                </label>
            </div>
        );
    }

    renderCheckBoxRow(data, colsize){
        return(
            data.map((item, i) =>{return(<div className={colsize}>{this.renderCheckBox(item, i)}</div>)})
        );
    }

    renderCheckBoxGrid(){
        let ncol = 3;
        let nRows = Math.ceil(this.props.makeData / ncol);
        let colsize = "col-" + 12 / ncol;
        let c = [];
        for (let i = 0; i < this.props.makeData.length; i=i+ncol) {
            if(i%ncol == 0){
                c.push(    
                    <div className="row">{this.renderCheckBoxRow(this.props.makeData.slice(i, i + ncol), colsize)}</div>
                );
            }   
        }
        return(c)
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
                            {this.renderCheckBoxGrid()}
                        </div>
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

export default MakeModal;
