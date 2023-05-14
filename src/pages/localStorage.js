export function saveUserToken(userToken) {
    localStorage.setItem("TOKEN", userToken);
}
export function getUserToken() {
    return localStorage.getItem("TOKEN");
}
export function clearUserToken() {
    return localStorage.removeItem("TOKEN");
}

export function setUserEmail(userEmail){
    localStorage.setItem("email", userEmail.toLowerCase());
}

export function getUserEmail(){
    return localStorage.getItem("email");
}

export function clearUserEmail() {
    return localStorage.removeItem("email");
}

export function setUserAuth(){
    if (getUserEmail()==="royalmotorslb@gmail.com" && getUserToken()!=null){
        localStorage.setItem("role", "admin");
    }else{
    localStorage.setItem("role", "user");
    }
}

export function getUserAuth(){
    return localStorage.getItem("role");
}

export function clearUserAuth() {
    return localStorage.removeItem("role");
}

export function reload(){
    setTimeout(() => {
        window.location.reload();
      }, 1000);

}

