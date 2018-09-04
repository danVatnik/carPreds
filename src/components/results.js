import React from 'react'
import Car from './car';

export default class Results extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }

        this.renderCar = this.renderCar.bind(this);
    }

    renderCar(){
        if(this.props.cars != null){
            return(this.props.cars.map(c =>{return(<Car carData={c}/>)}));
        }
        return(null);
    }

    render(){
        return(
            <div className="card">
                <div className="card-body">
                    {this.renderCar()}
                </div>
            </div>
        );
    }
}