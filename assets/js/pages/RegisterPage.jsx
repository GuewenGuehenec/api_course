import React, {useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import UsersApi from "../services/usersApi";


const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    // Gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        setUser({...user, [name]: value});
    };

    // Gestion de la soumission
    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {errors};
        if (user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme au mot de passe original"
            setErrors(apiErrors);
            return;
        }

        try {
            await UsersApi.register(user);
            // TODO : Flash success
            setErrors({});
            history.replace("/login");
        } catch (error) {
            const {violations} = error.response.data

            if (violations) {
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                })
                setErrors(apiErrors);
            }

            // TODO : flash errors
        }
    }

    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    label="Prénom"
                    placeHolder="Votre prénom"
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                />
                <Field
                    name="lastName"
                    label="Nom de fammile"
                    placeHolder="Votre nom de famille"
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />
                <Field
                    name="email"
                    label="Adresse email"
                    placeHolder="Votre adresse email"
                    type="email"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field
                    name="password"
                    label="Mot de passe"
                    placeHolder="Votre mot de passe"
                    type="password"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field
                    name="passwordConfirm"
                    label="Confirmation du mot de passe"
                    placeHolder="confirmer votre mot de passe"
                    type="password"
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Confirmation</button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                </div>
            </form>
        </>
    );
}

export default RegisterPage;