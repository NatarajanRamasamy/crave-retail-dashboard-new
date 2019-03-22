import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import alertActions from '../../actions/alert.actions';

class AddSuccessModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    render() {
        const {
            userDetails, alert, userManage, action, hideAddModal, dispatch, userAction,
        } = this.props;
        const { loading } = this.state;
        return (
            <div className="modal fade modal-alert" id="addUserSuccess" data-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header  */}
                        <div className="modal-header">
                            <h4 className="modal-title">{`${userAction} User`}</h4>
                        </div>
                        {/* Modal body  */}

                        <div className="modal-body text-center modal-body-alert">
                            {
                                loading && userManage.loader ? (
                                    <div className="alert-message">
                                        <h4 className="text-success">
                                            submitting...
                                        </h4>
                                    </div>
                                )
                                    : alert.type === 'alert-success' ? (
                                        <div className="alert-message">
                                            <h3>
                                                {`${userDetails.firstName} ${userDetails.lastName}`}
                                            </h3>
                                            {
                                                action === 'Edit'
                                                && (
                                                    <h4 className="text-success">
                                                        upadated successfully.
                                                    </h4>
                                                )
                                            }
                                            {
                                                action !== 'Edit' && action === 'Add' && (
                                                    <h4 className="text-success">
                                                        was created successfully.
                                                    </h4>
                                                )
                                            }
                                        </div>
                                    )
                                        : alert.type === 'alert-danger' && (
                                            <div className="alert-message">
                                                {
                                                    action === 'Edit' ? (
                                                        <h4 className="text-danger">
                                                            {alert.message.errors.length ? alert.message.errors[0] : 'updating user failed.'}
                                                        </h4>
                                                    )
                                                        : action === 'Add' && (
                                                            <h4 className="text-danger">
                                                                {alert.message.errors.length ? alert.message.errors[0] : 'Adding User failed.'}
                                                            </h4>
                                                        )
                                                }
                                            </div>
                                        )
                            }
                            {
                                alert.type === 'alert-success'
                                    ? <button type="button" className="btn btn-primary btn-ex-padding" onClick={() => hideAddModal()} data-dismiss="modal">Okay</button>
                                    : <button type="button" className="btn btn-primary btn-ex-padding" onClick={() => { dispatch(alertActions.clear()); }} data-dismiss="modal">Okay</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddSuccessModal.propTypes = {
    userDetails: PropTypes.object.isRequired,
    alert: PropTypes.shape({
        type: PropTypes.string,
    }),
    userManage: PropTypes.object.isRequired,
    action: PropTypes.string,
    hideAddModal: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};
AddSuccessModal.defaultProps = {
    alert: {},
    action: '',
};

function mapStateToProps(state) {
    const { alert, authentication, userManage } = state;
    return {
        alert,
        authentication,
        userManage,
    };
}

// const connectedLoginPage = connect(mapStateToProps)(AddSuccessModal);
// export { connectedLoginPage as AddSuccessModal };

export default connect(mapStateToProps)(AddSuccessModal);
