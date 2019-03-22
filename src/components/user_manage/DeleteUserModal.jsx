import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import alertActions from '../../actions/alert.actions';

class DeleteUserModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    render() {
        const {
            userDetails, alert, userManage, hideDeleteSuccessModal, dispatch,
        } = this.props;
        const { loading } = this.state;

        return (
            <div className="modal fade modal-alert" id="deleteUserModal" data-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header  */}
                        <div className="modal-header">
                            <h4 className="modal-title">Delete User</h4>
                        </div>
                        {/* Modal body  */}
                        <div className="modal-body text-center modal-body-alert">
                            {
                                loading && userManage.loader
                                    ? (
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
                                                <h4 className="text-success">
                                                    deleted successfully.
                                                </h4>
                                            }
                                        </div>
                                    )
                                        : alert.type === 'alert-danger' && (
                                            <div className="alert-message">
                                                {
                                                    <h4 className="text-danger">
                                                        deleting
                                                        {`${userDetails.firstName} ${userDetails.lastName}`}
                                                        failed.
                                                    </h4>
                                                }

                                            </div>
                                        )
                            }
                            {
                                alert.type === 'alert-success'
                                    ? <button type="button" className="btn btn-primary btn-ex-padding" onClick={() => hideDeleteSuccessModal()} data-dismiss="modal">Okay</button>
                                    : <button type="button" className="btn btn-primary btn-ex-padding" onClick={() => { dispatch(alertActions.clear()); }} data-dismiss="modal">Okay</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DeleteUserModal.propTypes = {
    userDetails: PropTypes.object.isRequired,
    alert: PropTypes.shape({
        type: PropTypes.string,
    }),
    userManage: PropTypes.object.isRequired,
    // action: PropTypes.string.isRequired,
    hideDeleteSuccessModal: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};
DeleteUserModal.defaultProps = {
    alert: {},
};

function mapStateToProps(state) {
    const { alert, authentication, userManage } = state;
    return {
        alert,
        authentication,
        userManage,
    };
}

export default connect(mapStateToProps)(DeleteUserModal);
