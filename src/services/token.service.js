class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.token;
    }

    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.token = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }

    getUserRole() {
        const user = JSON.parse(localStorage.getItem("user"));
        // TODO: Fix role/user checking
        return "ROLE_ADMIN";// user?.roles[0];
    }
}

export default new TokenService();
