import React from 'react'

export default class Header extends React.Component{
    render(){
        return (
            <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img src="/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>
                Bootstrap
            </a>
            </nav>
        );
    }
}