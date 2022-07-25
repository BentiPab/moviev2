import React from "react";
import { Route, RouteProps } from "react-router-dom";



const AuthenticatedRoute: React.FC<RouteProps> = ({ children, path, ...props }) => {


    return (
        <Route {...props} path={path}>
            {children}
        </Route>
    );
};

export default AuthenticatedRoute;
