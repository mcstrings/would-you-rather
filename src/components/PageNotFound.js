import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

export default class PageNotFound extends Component {
    render() {
        return (
            <Jumbotron className="m-3">
                <span className="text-danger">Error</span>{' '}
                <span className="display-1 text-danger">404</span>
                <hr />
                <p className="display-4">
                    You have to be logged in to view this page.
                </p>
            </Jumbotron>
        )
    }
}
