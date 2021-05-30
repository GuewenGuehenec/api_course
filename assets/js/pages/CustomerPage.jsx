import React, {useState, useEffect} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";

import CustomersAPI from "../services/customersAPI";
import {toast} from "react-toastify";

const CustomerPage = ({match, history}) => {

    const {id = "new"} = match.params;

    if (id !== "new") {
        console.log(id);
    }

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    // Gestion des chagements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});
            if (editing) {
                await CustomersAPI.update(id, customer);
                toast.success("Le client a blien été modifié");
            } else {
                await CustomersAPI.create(customer);
                toast.success("Le client a blien été créé");
                history.replace("/customers")
            }
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire !");
            }
        }
    };

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const [editing, setEditing] = useState(false);

    // Récupération du customer en fonction de l'identifiant
    const fetchCustomer = async id => {
        try {
            const {firstName, lastName, email, company} = await CustomersAPI.find(id);
            setCustomer({firstName, lastName, email, company});
        } catch (error) {
            toast.error("Le client n'a pas pu être chargé !");
            history.replace("/customers");
        }
    }

    // Chargement du customer si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);


    return (
        <>
            {!editing && <h1>Création d'un client</h1> || <h1>Modification du client</h1>}

            <form onSubmit={handleSubmit}>
                <Field
                    name="lastName"
                    label="Nom de famille"
                    placeHolder="Nom de famille du client"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="firstName"
                    label="Prénom"
                    placeHolder="Prénom du client"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field
                    name="email"
                    label="Email"
                    placeHolder="Adresse email du client"
                    type="email"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field
                    name="company"
                    label="Entreprise"
                    placeHolder="Entreprise du client"
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>
        </>
    );
};

export default CustomerPage;