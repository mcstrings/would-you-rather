import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Welcome from './Welcome'
import { Container, Col, Navbar, Nav, NavItem, Row } from 'react-bootstrap'

export default class Navigation extends Component {
    render() {
        return (
            <Navbar className="mb-4">
                <Container>
                    <Row className="w-100">
                        <Col>
                            <Nav navbar>
                                <LinkContainer exact to="/">
                                    <Nav.Link className="py-0">Home</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/question-detail">
                                    <Nav.Link className="py-0 text-nowrap">Add a Poll</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="leaderboard">
                                    <Nav.Link className="py-0">Leadboard</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Col>
        
                        <Col className="ml-auto">
                            <Nav className="d-flex justify-content-end mt-2">
                                <Welcome />
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        )
    }
}
