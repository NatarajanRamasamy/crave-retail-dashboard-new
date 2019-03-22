import React from 'react';
import '../assets/css/vendors/bootstrap/bootstrap.css';
import '../assets/scss/main.scss';
import { Router, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../private_route/PrivateRoute';
import history from '../helpers/history';
import LogIn from './user_login/LogIn';
import ResetPassword from './user_login/ResetPassword';
import ResetNewPassword from './user_login/ResetNewPassword';
import Dashboard from './dashboard/Dashboard';
import UserManage from './user_manage/UserManage';
import Feedback from './feedback/Feedback';

const App = () => (
    <>
        <Router history={history}>
            <>
                <Route exact path="/" component={() => (<Redirect to="/login" />)} />
                <Route path="/login" component={LogIn} />
                <Route path="/password" component={ResetPassword} />
                <Route path="/password-reset/token" component={ResetNewPassword} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/user-manage" component={UserManage} />
                <PrivateRoute path="/feedback" component={Feedback} />
            </>
        </Router>
    </>
);

export default App;
