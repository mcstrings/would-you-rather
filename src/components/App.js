import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import '../App.css'
import { handleInitialData } from '../actions/shared'
import Navigation from './Navigation'
import Questions from './Questions'
import Leaderboard from './Leaderboard'
import QuestionDetail from './QuestionDetail'
import NewQuestion from './NewQuestion'
import PageNotFound from './PageNotFound'
import Login from './Login'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { authedUser } = this.props

        return (
            <Container fluid className="px-0 pb-1 mx-0">
                <Navigation />
                <LoadingBar className="loading" showFastActions />

                <h3 className="d-flex justify-content-center text-white mt-2">
                    Would you rather?
                </h3>

                <Switch>
                    <PrivateRoute
                        path="/"
                        exact
                        component={Questions}
                        authedUser={authedUser}
                    />
    
                    <Route path="/login" component={Login} />
    
                    <PrivateRoute
                        path="/add"
                        component={NewQuestion}
                        authedUser={authedUser}
                    />
    
                    <PrivateRoute
                        path="/leaderboard"
                        component={Leaderboard}
                        authedUser={authedUser}
                    />
    
                    {/* TODO: The path should be questions/:question_id */}
                    <PrivateRoute
                        path="/questions/:question_id"
                        component={QuestionDetail}
                        authedUser={authedUser}
                    />
    
                    <Route path="/404" component={PageNotFound} />

                    <Route component={PageNotFound} />
                </Switch>
            </Container>
        )
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                const { authedUser } = { ...rest }

                return typeof authedUser === 'string' &&
                    authedUser.length > 0 ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }}
        />
    )
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(App))
