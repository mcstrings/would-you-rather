import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getArrayFromObj, getUser } from '../utils'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { handleSetAuthedUser } from '../actions/authedUser'
import Avatar from './Avatar'
class Login extends Component {
    handleSelectUserChange = (value, e) => {
        const { dispatch, history } = this.props
        dispatch(handleSetAuthedUser(value))
        history.push("/")
    }

    render() {
        const { authedUserID, users, user } = this.props

        const title = user ? user.name : 'Select a user'

        return (
            <div>
                <span className="welcome d-inline-flex flex-nowrap justify-content-end align-items-center">Login to play as&nbsp;</span>

                <DropdownButton className="d-inline-flex" size="sm"
                    id="dropdown-users"
                    variant="success"
                    alignRight={true}
                    value={authedUserID}
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
                                <Dropdown.Item key={user.id} eventKey={user.id}>
                                    <Avatar className={"dropdown-user-avatar sm"} user={user} /> {user.name}
                                </Dropdown.Item>
                            ))}
                </DropdownButton>
            </div>
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
