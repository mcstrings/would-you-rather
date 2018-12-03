import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { withRouter } from 'react-router-dom'
import Welcome from './Welcome'
import { Navbar, Nav } from 'react-bootstrap'
import { getUser } from '../utils'

class Navigation extends Component {
    render() {
        const { authedUser } = this.props

        return (
            <Navbar variant="dark" bg="dark" collapseOnSelect expand="sm" className="mb-0">
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer exact={true} to="/">
                            <Nav.Link active={false} className="py-0">Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/add">
                            <Nav.Link active={false} className="py-0 text-nowrap">
                                New Question
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/leaderboard">
                            <Nav.Link active={false} className="py-0">Leaderboard</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                    {authedUser && <Welcome />}
                </Nav>
            </Navbar>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUser: getUser(authedUser, users),
        authedUserID: authedUser !== '' ? authedUser : undefined // This will make for a more straightforward conditional above
    }
}

export default withRouter(connect(mapStateToProps)(Navigation))