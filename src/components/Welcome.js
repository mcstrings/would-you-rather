import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getUser, getUserName } from '../utils'
import Avatar from './Avatar'
import { Button } from 'react-bootstrap'
import { handleSetAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'
class Welcome extends Component {
    handleLogout = (e) => {
        e.preventDefault()
        const { dispatch, history } = this.props
        dispatch(handleSetAuthedUser(''))
        history.push("/")
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

export default withRouter(connect(mapStateToProps)(Welcome))
