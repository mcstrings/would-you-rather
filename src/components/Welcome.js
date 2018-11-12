import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { getUser, getAvatar, getUserName } from '../utils'
import Avatar from './Avatar'

class Welcome extends Component {
    handleLogout = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(''))
    }

    render() {
        const { authedUser, authedUserID } = this.props

        return (
            <Fragment>
                {authedUserID && (
                    <div className="welcome">
                        <span>
                            Welcome,
                            <Avatar
                                className="welcome-avatar"
                                user={authedUser}
                            />
                            {getUserName(authedUser)}
                        </span>
                        <span>
                            <a className="logout" onClick={this.handleLogout}>
                                Logout
                            </a>
                        </span>
                    </div>
                )}
            </Fragment>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUser: getUser(authedUser, users),
        authedUserID: authedUser !== '' ? authedUser : undefined // This will make for a more straightforward conditional above
    }
}

export default connect(mapStateToProps)(Welcome)
