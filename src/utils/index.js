export const getUser = (userID = '', users) => {
    const user = users[userID]
    return user ? user : undefined
}

export const getAvatar = (user) => {
    return user ? user.avatarURL : ''
}

export const getUserName = (user, otherID) => {
    const id = user ? user.id : null

    if (id && otherID && id === otherID) {
        return 'You'
    } else {
        return user ? user.name : ''
    }
}

export const getArrayFromObj = (obj) => {
    return Object.keys(obj).map((key) => obj[key])
}

export const isAuthedUsersAnswer = (option, authedUserID = '') => {
    return option.votes.includes(authedUserID)
}

export const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const isValidUserID = (userID) => {
    return !(isEmptyObj(userID) || userID === '')
}
