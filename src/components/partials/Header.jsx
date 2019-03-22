import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Header extends Component {
    // Function for open logout modal
    showLogoutModal() {
        window.$('#modal-logout-success').modal('show');
        window.$('.modal-backdrop').appendTo('.dash-right-column');
        window.$('body').removeClass();
        window.$('body').removeAttr('style');
    }

    render() {
        // eslint-disable-next-line react/destructuring-assignment
        const headerData = this.props.data.authentication.user;
        return (
            <header className="top-bar d-flex align-items-center justify-content-between">
                <div className="top-bar-left">
                    <h1>
                        Welcome,
                        {`${headerData.firstName} !`}
                    </h1>
                </div>
                <div className="top-bar-right">
                    <ul className="top-bar-nav">
                        <li>
                            <Link to="#!">
                                <div className="nav-icon-left nav-icon">
                                    <img alt="" src="/img/icon-notification.svg" />
                                </div>
                                <div className="nav-text">
                                    Shopper Requests
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="#!" id="app-logout" className="link-logout" onClick={this.showLogoutModal}>
                                <div className="nav-text">
                                    Log Out
                                </div>
                                <div className="nav-icon-right nav-icon">
                                    <img alt="" src="/img/icon-logout.svg" />
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* <!-- #modal-Logout-success >> --> */}
                <div className="modal fade modal-alert" id="modal-logout-success" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {/* <!-- Modal Header --> */}
                            <div className="modal-header">
                                <h4 className="modal-title">Logout</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    <img src="/img/modal-close.svg" alt="" />
                                </button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className="modal-body text-center modal-body-alert">
                                <div className="alert-message">
                                    <h4 className="">
                                        Are you sure you want to log out?
                                    </h4>
                                </div>
                                <div className="alert-options pt-4">
                                    <button type="button" className="btn btn-outline-primary btn-ex-padding" data-dismiss="modal">No</button>
                                    <Link to="/login" className="btn btn-primary btn-ex-padding">
                                        Yes
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    data: PropTypes.shape({
        authentication: PropTypes.shape({
            user: PropTypes.object.isRequired,
        }),
    }).isRequired,
};

export default Header;
