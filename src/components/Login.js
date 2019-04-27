import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Container } from 'react-bootstrap'
import { getArrayFromObj, getUser } from '../utils'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { authedUserAction } from '../store/authedUser'
import Avatar from './Avatar'
class Login extends Component {
    state = {
        redirectToReferrer: false
    }

    handleSelectUserChange = async (value) => {
        const { dispatch } = this.props
        await dispatch(authedUserAction(value))
        this.setState({
            redirectToReferrer: true
        })
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" }}
        const { users, user } = this.props
        const { redirectToReferrer } = this.state

        if(redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        const title = user ? user.name : 'Log in as '

        const logoImg = user ? user.bigAvatarURL : "https://api.adorable.io/avatars/285/abott@adorable.png"

        return (
            <Container>
                <Card>
                    <Card.Body className="text-center">
                        <div className="logo">
                            <div className="question-mark left">?</div>
                            <div className="question-mark right">?</div>
                            <img
                                alt="logo"
                                className="login-face m-3"
                                src={logoImg}
                            />
                        </div>

                        <DropdownButton
                            id="dropdown-users"
                            variant="success btn-lg"
                            alignRight={true}
                            title={title}
                            onSelect={this.handleSelectUserChange}
                        >
                            {users &&
                                getArrayFromObj(users)
                                    .sort((a, b) => {
                                        const nameA = a.name.toUpperCase()
                                        const nameB = b.name.toUpperCase()
                                        return nameA < nameB
                                            ? -1
                                            : nameA > nameB
                                            ? 1
                                            : 0
                                    })
                                    .map((user) => (
                                        <Dropdown.Item
                                            active={false}
                                            key={user.id}
                                            eventKey={user.id}
                                        >
                                            <Avatar
                                                className={
                                                    'dropdown-user-avatar sm'
                                                }
                                                user={user}
                                            />{' '}
                                            {user.name}
                                        </Dropdown.Item>
                                    ))}
                        </DropdownButton>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        authedUserID: authedUser,
        user: getUser(authedUser, users),
        users
    }
}

export default withRouter(connect(mapStateToProps)(Login))
