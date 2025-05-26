export const userTokenKey = 'USER_TOKEN'

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