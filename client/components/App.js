import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Login from './pages/public/Login';
import Admin from './pages/closed/Admin';
import AdminGivenReqs from './pages/closed/AdminGivenReqs';
import AdminNewReqs from './pages/closed/AdminNewReqs';
import AdminProcessReqs from './pages/closed/AdminProcessReqs';
import AdminReadyReqs from './pages/closed/AdminReadyReqs';
import Page404 from './pages/Page404';
import New from './pages/public/New';
//import Menu from './Menu';


import auth from './HOCs/auth';
import authadmin from './HOCs/authforadmin';

export default class App extends Component {
    render(){
        return (
            <div>
                <Route exact path="/" component={Login}/>
                <Route exact path="/new" component={auth(New)}/>
                <Route exact path="/admin" component={authadmin(Admin)}/>
                <Route exact path="/admin/newreqs" component={authadmin(AdminNewReqs)}/>
                <Route exact path="/admin/processreqs" component={authadmin(AdminProcessReqs)}/>
                <Route exact path="/admin/readyreqs" component={authadmin(AdminReadyReqs)}/>
                <Route exact path="/admin/givenreqs" component={authadmin(AdminGivenReqs)}/>
            </div>
        )
    }


}

