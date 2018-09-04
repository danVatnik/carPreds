import React, { Component } from 'react';

class Car extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                <div className="row">
                    <div className="col-5">
                        <img src={this.props.carData.imageURL} className="img-fluid" alt="Responsive image" height="175" width="350" />
                    </div>
                    <div className="col-7">
                    <div className="flex-header">
                    <div className="left-side-text col-8">
                        <a href={`https://autotrader.com${this.props.carData.vdpSeoUrl}`} target="_blank">
                            <h5>{this.props.carData.title}</h5>
                        </a>
                    </div>
                        <div className="col-4">
                        <h5>{this.props.carData.derivedPrice}</h5>
                        <h5>${Math.round(this.props.carData.gain).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h5>     
                        </div>
                    </div>
                        <br/>
                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                <td>Mileage</td>
                                <td>{this.props.carData.maxMileage}</td>
                                </tr>
                                <tr>
                                <td>Engine</td>
                                <td>{this.props.carData.engine}</td>
                                </tr>
                                <tr>
                                <td>Trim</td>
                                <td>{this.props.carData.trim}</td>
                                </tr>
                                <tr>
                                <td>Drive Type</td>
                                <td>{this.props.carData.driveType}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Car;
