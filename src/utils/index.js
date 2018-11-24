export const getUser = (userID = '', users) => {
    const user = users[userID]
    return user ? user : undefined
}

export const getAvatar = (user) => {
    return user ? user.avatarURL : ''
}

export const getUserName = (user) => {
    return user ? user.name : ''
}

export const getArrayFromObj = (obj) => {
    return Object.keys(obj).map((key) => obj[key])
}

export const isAuthedUsersAnswer = (option, authedUserID = "") => {
    return option.votes.includes(authedUserID)
}