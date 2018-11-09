import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        return (
            <div className="navigation">
                <Link to="/">Home</Link> | <Link to="/question-detail">Add a Poll</Link> |
                <Link to="/leaderboard">Leaderboard</Link>
            </div>
        )
    }
}
