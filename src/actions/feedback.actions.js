import feedbackConstants from '../constants/feedback.constants';
import feedbackService from '../services/feedback.service';
import alertActions from './alert.actions';


function sendFeedback(feedbackDetails) {
    function request(user) { return { type: feedbackConstants.SEND_FEEDBACK_REQUEST, user }; }
    function success(user) { return { type: feedbackConstants.SEND_FEEDBACK_SUCCESS, user }; }
    function failure(error) { return { type: feedbackConstants.SEND_FEEDBACK_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request([feedbackDetails]));
        feedbackService.sendFeedback(feedbackDetails)
            .then(
                (user) => {
                    dispatch(success([user]));
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
    };
}

const feedbackActions = {
    sendFeedback,
};

export default feedbackActions;
