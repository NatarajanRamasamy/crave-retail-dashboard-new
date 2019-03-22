import authHeader from '../helpers/auth-header';

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {

                // location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function sendFeedback(feedback) {
    console.log('feedback -->', feedback);
    const authData = authHeader();
    const requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authData ? `${authData.Authorization}` : '',
        },

        body: JSON.stringify({
            name: feedback.name,
            subject: feedback.subject,
            message: feedback.message,
            storeId: parseInt(feedback.storeId, 10),
        }),
    };

    return fetch('/feedback', requestOptions)
        .then(handleResponse)
        .then(user => user);
}

const feedbackService = {
    sendFeedback,
};
export default feedbackService;
