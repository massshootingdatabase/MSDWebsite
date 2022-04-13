import { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = () => {
    return (
        <Route
            {...rest}
            render = {(props) =>
                localStorage.getItem("authToken") ? (
                    <Component {...props}/>
                ) :(
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default PrivateRoute