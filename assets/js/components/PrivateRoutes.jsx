import React, {useContext} from 'react';
import AuthContext from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";

const PrivateRoutes = ({path, component}) => {
    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated ? <Route path={path} component={component}/> : <Redirect to="/login"/>
};

export default PrivateRoutes;