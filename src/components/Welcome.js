import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { getUser, getAvatar, getUserName } from '../utils'
import Avatar from './Avatar'
import { Button } from 'react-bootstrap'

class Welcome extends Component {
    handleLogout = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(''))
    }

    render() {
        const { authedUser, authedUserID } = this.props

        if(!this.props || this.props.authedUser === undefined) return null

        return (
            <Fragment>
                {authedUserID && (
                    <div className="welcome d-flex justify-content-end align-items-center">
                        <span>
                            Welcome,
                            <Avatar
                                className="welcome-avatar"
                                user={authedUser}
                            />
                            {getUserName(authedUser)}
                        </span>
                        <span>
                            <Button size="sm" onClick={this.handleLogout}>Logout</Button>
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
