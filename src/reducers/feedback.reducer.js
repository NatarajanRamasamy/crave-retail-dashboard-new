import feedbackConstants from '../constants/feedback.constants';

const initialState = {
    loader: false,
    success: false,
};

function feedback(state = initialState, action) {
    switch (action.type) {
    case feedbackConstants.SEND_FEEDBACK_REQUEST:
        return {
            ...state,
            loader: true,
        };
    case feedbackConstants.SEND_FEEDBACK_SUCCESS:
        return {
            ...state,
            success: true,
            loader: false,
        };
    case feedbackConstants.SEND_FEEDBACK_FAILURE:
        return {
            ...state,
            loader: false,
        };
    default:
        return state;
    }
}

export default feedback;
