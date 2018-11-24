import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserName, getArrayFromObj } from '../utils'
import Avatar from './Avatar'
import { Card, ListGroup } from 'react-bootstrap'

class Leaderboard extends Component {
    getNumCreated = (user) => user.questions.length
    getNumAnswered = (user) => getArrayFromObj(user.answers).length
    getSum = (u) => this.getNumCreated(u) + this.getNumAnswered(u)

    sortUsersByNumQuestions = () => {
        const { users } = this.props
        // Users are ordered in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked.
        const sorted = getArrayFromObj(users).sort((a, b) => {
            const sum_a = this.getSum(a)
            const sum_b = this.getSum(b)

            return sum_b - sum_a
        })

        return sorted
    }

    render() {
        const { authedUserID } = this.props

        return (
            <Card className="mb-3 mx-3">
                <Card.Header>
                    <h4 className="mb-0">Leaderboard</h4>
                </Card.Header>
                <ListGroup className="leaderboard-user" variant="flush">
                    {this.sortUsersByNumQuestions().map((user) => (
                        <ListGroup.Item
                            key={user.id}
                            className={
                                authedUserID === user.id
                                    ? 'bg-primary currentUser'
                                    : ''
                            }
                        >
                            <Avatar
                                className="leaderboard-avatar lg"
                                user={user}
                            />
                            <div className="username">{getUserName(user)}</div>
                            <div className="asked">
                                <span className="callout">{this.getNumCreated(user)}</span> asked
                            </div>
                            <div className="answered">
                                <span className="callout">{this.getNumAnswered(user)}</span> answered
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUserID: authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Leaderboard))
