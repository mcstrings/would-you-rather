import React, { Component } from 'react'
import { getAvatar, getUserName } from '../utils'

export default class Avatar extends Component {
    render() {
        const { user, className = '' } = this.props

        return (
            <img
                src={getAvatar(user)}
                alt={getUserName(user)}
                className={className}
            />
        )
    }
}
