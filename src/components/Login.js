import React, { Component, Fragment } from 'react'

class Login extends Component {
    state = {

    }

    handleSelectUserChange = (e) => {
        this.setState({
            authedUserID: e.target.value
        })
    }

    render() {
        const { authedUserID, users, getUsersArray, handleSelectUserChange } = this.props

        return (
            <Fragment>
                <div>Login as</div>
                <select
                    value={authedUserID}
                    onChange={handleSelectUserChange}
                >
                    <option value="">Select a user login</option>
                    {users &&
                        getUsersArray().map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                </select>
            </Fragment>
        )
    }
}

export default Login
