export function saveUserToken(userToken) {
    localStorage.setItem("TOKEN", userToken);
}
export function getUserToken() {
    return localStorage.getItem("TOKEN");
}
export function clearUserToken() {
    return localStorage.removeItem("TOKEN");
}

export function saveEmail(email) {
    localStorage.setItem("Email", email);
}
export function getEmail() {
    return localStorage.getItem("Email");
}
export function clearEmail() {
    return localStorage.removeItem("Email");
}