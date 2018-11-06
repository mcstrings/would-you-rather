export const getUser = (userID = '', users) => {
    const user = users[userID]
    return user ? user : undefined
}

// TODO: Make into component for different presentations
export const getAvatar = (user) => {
    return user ? user.avatarURL : ''
}

export const getUserName = (user) => {
    return user ? user.name : ''
}

export const getArrayFromObj = (obj) => {
    return Object.keys(obj).map((key) => obj[key])
}
