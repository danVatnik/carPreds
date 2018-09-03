import React, { Component } from 'react';

class CheckBoxGrid extends Component {
    constructor(props) {
        super(props);
        this.renderCheckBoxGrid = this.renderCheckBoxGrid.bind(this);
        this.renderCheckBoxRow = this.renderCheckBoxRow.bind(this);
        this.renderCheckBox = this.renderCheckBox.bind(this);   
    }
    
    renderCheckBox(item, index){
        const name = "check-" + item.value;
        return(
            <div key={index} className="form-check">
                <input className="form-check-input" type="checkbox" name={item.name} value={item.value} id={name}  onClick={this.props.onCheckBoxClick} />
                <label className="form-check-label" htmlFor={name}>
                    {item.name}
                </label>
            </div>
        );
    }

    renderCheckBoxRow(data, colsize){
        return(
            data.map((item, i) =>{return(<div className={colsize} key={i}>{this.renderCheckBox(item, i)}</div>)})
        );
    }

    renderCheckBoxGrid(){
        if(this.props.data == null){
            return(null);
        }

        let ncol = this.props.nCol;
        let nRows = Math.ceil(this.props.data.length / ncol);
        let colsize = "col-" + 12 / ncol;
        let grid = [];
        for (let i = 0; i < this.props.data.length; i=i+ncol) {
            if(i%ncol == 0){
                grid.push(    
                    <div className="row" key={i}>{this.renderCheckBoxRow(this.props.data.slice(i, i + ncol), colsize)}</div>
                );
            }   
        }
        return(grid)
    }

    render() {
        return (
            <div>
                {this.renderCheckBoxGrid()}
            </div>
        );
    }
}

export default CheckBoxGrid;
