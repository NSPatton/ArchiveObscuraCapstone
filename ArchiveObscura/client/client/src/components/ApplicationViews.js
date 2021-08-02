import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import RecordList from "./records/RecordList";
import MyRecord from "./records/MyRecord";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <RecordList /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/myRecord">
                    {isLoggedIn ? <MyRecord /> : <Redirect to="/login" />}
                </Route>

                {/* <Route path="/add">
                    {isLoggedIn ? <CreateRecord /> : <Redirect to="/login" />}
                </Route> */}

                {/* <Route path="/edit">
                    {isLoggedIn ? <UpdateRecord /> : <Redirect to="/login" />}
                </Route> */}

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main >
    );
};