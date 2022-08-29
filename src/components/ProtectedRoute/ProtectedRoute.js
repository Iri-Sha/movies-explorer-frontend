import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({loggedIn, children, ...props}) => {
    console.log(loggedIn);
    return (
        <Route {...props}>{loggedIn === false ? <Redirect to="/" /> : children}</Route>
    )
};

export default ProtectedRoute;