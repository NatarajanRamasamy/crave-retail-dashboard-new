import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
// import _ from 'lodash';
import PropTypes from 'prop-types';
import {
    isEmail, isEmpty, isLength,
} from 'validator';
import alertActions from '../../actions/alert.actions';
import userManageActions from '../../actions/user.manage.actions';
import Sidebar from '../partials/Sidebar';
import { Header } from '../partials/Header';
import UserModal from './UserModal';
import AddModal from './AddModal';
import StoresList from './StoresList';
import AddSuccessModal from './AddSuccessModal';
import DeleteUserModal from './DeleteUserModal';
import {
    REQUIRED,
    ONLY_NUMBER,
    INVALID,
    LENGTH_REQUIRED,
    PASSWORD_LENGTH,
    PHONE_LENGTH,
    ONLY_NUMBER_CHARACTER,
} from '../../constants/form.constants';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToBeDeleted: {},
            // selected: {},
            loading: false,
            updated: false,
            pinType: 'password',
            // modalHeader: '',
            userId: '',
            // action: '',
            userDetails: {
                firstName: '',
                lastName: '',
                role: '',
                gender: '',
                phoneNumber: '',
                customerId: '',
                email: '',
                pin: '',
                storeId: '3',
                password: '',
                allowAllStores: false,
                allowedStores: [],
            },
            errors: {
                firstName: '',
                lastName: '',
                role: '',
                gender: '',
                phoneNumber: '',
                customerId: '',
                email: '',
                pin: '',
                storeId: '',
                password: '',
                allowAllStores: false,
                allowedStores: [],
            },
            storeIdArray: [],
        };
        this.getSelectedStores = this.getSelectedStores.bind(this);
        this.onUserEdit = this.onUserEdit.bind(this);
        this.onUserDelete = this.onUserDelete.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.showSuccessModal = this.showSuccessModal.bind(this);
        this.listAllStores = this.listAllStores.bind(this);
        this.hideAddModal = this.hideAddModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.showDeleteSuccessModal = this.showDeleteSuccessModal.bind(this);
        this.hideDeleteSuccessModal = this.hideDeleteSuccessModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetState = this.resetState.bind(this);
        this.validate = this.validate.bind(this);
    }

    // component Did Mount
    componentDidMount() {
        const { dispatch } = this.props;
        document.title = 'Crave Retail | User Management';
        dispatch(userManageActions.getAllUserDetails());
        // this.props.dispatch(userManageActions.getAllStoreList());
    }

    componentDidUpdate() {
        const { updated } = this.state;
        const { dispatch } = this.props;

        if (updated) {
            dispatch(userManageActions.getAllUserDetails());
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ updated: false });
        }
    }

    // Set values for user edit modal
    onUserEdit(e, val) {
        const { authentication, userManage, dispatch } = this.props;
        const { user } = authentication;
        userManage.success = false;
        dispatch(userManageActions.getSelectedUser(val));
        dispatch(alertActions.clear());
        this.setState(
            {
                userId: val.id,
                userAction: 'Edit',
                userDetails:
                {
                    firstName: val.firstName,
                    lastName: val.lastName,
                    gender: val.gender,
                    storeId: val.storeId,
                    phoneNumber: val.phoneNumber,
                    email: val.email,
                    pin: '',
                    password: '',
                    id: val.id,
                    active: val.active,
                    role: val.role,
                    customerId: user.customerId,
                    allowAllStores: 'false',
                    allowedStores: val.allowedStores,
                },
                storeIdArray: val.allowedStores,
            },
        );
        window.$('#modal-add-associate').modal('show');
        window.$('.modal-backdrop').appendTo('.dash-right-column');
        window.$('body').removeClass();
        window.$('body').removeAttr('style');
    }

    // Delete user function
    onUserDelete(e, val) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(userManageActions.deleteUser(val.id));
        this.showDeleteSuccessModal(e, val);
        this.setState({
            updated: true,
            // action: 'DELETE'
        });
    }

    // get selected stores for user
    getSelectedStores(e, id) {
        // const { value } = e.target;
        const { storeIdArray } = this.state;
        if (storeIdArray.indexOf(id) > -1) {
            this.setState({
                storeIdArray: storeIdArray.filter(item => item !== id),
            });
        }
        this.setState(prevState => ({
            userDetails: {
                ...prevState.userDetails,
                // storeId: id,
                storeIdArray: storeIdArray.push(id),
            },
        }));
    }

    // Function for open user add/edit modal
    showAddModal() {
        const { dispatch, userManage } = this.props;
        dispatch(alertActions.clear());
        userManage.success = false;
        this.setState({
            // modalHeader: val,
            userAction: 'Add',
            userId: '',
            userDetails: {
                firstName: '',
                lastName: '',
                role: '',
                gender: '',
                phoneNumber: '',
                customerId: '',
                email: '',
                pin: '',
                storeId: '3',
                password: '',
                allowAllStores: false,
                allowedStores: [],
            },
            errors: {
                firstName: '',
                lastName: '',
                role: '',
                gender: '',
                phoneNumber: '',
                customerId: '',
                email: '',
                pin: '',
                storeId: '',
                password: '',
                allowAllStores: false,
                allowedStores: [],
            },
            storeIdArray: [],
        });
        const myPin = document.getElementById('pwd');
        myPin.value = null;
        window.$('#modal-add-associate').modal('show');
        window.$('.modal-backdrop').appendTo('.dash-right-column');
        window.$('body').removeClass();
        window.$('body').removeAttr('style');
    }

    showSuccessModal() {
        // this.hideAddModal();
        window.$('#addUserSuccess').modal('show');
        window.$('.modal-backdrop').appendTo('.dash-right-column');
        window.$('body').removeClass();
        window.$('body').removeAttr('style');
    }

    listAllStores() {
        window.$('#modal-select-stores').modal('show');
        window.$('.modal-backdrop').appendTo('.dash-right-column');
        window.$('body').removeClass();
        window.$('body').removeAttr('style');
    }

    // Function for hide user add/edit modal
    hideAddModal() {
        window.$('#modal-add-associate').modal('hide');
        // window.$('#modal-success').modal('show')
        window.$('.modal-backdrop').appendTo('.dash-right-column');
        window.$('body').removeClass();
        window.$('body').removeAttr('style');
    }

    showDeleteModal(e, userToDelete) {
        // const { authentication } = this.props;
        // const { user } = authentication;
        // const userStores = user.allowedStores;
        // const storesToCheck = userToDelete.allowedStores;
        // let arrayDiff = _.difference(storesToCheck, userStores);

        this.setState({ userToBeDeleted: userToDelete });
        window.$('#modal-user-delete').modal('show');
        window.$('.modal-backdrop').appendTo('.dash-right-column');
        window.$('body').removeClass();
        window.$('body').removeAttr('style');
    }

    showDeleteSuccessModal() {
        window.$('#deleteUserModal').modal('show');
        window.$('.modal-backdrop').appendTo('.dash-right-column');
        window.$('body').removeClass();
        window.$('body').removeAttr('style');
    }

    hideDeleteSuccessModal() {
        // this.setState({ userToBeDeleted: user });
        window.$('#modal-user-delete').modal('hide');
        window.$('.modal-backdrop').appendTo('.dash-right-column');
        window.$('body').removeClass();
        window.$('body').removeAttr('style');
    }

    // Onchange function for fields in add/edit user form
    handleChange(e) {
        const { dispatch } = this.props;
        dispatch(alertActions.clear());
        const { name, value } = e.target;
        this.setState(prevState => ({
            userDetails: {
                ...prevState.userDetails,
                [name]: value,
            },
            errors: {
                ...prevState.errors,
                [name]: this.validate(name, value),
            },
        }));
    }

    handleSubmit(e) {
        e.preventDefault();
        const {
            userDetails, storeIdArray, userId, userAction,
        } = this.state;
        const { authentication, dispatch } = this.props;
        const {
            firstName, lastName, role, gender, password, phoneNumber, email, pin, storeId, active,
        } = userDetails;
        const { user } = authentication;
        this.setState({
            loading: true,
            errors: {
                firstName: this.validate('firstName', firstName),
                lastName: this.validate('lastName', lastName),
                gender: this.validate('gender', gender),
                storeId: this.validate('storeId', storeId.toString()),
                role: this.validate('role', role),
                customerId: user.customerId,
                phoneNumber: this.validate('phoneNumber', phoneNumber),
                email: this.validate('email', email),
                pin: this.validate('pin', pin),
                password: userAction.toString() === 'Add' ? this.validate('password', password) : '',
                allowAllStores: 'false',
            },
        });
        const data = {
            id: userId,
            firstName,
            lastName,
            role,
            gender,
            phoneNumber,
            customerId: user.customerId,
            email,
            pin,
            storeId: storeId.toString(),
            allowAllStores: false,
            allowedStores: storeIdArray,
            password,
            active,
        };

        if (firstName && lastName && gender && storeId && phoneNumber && pin && email && role) {
            if (userId) {
                dispatch(userManageActions.editUser(data));
                this.showSuccessModal();
            } else {
                // eslint-disable-next-line no-lonely-if
                if (pin && password) {
                    dispatch(userManageActions.addUser(data));
                    this.showSuccessModal();
                }
            }
        }
    }

    validate(name, value) {
        switch (name) {
        case 'firstName':
            if (isEmpty(value)) {
                return REQUIRED('First Name');
            }
            return '';

        case 'lastName':
            if (isEmpty(value)) {
                return REQUIRED('Last Name');
            }
            return '';

        case 'gender':
            if (isEmpty(value)) {
                return REQUIRED('Gender');
            }
            return '';

        case 'storeId':
            if (isEmpty(value)) {
                return REQUIRED('storeId');
            }
            return '';

        case 'phoneNumber':
            if (isEmpty(value)) {
                return REQUIRED('Phone Number');
            }
            if (!/\d/.test(value)) {
                return ONLY_NUMBER_CHARACTER;
            }
            if (/^(?=.*[A-Z]).*$/.test(value)) {
                return ONLY_NUMBER_CHARACTER;
            }
            if (/^(?=.*[!(@#)|$%`^&?*+=.;:_-]).*$/.test(value)) {
                return ONLY_NUMBER_CHARACTER;
            }
            if (/^(?=.*[a-z]).*$/.test(value)) {
                return ONLY_NUMBER_CHARACTER;
            }
            if (!isLength(value, PHONE_LENGTH, PHONE_LENGTH)) {
                return LENGTH_REQUIRED('Phone Number', { min: PHONE_LENGTH, max: PHONE_LENGTH });
            }
            return '';

        case 'email':
            if (isEmpty(value)) {
                return REQUIRED('Email');
            }
            if (!isEmail(value)) {
                return INVALID('Email');
            }
            return '';

        case 'pin':
            if (isEmpty(value)) {
                return REQUIRED('Pin');
            }
            if (!/\d/.test(value)) {
                // return ONLY_NUMBER_CHARACTER;
                return ONLY_NUMBER('Pin');
            }
            if (!isLength(value, PASSWORD_LENGTH, PASSWORD_LENGTH)) {
                return LENGTH_REQUIRED('Pin', { min: PASSWORD_LENGTH, max: PASSWORD_LENGTH });
            }
            return '';

        case 'password':
            if (isEmpty(value)) {
                return REQUIRED('Password');
            }
            if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
                return 'Invalid Password';
            }
            return '';

        case 'role':
            if (isEmpty(value)) {
                return REQUIRED('Role');
            }
            return '';

        default:
            return '';
        }
    }

    resetState() {
        this.setState({
            userDetails: {
                firstName: '',
                lastName: '',
                role: '',
                gender: '',
                phoneNumber: '',
                customerId: '',
                email: '',
                pin: '',
                storeId: '3',
                password: '',
                allowAllStores: false,
                allowedStores: [],
            },
            errors: {
                firstName: '',
                lastName: '',
                role: '',
                gender: '',
                phoneNumber: '',
                customerId: '',
                email: '',
                pin: '',
                storeId: '',
                password: '',
                allowAllStores: false,
                allowedStores: [],
            },
            storeIdArray: [],
        });
    }

    // Render react component
    render() {
        const {
            updated, userDetails, errors, userAction, pinType, userToBeDeleted, storeIdArray, loading,
        } = this.state;
        const { authentication, userManage } = this.props;
        const { role } = authentication.user;
        const { associates, stores } = userManage;
        const { user } = authentication;
        // let { alert } = this.props;
        const { success } = userManage;
        if (success) {
            this.hideAddModal();
        }
        // Set columns for table
        const columns = [
            {
                className: 'first-header text-center',
                headerClassName: 'no-header',
                width: { flex: '40 0 auto', width: '40px' },
                Header: <img alt="" className="tehead-icon" src="/img/arow-down.svg" />,
                id: 'id',
                Cell: row => <div>{row.index + 1}</div>,
            },
            {
                className: 'text-center',
                Header: 'Name',
                id: 'name',
                // width:{"flex": "100 0 auto", "width": "100px"},
                accessor: data => data.firstName,
            },
            {
                className: 'text-center',
                Header: 'Role',
                id: 'role',
                // width:{"flex": "100 0 auto", "width": "100px"},
                accessor: data => data.role,
            },
            {
                className: 'text-center',
                // Header: "Last Login",
                Header: 'Phone Number',
                id: 'phoneNumber',
                // width:{"flex": "100 0 auto", "width": "100px"},
                accessor: data => data.phoneNumber,
            },
            {
                accessor: 'actions',
                className: 'text-center',
                Header: 'Actions',
                Cell: row => (
                    role === 'STORE_ADMIN' && (
                        <div className="btn-group-table">
                            <button type="button" className="btn-table-option" onClick={e => this.onUserEdit(e, row.original)}>
                                <img alt="" src="/img/icon-pencil.svg" />
                            </button>
                            <button type="button" className="btn-table-option" onClick={e => this.showDeleteModal(e, row.original)}>
                                <img alt="" src="/img/icon-bin.svg" />
                            </button>
                        </div>
                    )
                ),
            },
        ];
        return (
            <React.Fragment>
                <div className="container-fill-row bg-light d-flex">
                    <Sidebar data={this.props} />
                    <div className="dash-right-column d-flex flex-grow-1 flex-column">
                        <Header data={this.props} />
                        <div className="content-wraper d-flex flex-grow-1 align-items-start">
                            <div className="flex-grow-1 dash-content dash-content-padding-lg">
                                <div className="dash-content-header">
                                    <h2>
                                        Users
                                        <span>
                                            /
                                            {associates.length}
                                        </span>
                                    </h2>
                                </div>
                                <ReactTable NoDataComponent={() => null} data={associates} columns={columns} filterable={false} className="react-table-custom" showPageSizeOptions={false} defaultSorted={[{ id: 'id', desc: false }]} showPagination={(associates.length > 5)} pageSize={(associates.length > 5) ? 5 : associates.length} />
                                {
                                    role === 'STORE_ADMIN' || role === 'ASSOCIATE' ? (
                                        <div className="content-options">
                                            <div className="form-group text-center">
                                                {/* <button id="submit-button" className="btn btn-primary btn-ex-padding" onClick={(e) => this.showAddModal(e, "Associate")}>Add Associate</button> */}
                                                {/* <button className="btn btn-primary btn-ex-padding" onClick={(e) => this.showAddModal(e, "Manager")}>Add Manager</button> */}

                                                {/* <button className="btn btn-primary btn-ex-padding" onClick={(e) => this.showAddModal(e, "Manager")}>Add User</button> */}
                                                <button type="button" className="btn btn-primary btn-ex-padding" onClick={e => this.showAddModal(e, 'STORE_ADMIN')}>Add User</button>
                                            </div>
                                        </div>
                                    )
                                        : null
                                }
                            </div>
                        </div>

                        <AddModal resetState={this.resetState} handleChange={this.handleChange} handleSubmit={this.handleSubmit} userDetails={userDetails} errors={errors} storeIdArray={storeIdArray} updated={updated} stores={stores} user={user} addUser={this.addUser} pinType={pinType} userAction={userAction} showPasswordPin={this.showPasswordPin} />
                        {/* <UserModal onUserDelete={this.onUserDelete} userToBeDeleted={userToBeDeleted} id="modal-success" title={userAction + modalHeader} userDetails={userDetails} /> */}
                        <UserModal onUserDelete={this.onUserDelete} userToBeDeleted={userToBeDeleted} id="modal-user-delete" title="Delete User" deleteMsg userDetails={userDetails} />
                        <StoresList storesList={user.allowedStores} getSelectedStores={this.getSelectedStores} userDetails={userDetails} storeIdArray={storeIdArray} stores={stores} />
                        <AddSuccessModal loading={loading} action={userAction} hideAddModal={this.hideAddModal} userDetails={userDetails} userManage={userManage} userAction={userAction} />
                        <DeleteUserModal hideDeleteSuccessModal={this.hideDeleteSuccessModal} userDetails={userToBeDeleted} />
                        {/* <ResponseModal loading={loading} action={userAction} hideAddModal={this.hideAddModal} userDetails={userDetails} userManage={userManage} hideDeleteSuccessModal={this.hideDeleteSuccessModal} /> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

UserManage.displayName = 'UserManage';

UserManage.propTypes = {
    authentication: PropTypes.shape({
        user: PropTypes.object.isRequired,
    }).isRequired,
    userManage: PropTypes.shape({
        associates: PropTypes.array.isRequired,
        stores: PropTypes.array.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { alert, authentication, userManage } = state;
    return {
        alert,
        authentication,
        userManage,
    };
}

export default connect(mapStateToProps)(UserManage);
