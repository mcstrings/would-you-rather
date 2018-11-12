import React, { Component } from 'react'
// import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import '../App.css'
import { handleInitialData } from '../actions/shared'
import Navigation from './Navigation'
import Login from './Login'
import Header from './Header'
import Questions from './Questions'
import Leaderboard from './Leaderboard'
import QuestionDetail from './QuestionDetail'
import CreateQuestion from './CreateQuestion'
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Container className="App">
                <Navigation />
                {/* <Route path="/" component={Header} /> */}
                <div className="page-title">Would you rather?</div>
                <Route path="/" exact component={Login} />
                <Route path="/" exact component={Questions} />
                <Route path="/question-detail" component={QuestionDetail} />
                <Route path="/leaderboard" component={Leaderboard} />
            </Container>
        )
    }F
}

export default withRouter(connect()(App))
