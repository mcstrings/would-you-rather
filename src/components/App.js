import React, { Component } from 'react'
// import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import { Route, withRouter } from 'react-router-dom'
import '../App.css'
import { handleInitialData } from '../actions/shared'
import Navigation from './Navigation'
import Login from './Login'
import Header from './Header'
import Questions from './Questions'
import Leaderboard from './Leaderboard'
import QuestionDetail from './QuestionDetail'
import NewQuestion from './NewQuestion'
import PageNotFound from './PageNotFound'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Container className="p-0 m-0">
                <Navigation />
                {/* <Route path="/" component={Header} /> */}
                <h3 className="d-flex justify-content-center">Would you rather?</h3>
                <Route path="/" exact component={Login} />
                <Route path="/" exact component={Questions} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/question-detail/:id" component={QuestionDetail} />
                {/* <Route path="*" component={PageNotFound} /> */}
            </Container>
        )
    }
}

export default withRouter(connect()(App))
