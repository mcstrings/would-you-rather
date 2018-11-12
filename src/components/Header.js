import React, { Component, Fragment } from 'react'
import Welcome from './Welcome'
import Navigation from './Navigation'

export default class Header extends Component {
    render() {
        return (
            <Fragment>
                <Welcome />
            </Fragment>
        )
    }
}
