import React from "react";
import { Route } from "react-router";
import LoginRequired from "../routes/LoginRequired";
import TitleRoute from "./TitleRoute";

interface IProps {
    [key : string] : any;
}

//A protected route should only let the user through if a condition is met
//Otherwise display the login required screen
export default function ProtectedRoute(props : IProps) {
    if(props.allowedCondition) {
        return <TitleRoute {...props}/>
    }
    return <LoginRequired />
}