import React, { Component } from 'react'
// import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.css'
import { _getUsers, _getQuestions } from './api/_DATA'
import { handleInitialData } from './actions/shared'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import Login from './components/Login'
class App extends Component {
    state = {
        users: undefined,
        questions: undefined,
        authedUserID: '',
        showAnswered: false
    }

    componentDidMount() {
        this.props.dispatch(handleInitialData())

        // Call users
        _getUsers().then((users) => {
            this.setState({
                users
            })
        })

        _getQuestions().then((questions) => {
            this.setState({
                questions
            })
        })
    }

    handleSelectUserChange = (e) => {
        this.setState({
            authedUserID: e.target.value
        })
    }

    getUsersArray = () => {
        const { users } = this.state
        return Object.keys(users).map((key) => users[key])
    }

    getQuestionsArray = () => {
        const { questions } = this.state
        return Object.keys(questions).map((key) => questions[key])
    }

    getFilteredQuestions = (showAnswered = false) => {
        const questions = this.getQuestionsArray()

        const filteredQuestions = questions.filter(
            (question) =>
                showAnswered ===
                (this.hasauthedUserAnswered(question.optionOne) ||
                    this.hasauthedUserAnswered(question.optionTwo))
        )

        return filteredQuestions
    }

    getUser = (userID) => {
        const { users } = this.state
        const user = users[userID]
        return user ? user : undefined
    }

    isauthedUser = () => {
        return this.state.authedUserID !== ''
    }

    getAvatar = (userID) => {
        if (userID === '') return
        const user = this.getUser(userID)
        return user ? user.avatarURL : ''
    }

    getUserName = (userID) => {
        if (userID === '') return
        const user = this.getUser(userID)
        return user ? user.name : ''
    }

    hasauthedUserAnswered = (option) => {
        const { authedUserID } = this.state
        return option.votes.includes(authedUserID)
    }

    getOptionCheckbox = (option) => {
        return this.hasauthedUserAnswered(option) ? (
            <MdCheckBox className="option-checkbox checked" />
        ) : (
            <MdCheckBoxOutlineBlank className="option-checkbox" />
        )
    }

    handleFilterClick = (e, showAnswered) => {
        this.setState({
            showAnswered
        })
    }

    handleLogout = (e) => {
        e.preventDefault()

        this.setState({
            authedUserID: ''
        })
    }

    render() {
        const { authedUserID, users, questions, showAnswered } = this.state

        return (
            <div className="App">
                <div className="page-title">Would you rather?</div>

                <Login
                    authedUserID={this.state.authedUserID}
                    users={this.state.users}
                    getUsersArray={this.getUsersArray}
                    handleSelectUserChange={this.handleSelectUserChange}
                />

                {/* HOME PAGE */}
                <div>
                    {/* WELCOME */}
                    {this.isauthedUser(authedUserID) && (
                        <div className="welcome">
                            <span>
                                Welcome,
                                <img
                                    src={this.getAvatar(authedUserID)}
                                    alt={this.getUserName(authedUserID)}
                                    className="welcome-avatar"
                                />
                                {this.getUserName(authedUserID)}
                            </span>
                            <span>
                                <a
                                    className="logout"
                                    onClick={this.handleLogout}
                                >
                                    Logout
                                </a>
                            </span>
                        </div>
                    )}

                    {/* NAVIGATION */}
                    <div className="navigation">
                        Home | Add a Poll | Leaderboard
                    </div>

                    {/* QUESTIONS LIST */}
                    <div className="poll card">
                        <div className="poll-title">Questions</div>
                        <div className="navigation">
                            <button
                                onClick={(e) =>
                                    this.handleFilterClick(e, false)
                                }
                                value="1"
                                className={
                                    'btnFilter' +
                                    (showAnswered ? ' active' : ' inactive')
                                }
                            >
                                Unanswered
                            </button>{' '}
                            |{' '}
                            <button
                                onClick={(e) => this.handleFilterClick(e, true)}
                                value="0"
                                className={
                                    'btnFilter' +
                                    (showAnswered ? ' inactive' : ' active')
                                }
                            >
                                Answered
                            </button>
                        </div>
                        {questions &&
                            this.getFilteredQuestions(showAnswered).map(
                                (question) => (
                                    // QUESTION
                                    <div className="question" key={question.id}>
                                        <div>
                                            {this.getOptionCheckbox(
                                                question.optionOne
                                            )}
                                            {question.optionOne.text}
                                        </div>
                                        <div className="faded-text">or</div>
                                        <div>
                                            {this.getOptionCheckbox(
                                                question.optionTwo
                                            )}
                                            {question.optionTwo.text}
                                        </div>
                                    </div>
                                )
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUserID }) {
    return {
        // loading: authedUserID === null
    }
}

export default connect(mapStateToProps)(App)
