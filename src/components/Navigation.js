import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Welcome from './Welcome'
import { Navbar, Nav } from 'react-bootstrap'

export default class Navigation extends Component {
    render() {
        return (
            <Navbar variant="dark" bg="dark" collapseOnSelect expand="sm">
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="text-light">
                        <LinkContainer exact to="/">
                            <Nav.Link className="py-0">Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/add">
                            <Nav.Link className="py-0 text-nowrap">
                                New Question
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/leaderboard">
                            <Nav.Link className="py-0">Leaderboard</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                    <Welcome />
                </Nav>
            </Navbar>
        )
    }
}
