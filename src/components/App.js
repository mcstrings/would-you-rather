import React, { Component } from 'react'
// import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import '../App.css'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Welcome from './Welcome'
import Navigation from './Navigation'
import Questions from './Questions'
import Leaderboard from './Leaderboard';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <div className="App">
                <div className="page-title">Would you rather?</div>

                <Login />

                {/* WELCOME */}
                <Welcome />

                {/* NAVIGATION */}
                <Navigation />

                {/* QUESTIONS LIST */}
                <Questions />

                {/* LEADERBOARD */}
                <Leaderboard />
            </div>
        )
    }
}

export default connect()(App)
