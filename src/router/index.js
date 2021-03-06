import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import LandingPage from '../pages/landingpage'
import HubungiKami from '../pages/hubungikami'
import Bantuan from '../pages/bantuan'
import Daftar from '../pages/daftar'

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" component={ LandingPage } />
                <Route exact path="/hubungi-kami" component={ HubungiKami } />
                <Route exact path="/bantuan" component={ Bantuan } />
                <Route exact path="/daftar" component={ Daftar } />
                {/* <ProtectRegisterSuccess exact path="/sukses" component={ RegistrasiSukses } /> */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Router));