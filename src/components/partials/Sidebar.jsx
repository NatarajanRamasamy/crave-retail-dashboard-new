import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DashboardFooter from './DashboardFooter';
import history from '../../helpers/history';


const Sidebar = (props) => {
    const { data } = props;
    const { user } = data.authentication;
    const url = data.location.pathname;
    return (
        <aside className="d-flex flex-column dash-left-column">
            <div className="sidebar-header">
                <div className="d-flex">
                    <button type="button" className="dash-menu-btn">
                        <img alt="" src="/img/icon-menu.svg" className="menu-icon" />
                    </button>
                </div>
                <div className="sidebar-brand-con d-flex justify-content-center align-items-center">
                    <img alt="" src="/img/logo.png" className="sidebar-brand" />
                </div>
            </div>
            <div className="flex-grow-1">
                <nav className="sidebar-navigation d-flex flex-column justify-content-center">
                    <ul>
                        <li className={url === '/dashboard' ? 'active' : ''}>
                            <Link to="/dashboard">
                                <div className="nav-icon">
                                    <img alt="" src="/img/icon-home.svg" className="footer-brand" />
                                </div>
                                <div className="">
                                    Dashboard
                                </div>
                            </Link>
                        </li>
                        <li className={url === '/dashboard' ? '' : ''}>
                            <Link to="/dashboard">
                                <div className="nav-icon">
                                    <img alt="" src="/img/icon-reserve.svg" className="footer-brand" />
                                </div>
                                <div className="">
                                    Online Reserve
                                </div>
                            </Link>
                        </li>
                        <li className={url === '/dashboard' ? '' : ''}>
                            <Link to="/dashboard">
                                <div className="nav-icon">
                                    <img alt="" src="/img/icon-reports.svg" className="footer-brand" />
                                </div>
                                <div className="">
                                    Reports
                                </div>
                            </Link>
                        </li>
                        {
                            user.role === 'STORE_ADMIN' && (
                                <li className={url === '/user-manage' ? 'active' : ''}>
                                    <Link to="/user-manage">
                                        <div className="nav-icon">
                                            <img alt="" src="/img/icon-user-management.svg" className="footer-brand" />
                                        </div>
                                        <div className="">
                                            User Management
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                        <li className={url === '/dashboard' ? '' : ''}>
                            <Link to="/dashboard">
                                <div className="nav-icon">
                                    <img alt="" src="/img/icon-store-settings.svg" className="footer-brand" />
                                </div>
                                <div className="">
                                    Store Settings
                                </div>
                            </Link>
                        </li>
                        <li className={url === '/dashboard' ? '' : ''}>
                            <Link to="/dashboard">
                                <div className="nav-icon">
                                    <img alt="" src="/img/icon-manage-kiosk.svg" className="footer-brand" />
                                </div>
                                <div className="">
                                    Manage Kiosks
                                </div>
                            </Link>
                        </li>
                        <li className={url === '/dashboard' ? '' : ''}>
                            <Link to="/dashboard">
                                <div className="nav-icon">
                                    <img alt="" src="/img/icon-help.svg" className="footer-brand" />
                                </div>
                                <div className="">
                                    Helps
                                </div>
                            </Link>
                        </li>
                        <li className={url === '/feedback' ? 'active' : ''}>
                            <Link to="/feedback" onClick={() => { history.push('/feedback'); }}>
                                <div className="nav-icon">
                                    <img alt="" src="/img/icon-feedback.svg" className="footer-brand" />
                                </div>
                                <div className="">
                                    Feedback
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <DashboardFooter />
        </aside>
    );
};

Sidebar.propTypes = {
    data: PropTypes.shape({
        authentication: PropTypes.shape({
            user: PropTypes.object.isRequired,
        }),
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }),
    }).isRequired,
};
export default Sidebar;
