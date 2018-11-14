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
import NewQuestion from './NewQuestion'
import { Route, withRouter } from 'react-router-dom'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Container className="App">
                <Navigation />
                {/* <Route path="/" component={Header} /> */}
                <h3 className="d-flex justify-content-center">Would you rather?</h3>
                <Route path="/" exact component={Login} />
                <Route path="/" exact component={Questions} />
                <Route path="/question-new" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />
            </Container>
        )
    }
}

export default withRouter(connect()(App))
