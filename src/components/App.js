import React, { Component } from 'react'
// import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import '../App.css'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Welcome from './Welcome'
import Navigation from './Navigation'
import Questions from './Questions'
import Leaderboard from './Leaderboard'
import QuestionDetail from './QuestionDetail'
import CreateQuestion from './CreateQuestion'
import { Route, Link } from 'react-router-dom'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <div className="App">
                <div className="page-title">Would you rather?</div>
                <Route path="/" exact component={Login} />
                <Welcome />
                <Navigation />
                <Questions />

                <Route path="/question-detail" component={QuestionDetail} />
                <Route path="/leaderboard" component={Leaderboard} />
            </div>
        )
    }
}

export default connect()(App)
