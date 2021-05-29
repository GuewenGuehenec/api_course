import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 * Requête HTTP d'authentification et stockage du token dans le storage et sur axios
 * @param credentials
 * @returns {Promise<boolean>}
 */
function authenticate(credentials) {
    return axios
        .post("http://localhost:8888/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            // Je stocke le token dans mon localStorage
            window.localStorage.setItem("authToken", token);
            // On prévient Axios qu'on a maintenant un header par défaut sur toutes nos futures requêtes HTTP
            setAxiosToken(token);
            return true;
        });
}

/**
 * Déconnexion (suppression du token du local storage et sur axios)
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Positionne le token JWT sur axios
 * @param token
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place du token lors du chargement de l'application
 */
function setup() {
    // 1. Voir si on as un token
    const token = window.localStorage.getItem("authToken");
    // 2. Si le token est encore valide
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }
}

/**
 * Permet de savoir si on est authentifié ou pas
 * @returns {boolean}
 */
function isAuthenticated() {
    // 1. Voir si on as un token
    const token = window.localStorage.getItem("authToken");
    // 2. Si le token est encore valide
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        return expiration * 1000 > new Date().getTime();
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};