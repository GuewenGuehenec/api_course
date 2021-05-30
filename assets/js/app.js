// Les import importants
import '../styles/app.css';
import '../bootstrap';
import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom"
import CustomersPage from "./pages/CustomersPage";
import InvoicePage from "./pages/InvoicePage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI"
import AuthContext from "./contexts/AuthContext";
import PrivateRoutes from "./components/PrivateRoutes";
import CustomerPage from "./pages/CustomerPage";
import InvoicesPages from "./pages/InvoicesPages";
import RegisterPage from "./pages/RegisterPage";

// localhost:8000/#/customers

AuthAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    const NavbarWithRouter = withRouter(Navbar);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <HashRouter>
                <NavbarWithRouter/>

                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <PrivateRoutes path="/invoices/:id" component={InvoicePage}/>
                        <PrivateRoutes path="/invoices" component={InvoicesPages}/>
                        <PrivateRoutes path="/customers/:id" component={CustomerPage}/>
                        <PrivateRoutes path="/customers" component={CustomersPage}/>
                        <Route path="/" component={HomePage}/>

                        {/* Deuxième méthode pour la privatisation des routes */}
                        {/*<Route*/}
                        {/*    path="/customers"*/}
                        {/*    render={(props) => isAuthenticated ? (<CustomersPage {...props} />) : (<Redirect to="/login"/>)}/>*/}
                    </Switch>
                </main>

            </HashRouter>
        </AuthContext.Provider>

    );
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);
