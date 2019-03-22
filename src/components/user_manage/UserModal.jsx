import React from 'react';
import PropTypes from 'prop-types';

const UserModal = (props) => {
    const {
        onUserDelete, userToBeDeleted, id, title, deleteMsg, userDetails,
    } = props;
    return (
        <div className="modal fade modal-alert" id={id} data-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                        <button type="button" className="close" data-dismiss="modal">
                            <img src="/img/modal-close.svg" alt="" />
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="modal-body text-center modal-body-alert">
                        {
                            deleteMsg ? (
                                <div className="alert-message">
                                    <h4 className="">
                                        You are deleting
                                        <b>
                                            {` ${userToBeDeleted.firstName} ${userToBeDeleted.lastName}.`}
                                        </b>
                                    </h4>
                                    <h4>Are you sure?</h4>
                                </div>
                            )
                                : (
                                    <div className="alert-message">
                                        <h3>
                                            {userDetails.firstName}
                                        </h3>
                                        <h4 className="text-success">
                                            was created successfully
                                        </h4>
                                    </div>
                                )
                        }
                        {
                            deleteMsg ? (
                                <div className="alert-options pt-4">
                                    <button type="button" className="btn btn-outline-primary btn-ex-padding" data-dismiss="modal">No</button>
                                    <button type="button" className="btn btn-primary btn-ex-padding" data-dismiss="modal" onClick={e => onUserDelete(e, userToBeDeleted)}>
                                        Yes
                                    </button>
                                </div>
                            )
                                : <button type="button" className="btn btn-primary btn-ex-padding" data-dismiss="modal">Okay</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

UserModal.propTypes = {
    onUserDelete: PropTypes.func.isRequired,
    userToBeDeleted: PropTypes.shape({
        id: PropTypes.string,
    }).isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deleteMsg: PropTypes.bool,
    userDetails: PropTypes.shape({
        id: PropTypes.string,
    }).isRequired,
};
UserModal.defaultProps = {
    deleteMsg: false,
};

export default UserModal;
