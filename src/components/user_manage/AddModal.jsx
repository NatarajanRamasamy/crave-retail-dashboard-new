import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

let styles = {
    opacity: '0.5',
    width: '24px',
};
const pop = () => {
    styles = {
        opacity: '1',
    };
};
const angleDownBlack = (
    <svg style={{ marginLeft: '10px', width: '16px', height: '10px' }} enableBackground="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px">
        <rect fill="none" height="50" width="50" />
        <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
    </svg>
);
const modalClose = (
    <svg width="28" height="28" viewBox="0 0 28 28">
        <path id="Фигура_620" data-name="Фигура 620" d="M8920,2779.82l-2.82-2.82L8906,2788.18,8894.82,2777l-2.82,2.82,11.18,11.18L8892,2802.18l2.82,2.82,11.18-11.18,11.18,11.18,2.82-2.82L8908.82,2791Z" transform="translate(-8892 -2777)" fill="#5f65c0" />
    </svg>
);
const inputOptionEye = (
    <svg style={styles} onMouseEnter={() => pop()} width="43.173" height="32" viewBox="0 0 43.173 32">
        <defs>
            <clipPath id="clip-path">
                <rect id="Menu_Area_копия" data-name="Menu Area копия" width="43.173" height="32" transform="translate(344 -3)" fill="#4b56cb" opacity="0.902" />
            </clipPath>
        </defs>
        <g id="Mask_Group_1" data-name="Mask Group 1" transform="translate(-344 3)" clipPath="url(#clip-path)">
            <g id="outline-visibility-24px" transform="translate(349.587 -3)">
                <path id="Path_21" data-name="Path 21" d="M0,0H32V32H0Z" fill="none" />
                <path id="Path_22" data-name="Path 22" d="M67.292,213.167a13.027,13.027,0,0,1,11.76,7.333,13.1,13.1,0,0,1-23.52,0,13.027,13.027,0,0,1,11.76-7.333m0-2.667a15.769,15.769,0,0,0-14.667,10,15.756,15.756,0,0,0,29.333,0A15.769,15.769,0,0,0,67.292,210.5Zm0,6.667a3.333,3.333,0,1,1-3.333,3.333,3.335,3.335,0,0,1,3.333-3.333m0-2.667a6,6,0,1,0,6,6A6.009,6.009,0,0,0,67.292,214.5Z" transform="translate(-51.292 -205.167)" fill="#4b56cb" />
            </g>
        </g>
    </svg>
);

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pinInputType: true,
            pwdInputType: true,
            // storeIdArray: [],
            // updated: false,
            // userId: '',
            // userDetails: {
            //     firstName: '',
            //     lastName: '',
            //     role: '',
            //     gender: '',
            //     phoneNumber: '',
            //     customerId: '',
            //     email: '',
            //     pin: '',
            //     storeId: "3",
            //     password: '',
            //     allowAllStores: false,
            //     allowedStores: []
            // },
            // errors: {
            //     firstName: '',
            //     lastName: '',
            //     role: '',
            //     gender: '',
            //     phoneNumber: '',
            //     customerId: '',
            //     email: '',
            //     pin: '',
            //     storeId: "",
            //     password: '',
            //     allowAllStores: false,
            //     allowedStores: []
            // },
        };
        this.selectStores = this.selectStores.bind(this);
    }

    selectStores() {
        window.$('#modal-select-stores').modal('show');
        window.$('.modal-backdrop').appendTo('.dash-right-column');
        window.$('body').removeClass();
        window.$('body').removeAttr('style');
    }

    render() {
        const { pwdInputType, pinInputType, pinType } = this.state;
        // const { userManage, userDetails } = this.props;
        const {
            userAction, userDetails, handleChange, handleSubmit, errors, resetState,
        } = this.props;
        console.log('this.props @ addModal -->', this.props);
        return (
            <React.Fragment>
                <div className="modal fade modal-add-edit" id="modal-add-associate" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    {`${userAction} User`}
                                </h4>
                                <button type="button" className="close" data-dismiss="modal" onClick={resetState}>
                                    {/* <img src="assets/img/modal-close.svg"/> */}
                                    {modalClose}
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <div className="d-flex">
                                                    <label htmlFor="pwd">
                                                        Assign Role
                                                    </label>
                                                    <div className="dropdown tiny-outline-drop ml-2">
                                                        <button type="button" className="btn tiny-drop-outline-primary drop-role-select" data-toggle="dropdown">
                                                            {
                                                                userDetails.role ? userDetails.role : 'Select Role'
                                                            }
                                                            <span>
                                                                {/* <img src="assets/img/angle-down-black.svg"/> */}
                                                                {angleDownBlack}
                                                            </span>
                                                        </button>
                                                        <div className="dropdown-menu drop-role-select-menu">
                                                            <div className="custom-control custom-radio">
                                                                {/* <input type="radio" name="role" checked={userDetails.role === "MANAGER"} onChange={ handleChange } className="custom-control-input" id="customRadio" value="MANAGER" />
                                                                <label className="custom-control-label" htmlFor="customRadio">Manager</label> */}
                                                                <input type="radio" name="role" checked={userDetails.role === 'STORE_ADMIN'} onChange={handleChange} className="custom-control-input" id="customRadio" value="STORE_ADMIN" />
                                                                <label className="custom-control-label" htmlFor="customRadio">Store Admin</label>
                                                            </div>
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" name="role" checked={userDetails.role === 'ASSOCIATE'} onChange={handleChange} className="custom-control-input" id="customRadio2" value="ASSOCIATE" />
                                                                <label className="custom-control-label" htmlFor="customRadio2">Associate</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="error-block">
                                                {errors.role}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="pwd">Email</label>
                                                <input type="text" name="email" value={userDetails.email} onChange={handleChange} className={errors.email ? 'form-control input-error' : 'form-control'} id="email" placeholder="Enter Email" />
                                                <div className="error-block">{errors.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="pwd">First Name</label>
                                                <input type="text" name="firstName" value={userDetails.firstName} onChange={handleChange} className={errors.firstName ? 'form-control input-error' : 'form-control'} id="firstName" placeholder="Enter first name" />
                                                <div className="error-block">{errors.firstName}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="pwd">Password</label>
                                                <div className="input-group input-group-n-b-r">
                                                    <input value={userDetails.password} disabled={userAction.toString() === 'Edit'} name="password" onChange={handleChange} type={pwdInputType ? 'password' : 'text'} className={errors.password ? 'form-control input-error' : 'form-control'} id="pwd" placeholder="****" />
                                                    <div className="input-group-append">
                                                        <button type="button" className={pwdInputType === 'text' ? 'btn active' : 'btn'} onClick={(e) => { e.preventDefault(); this.setState({ pwdInputType: !pwdInputType }); }}>
                                                            {inputOptionEye}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="error-block">{errors.password}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="pwd">Last Name</label>
                                                <input type="text" name="lastName" value={userDetails.lastName} onChange={handleChange} className={errors.lastName ? 'form-control input-error' : 'form-control'} id="lastName" placeholder="Enter last name" />
                                                <div className="error-block">{errors.lastName}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="pwd">PIN</label>
                                                <div className="input-group input-group-n-b-r">
                                                    <input value={userDetails.pin} onChange={handleChange} name="pin" type={pinInputType ? 'password' : 'text'} className={errors.pin ? 'form-control input-error' : 'form-control'} id="pin" placeholder="****" />
                                                    <div className="input-group-append">
                                                        <button type="button" className={pinType === 'text' ? 'btn active' : 'btn'} onClick={(e) => { e.preventDefault(); this.setState({ pinInputType: !pinInputType }); }}>
                                                            {inputOptionEye}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="error-block">{errors.pin}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="pwd">Phone Number</label>
                                                <input value={userDetails.phoneNumber} type="text" name="phoneNumber" onChange={handleChange} className={errors.phoneNumber ? 'form-control input-error' : 'form-control'} id="phoneNumber" placeholder="Enter phone number" />
                                                <div className="error-block">{errors.phoneNumber}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="pwd">Assign Store(s)</label>
                                                <div className="input-group">
                                                    <div>
                                                        <input onClick={e => this.selectStores(e)} id="open-select-stores" type="button" className="form-control btn btn-outline-primary mt-2" value="Add / Edit" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="pwd">Gender</label>
                                                <div className="pl-3 pt-3 pr-3">
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" name="gender" checked={userDetails.gender === 'MALE'} value="MALE" onChange={handleChange} id="customRadioInline1" className="custom-control-input" />
                                                        <label className="custom-control-label" htmlFor="customRadioInline1">Male</label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" name="gender" checked={userDetails.gender === 'FEMALE'} value="FEMALE" onChange={handleChange} id="customRadioInline2" className="custom-control-input" />
                                                        <label className="custom-control-label" htmlFor="customRadioInline2">Female</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="error-block">
                                                {errors.gender}
                                            </div>
                                        </div>
                                        <div className="col" />
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group text-center">
                                                <button type="button" onClick={handleSubmit} className="btn btn-primary btn-ex-padding">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


AddModal.propTypes = {
    userAction: PropTypes.string,
    userDetails: PropTypes.shape({
        allowedStores: PropTypes.array,
    }).isRequired,
    resetState: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.shape({
        allowedStores: PropTypes.array,
    }).isRequired,
};
AddModal.defaultProps = {
    userAction: '',
};

function mapStateToProps(state) {
    const { alert, authentication, userManage } = state;
    return {
        alert,
        authentication,
        userManage,
    };
}

// const connectedLoginPage = connect(mapStateToProps)(AddModal);
// export { connectedLoginPage as AddModal };
export default connect(mapStateToProps)(AddModal);
// export default connect(mapStateToProps)(AddModal)
