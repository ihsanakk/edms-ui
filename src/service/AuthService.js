import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                username: user.username,
                password: user.password
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'register', {
            username: user.username,
            email: user.email,
            password: user.password,
            name : user.name,
            lastname: user.lastname,
            department: user.department
        });
    }
}

export default new AuthService();
