import axios from 'axios';

const API_URL = process.env.API_BASE_URL

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'auth/login', {
                username: user.username,
                password: user.password
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'auth/register', {
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
