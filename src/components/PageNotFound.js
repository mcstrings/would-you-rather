import React from 'react'
import { Jumbotron } from 'react-bootstrap'

const PageNotFound = () => {
    return (
        <Jumbotron className="m-3">
            <span className="text-danger">Error</span>{' '}
            <span className="display-1 text-danger">404</span>
            <hr />
            <p className="display-4">
                There was an error getting the requested URL.
            </p>
        </Jumbotron>
    )
}

export default PageNotFound
