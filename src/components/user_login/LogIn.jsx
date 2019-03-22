import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmail, isEmpty } from 'validator';
import { BeatLoader } from 'react-spinners';
import {
    REQUIRED,
    INVALID,
} from '../../constants/form.constants';
import alertActions from '../../actions/alert.actions';
import userActions from '../../actions/user.actions';

class LogIn extends Component {
    constructor(props) {
        super(props);
        // reset login status
        this.state = {
            username: '',
            password: '',
            errors: {
                username: '',
                password: '',
            },
            loading: false,
            updated: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

    // component Did Mount
    componentDidMount() {
        document.title = 'Crave Retail | Login';
    }

    componentDidUpdate() {
        const { updated } = this.state;
        const { alert, authentication } = this.props;
        const { message } = alert;
        const { isMaxLoginCountReached } = authentication;
        if (updated && message === 'Unauthorized') {
            this.setState({
                password: '',
                updated: false,
            });
        }
        if (updated && isMaxLoginCountReached) {
            this.setState({
                password: '',
                username: '',
                updated: false,
            });
        }
    }

    // onchange input fields
    handleChange(e) {
        const { name, value } = e.target;
        const { dispatch } = this.props;
        dispatch(alertActions.clear());
        this.setState(prevState => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                [name]: this.validate(name, value),
            },
        }));
    }

    // submit login form
    handleSubmitLogin(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const { dispatch } = this.props;
        this.setState({
            errors: {
                username: this.validate('username', username),
                password: this.validate('password', password),
            },
            loading: true,
            updated: true,
        });
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    // validations for input fields
    validate(name, value) {
        switch (name) {
        case 'username':
            if (isEmpty(value)) {
                return REQUIRED('Email');
            }
            if (!isEmail(value)) {
                return INVALID('Email');
            }
            return '';

        case 'password':
            if (isEmpty(value)) {
                return REQUIRED('Password');
            }
            // if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
            //     return 'Invalid Password';
            // }
            return '';

        default:
            return '';
        }
    }

    render() {
        const {
            username, password, errors, loading,
        } = this.state;
        const { authentication, alert } = this.props;
        const { isMaxLoginCountReached } = authentication;
        let errorMsg = '';
        if (alert.message === 'Unauthorized') {
            // errorMsg = "Please enter a valid UserName/Password";
            errorMsg = "The email and password combo you provided didn't match what we have on file. Please try again.";
        } else {
            errorMsg = '';
        }

        return (
            <div>
                <div className="container-fill bg-light login-page align-items-center justify-content-center">
                    <div className="login-container d-flex flex-column flex-md-row">
                        <div className="login-brand-con d-flex flex-column">
                            <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                                <img src="/img/logo.png" className="brand-icon" alt="" />
                            </div>
                            <div className="login-footer align-items-center justify-content-center d-none d-md-flex">
                                Copyright © 2019
                            </div>
                        </div>
                        <div className="login-form-con d-flex flex-column">
                            <div className="login-form-header d-flex align-items-center">
                                <h1>Login</h1>
                            </div>
                            <div className="login-form-body d-flex flex-grow-1 align-items-center">
                                <form className="flex-grow-1" action="" onSubmit={this.handleSubmitLogin}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className={errors.username ? 'form-control input-error' : 'form-control'} id="email" placeholder="Enter your email Id" value={username} name="username" onChange={this.handleChange} disabled={isMaxLoginCountReached} />
                                        <div className="error-block">{errors.username}</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Password</label>
                                        <input type="password" className={errors.password ? 'form-control input-error' : 'form-control'} id="pwd" placeholder="Enter your password" name="password" value={password} onChange={this.handleChange} autoComplete="off" disabled={isMaxLoginCountReached} />
                                        <div className="error-block">{errors.password}</div>
                                    </div>
                                    <div className="form-group d-flex align-items-md-center justify-content-between login-actions flex-column flex-md-row">
                                        <Link to="/password" className="link-primary link-underline mb-2 mb-md-0">
                                            Forgot Password ?
                                        </Link>
                                        {
                                            (errors.username || errors.password) ? <button type="button" className="btn btn-primary login-btn">Login</button>
                                                : (loading && authentication.loader) ? (
                                                    <button className="btn btn-primary login-btn" type="button">
                                                        {/* loader */}
                                                        {/* eslint-disable-next-line react/jsx-boolean-value */}
                                                        <BeatLoader sizeUnit="px" size={11} color="#7f869c" loading={true} />
                                                    </button>
                                                )
                                                    : <button type="submit" className="btn btn-primary login-btn">Login</button>
                                        }
                                    </div>
                                    {
                                        errorMsg && !isMaxLoginCountReached && (
                                            <div className="login-error-list">
                                                {errorMsg}
                                            </div>
                                        )
                                    }
                                    {
                                        isMaxLoginCountReached && (
                                            <div className="login-error-list">
                                                Max attempts reached (5). Click Forgot password to continue.
                                            </div>
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="login-copyright-sm d-md-none">
                        Copyright © 2019
                    </div>
                </div>
            </div>
        );
    }
}

LogIn.displayName = 'LogIn';

LogIn.propTypes = {
    authentication: PropTypes.shape({
        user: PropTypes.object,
    }),
    alert: PropTypes.shape({
        type: PropTypes.string,
    }),
    dispatch: PropTypes.func.isRequired,
};
LogIn.defaultProps = {
    authentication: {},
    alert: {},
};

function mapStateToProps(state) {
    const { alert, authentication } = state;
    return {
        alert,
        authentication,
    };
}

// const connectedLoginPage = connect(mapStateToProps)(LogIn);
// export { connectedLoginPage as LogIn };
export default connect(mapStateToProps)(LogIn);
