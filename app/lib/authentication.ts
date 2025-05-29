export const userTokenKey = 'USER_TOKEN'
export const userNameKey= 'USER_NAME'

export const isUserAuthenticated = () => {
    return localStorage.getItem(userTokenKey) != undefined
}

export const setUserAuthentication = (userToken: string) => {
    // store the user token in local storage
    localStorage.setItem(userTokenKey, userToken)
}

export const getUserAuthentication = () => {
    return localStorage.getItem(userTokenKey)
}

export const setUserName = (userName: string) => {
    // store the user token in local storage
    localStorage.setItem(userNameKey, userName)
}

export const getUserName = () => {
    return localStorage.getItem(userNameKey)
}

export const removeUserAuthentication = () => {
    localStorage.removeItem(userTokenKey)
    localStorage.removeItem(userNameKey)
}