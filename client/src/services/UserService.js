import axios from 'axios';

export async function RegisterUser(user) {
    return await axios.post("http://localhost:8081/auth/register", user)
}

export async function LoginUser(user) {
    return await axios.post("http://localhost:8081/auth/login", user);
}