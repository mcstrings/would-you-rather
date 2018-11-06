import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser, getUserName, getArrayFromObj } from '../utils'
import Avatar from './Avatar'

// The Leaderboard is available at/leaderboard.
// Each entry on the leaderboard contains the following:
// the user’s name;
// the user’s picture;
// the number of questions the user asked; and
// the number of questions the user answered.
// Users are ordered in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked.

class Leaderboard extends Component {
    getNumCreated = (user) => {
        return user.questions.length
    }

    getNumAnswered = (user) => {
        return getArrayFromObj(user.answers).length
    }

    sortUsersByNumQuestions = () => {
        const { users } = this.props
        // Users are ordered in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked.

        getArrayFromObj(users).map((user) => {
            const sum = this.getNumCreated(user) + this.getNumAnswered(user)
            console.log('sum', sum)
        })

        const sorted = getArrayFromObj(users).sort((a, b) => {
            const sum_a = this.getNumCreated(a) + this.getNumAnswered(a)
            const sum_b = this.getNumCreated(b) + this.getNumAnswered(b)

            return sum_b - sum_a
        })

        console.log('sorted', sorted)
        return sorted
    }

    render() {
        const { authedUser, authedUserID, users, questions } = this.props

        return (
            <ul className="leaderboard-user">
                {this.sortUsersByNumQuestions().map((user) => (
                    <li
                        key={user.id}
                        className={authedUserID === user.id ? 'currentUser' : ''}
                    >
                        <Avatar className="leaderboard-avatar" user={user} />
                        <div class="username">{getUserName(user)}</div>
                        <div className="asked">
                            {this.getNumCreated(user)} asked
                        </div>
                        <div className="answered">
                            {this.getNumAnswered(user)} answered
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
}

const mapStateToProps = ({ authedUser, users, questions }) => {
    return {
        authedUserID: authedUser,
        authedUser: getUser(authedUser, users),
        users,
        questions
    }
}

export default connect(mapStateToProps)(Leaderboard)
