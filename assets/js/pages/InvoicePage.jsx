import React, {useState, useEffect} from 'react';
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Link} from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import InvoicesAPI from "../services/InvoicesAPI";


const InvoicePage = ({match, history}) => {

    const {id = "new"} = match.params;

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });

    const [customers, setCustomers] = useState([]);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    // Récupération des clients
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);
            if (!invoice.customer && id === "new") setInvoice({...invoice, customer: data[0].id});
            console.log(invoice);
        } catch (error) {
            console.log(error.response);
            history.replace("/invoices");
            // TODO : flash notification erreur
        }
    }

    // Récupération d'une facture
    const fetchInvoice = async id => {
        try {
            const {amount, status, customer} = await InvoicesAPI.find(id);
            setInvoice({amount, status, customer: customer.id});
            console.log(invoice);
        } catch (error) {
            // TODO : Notification erreurs
            history.replace("/invoices");
        }
    }

    // Récupération de la liste des clients à chaque chargement du composant
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Récupération de la bonne facture lorsque l'identifiant change
    useEffect(() => {
        console.log(id);
        if (id !== "new") {
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id]);


    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInvoice({...invoice, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if (editing) {
                await InvoicesAPI.update(id, invoice);
                // TODO : Flash Notification succes
            } else {
                await InvoicesAPI.create(invoice);
                // TODO : Flash Notification succes
                history.replace("/invoices");
            }
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                // Todo : flash de notification d'erreurs
            }
        }

    }

    return (
        <>
            {editing && <h1>Modification d'une facture</h1> || <h1>Création d'une facture</h1>}

            <form onSubmit={handleSubmit}>
                <Field
                    name="amount"
                    type="number"
                    placeHolder="Montant de la facture"
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                />
                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    {customers.map(customer =>
                        <option
                            key={customer.id}
                            value={customer.id}
                        >
                            {customer.firstName} {customer.lastName}
                        </option>
                    )}
                </Select>
                <Select
                    name="status"
                    label="Status"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}>
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className="btn btn-link">Retour aux factures</Link>
                </div>
            </form>
        </>
    );
}

export default InvoicePage;