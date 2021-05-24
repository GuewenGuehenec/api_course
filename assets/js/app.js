// Les import importants
import '../styles/app.css';
import '../bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route} from "react-router-dom"
import CustomersPage from "./pages/CustomersPage";
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";
import InvoicePage from "./pages/InvoicePage";

// localhost:8000/#/customers

const App = () => {
    return <HashRouter>
        <Navbar />

        <main className="container pt-5">
            <Switch>
                <Route path="/invoices" component={InvoicePage} />
                <Route path="/customers" component={CustomersPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </main>

        </HashRouter>;
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
