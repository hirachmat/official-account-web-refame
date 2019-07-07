import React, { Component } from 'react'
import Parallax from '../../components/landing/Parallax'
import Manfaat from './manfaat'
import Fitur from './fitur'

class LandingPage extends Component {
    state = {

    }

    render() {
        return(
            <div>
                <Parallax />
                <Manfaat />
                <Fitur />
            </div>
        )
    }
}

export default LandingPage