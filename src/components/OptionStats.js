import React, { Component } from 'react'
import { getArrayFromObj } from '../utils'

export default class OptionStats extends Component {
    render() {
        const { option, users } = this.props

        const totalNumPeople = getArrayFromObj(users).length
        const numOptionVotes = option.votes.length

        const percentage = Math.floor((100 * numOptionVotes) / totalNumPeople)

        return (
            <ul>
                {/* TODO: Stats
                        the number of people who voted for that option
                        the percentage of people who voted for that option */}
                <li className="asked">
                    {totalNumPeople}{' '}
                    {totalNumPeople > 1 || totalNumPeople === 0
                        ? 'people have '
                        : 'person has '}{' '}
                    answered this question.
                </li>
                <li className="answered">
                    {percentage}% of people have answered
                </li>
            </ul>
        )
    }
}
