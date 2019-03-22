import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { isEmpty, isLength } from 'validator';
import {
    REQUIRED,
    LENGTH_REQUIRED,
} from '../../constants/form.constants';
import userActions from '../../actions/user.actions';

class ResetNewPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            newPassword: '',
            showForm: true,
            errors: {
                password: '',
                newPassword: '',
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitResetNewPassword = this.handleSubmitResetNewPassword.bind(this);
    }

    // component Did Mount
    componentDidMount() {
        document.title = 'Crave Retail | ResetPassword';
    }

    // onchange input fields
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            errors: {
                [name]: this.validate(name, value),
            },
        });
    }

    // submit reset password email
    handleSubmitResetNewPassword(e) {
        e.preventDefault();
        const { password, newPassword } = this.state;
        const { dispatch, location } = this.props;
        const parsedKey = queryString.parse(location.search);
        this.setState({
            errors: {
                password: this.validate('password', password),
                newPassword: this.validate('newPassword', newPassword),
            },
        });
        const newPasswordData = {
            token: parsedKey,
            newPassword: password,
        };
        if (password && newPassword) {
            dispatch(userActions.resetNewPassword(newPasswordData));
            // this.setState({
            //   showForm: false
            // })
        }
    }

    // validations for input fields
    validate(name, value) {
        const { password } = this.state;
        switch (name) {
        case 'password':
            if (isEmpty(value)) {
                return REQUIRED('Password');
            }
            if (!isLength(value, 8, 15)) {
                return LENGTH_REQUIRED('Password', { min: 8, max: 15 });
            }
            if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
                return 'Invalid Password';
            }
            return '';
        case 'newPassword':
            if (isEmpty(value)) {
                return REQUIRED('Password');
            }
            if (!isLength(value, 8, 15)) {
                return LENGTH_REQUIRED('Password', { min: 8, max: 15 });
            }
            if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
                return 'Invalid Password';
            }
            if (password !== value) {
                return 'Passwords do not match.';
            }
            return '';
        default:
            return '';
        }
    }

    render() {
        const {
            password, newPassword, showForm, errors,
        } = this.state;
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
                                <h1>Reset Password</h1>
                            </div>
                            <div className="login-form-body d-flex flex-grow-1 align-items-center">
                                {(showForm ? (
                                    <form className="flex-grow-1" action="">
                                        <div className="form-group">
                                            <label className="mb-3">Enter new password.</label>
                                            <input type="password" className={errors.password ? 'form-control input-error' : 'form-control'} id="email" placeholder="Enter new password" value={password} name="password" onChange={this.handleChange} />
                                            <div className="error-block">{errors.password}</div>
                                            <label className="mb-3">Retype new password.</label>
                                            <input type="password" className={errors.newPassword ? 'form-control input-error' : 'form-control'} id="email" placeholder="Confirm new password" value={newPassword} name="newPassword" onChange={this.handleChange} />
                                            <div className="error-block">{errors.newPassword}</div>
                                        </div>
                                        <div className="form-group d-flex align-items-md-center justify-content-center login-actions flex-column flex-md-row">
                                            {
                                                (!errors.password || !errors.newPassword)
                                                && <button type="button" onClick={this.handleSubmitResetNewPassword} className="btn btn-primary login-btn">Save New Password</button>
                                            }
                                        </div>
                                    </form>
                                )
                                    : (
                                        <div className="container-fill bg-light login-page align-items-center justify-content-center">
                                            <div className="login-container d-flex flex-column flex-md-row">
                                                <div className="login-brand-con d-flex flex-column">
                                                    <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                                                        <img src="assets/img/logo.png" alt="" className="brand-icon" />
                                                    </div>
                                                    <div className="login-footer align-items-center justify-content-center d-none d-md-flex">
                                                        Copyright © 2019
                                                    </div>
                                                </div>
                                                <div className="login-form-con d-flex flex-column">
                                                    <div className="login-form-header d-flex align-items-center">
                                                        <h1>Reset Password</h1>
                                                    </div>
                                                    <div className="login-form-body d-flex flex-grow-1 align-items-center">
                                                        <form className="flex-grow-1 text-center" action="">
                                                            <div className="form-group d-flex flex-column">
                                                                <label className="mb-3">Email Sent.</label>
                                                                <label className="mb-3">Check your email for a link to reset your password</label>
                                                            </div>
                                                            <div className="form-group d-flex align-items-md-center justify-content-center login-actions flex-column flex-md-row">
                                                                <a href="login.html" className="btn btn-primary login-btn">Back to Login Screen</a>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
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

ResetNewPassword.displayName = 'ResetNewPassword';

ResetNewPassword.propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
        search: PropTypes.string,
    }).isRequired,
};

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert,
    };
}

// const connectedLoginPage = connect(mapStateToProps)(ResetNewPassword);
// export { connectedLoginPage as ResetNewPassword };
export default connect(mapStateToProps)(ResetNewPassword);
