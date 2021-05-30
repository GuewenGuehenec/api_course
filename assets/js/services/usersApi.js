import axios from "axios";

function register(user) {
    return axios.post("http://localhost:8888/api/users", user);
}

export default {
    register
}