import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, isLength } from 'validator';
import PropTypes from 'prop-types';
import Sidebar from '../partials/Sidebar';
import { Header } from '../partials/Header';
import alertActions from '../../actions/alert.actions';
import {
    REQUIRED,
    LENGTH_REQUIRED,
    MESSAGE_LENGTH,
} from '../../constants/form.constants';
import feedbackActions from '../../actions/feedback.actions';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            feedbackDetails:
            {
                // name: '',
                subject: '',
                storeId: '',
                message: '',
            },
            errors: {
                // name: '',
                subject: '',
                storeId: '',
                message: '',
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitFeedback = this.handleSubmitFeedback.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.validate = this.validate.bind(this);
    }

    // component Did Mount
    componentDidMount() {
        document.title = 'Crave Retail | Feedback';
    }

    // onchange input fields
    handleChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            feedbackDetails: {
                ...prevState.feedbackDetails,
                [name]: value,
            },
            errors: {
                ...prevState.errors,
                [name]: this.validate(name, value),
            },
        }));
    }

    // submit feedback form
    handleSubmitFeedback(e) {
        e.preventDefault();
        const { feedbackDetails } = this.state;
        const { subject, message } = feedbackDetails;
        const { authentication, dispatch } = this.props;
        const storeIdUser = authentication.user.storeId;
        this.setState(prevState => ({
            // loading: true,
            feedbackDetails: {
                ...prevState.feedbackDetails,
                storeId: storeIdUser,
            },
            errors: {
                ...prevState.errors,
                subject: this.validate('subject', subject),
                message: this.validate('message', message),
            },
        }));

        if (subject && message && storeIdUser) {
            this.setState({ loading: true });
            dispatch(feedbackActions.sendFeedback(feedbackDetails));
        }
    }

    handleClick() {
        const { dispatch } = this.props;
        dispatch(alertActions.clear());
        this.setState({
            loading: false,
            feedbackDetails: {
                subject: '',
                storeId: '',
                message: '',
            },
            errors: {
                subject: '',
                storeId: '',
                message: '',
            },
        });
    }

    // validations for input fields
    validate(name, value) {
        switch (name) {
        case 'subject':
            if (isEmpty(value)) {
                return REQUIRED('Subject');
            }
            return '';

        case 'message':
            if (isEmpty(value)) {
                return REQUIRED('Message');
            }
            if (!isLength(value, MESSAGE_LENGTH)) {
                return LENGTH_REQUIRED('Message', { min: MESSAGE_LENGTH });
            }
            return '';

        default:
            return '';
        }
    }

    render() {
        // let storeId = this.props.authentication.user.storeId
        const { feedback } = this.props;
        const { loading, errors } = this.state;
        const { success } = feedback;
        return (
            <React.Fragment>
                <div className="container-fill-row bg-light d-flex">
                    <Sidebar data={this.props} />
                    <div className="dash-right-column d-flex flex-grow-1 flex-column">
                        <Header data={this.props} />

                        <div className="content-wraper d-flex flex-grow-1">
                            <div className="d-flex dash-content flex-column align-items-center justify-content-center dash-content-padding-lg">
                                {
                                    (success && loading) ? (
                                        <div className="card card-sm">
                                            <div className="card-header">
                                                <div>
                                                    Feedback Message
                                                </div>
                                            </div>
                                            <div className="card-body static-message-con d-flex justify-content-center align-items-center">
                                                <div className="alert-message text-center">
                                                    <h4 className="text-success">
                                                            We appreciate all and any feedback.
                                                        <br />
                                                            Thank you for your message!
                                                    </h4>
                                                    <button type="button" className="btn btn-primary btn-ex-padding" onClick={() => this.handleClick()}>
                                                            Okay
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                        : (
                                            <div className="card card-md">
                                                <div className="card-header">
                                                    <div>
                                                            Feedback
                                                    </div>
                                                    <span className="card-header-caption">Feedback will be sent to our CraveRetail partners to improve the quality of this application.</span>
                                                </div>
                                                <div className="card-body">
                                                    <form onSubmit={this.handleSubmitFeedback}>
                                                        <div className="row mb-3">
                                                            <div className="col-md-5">
                                                                <div className="form-group">
                                                                    <label htmlhtmlFor="pwd">Subject</label>
                                                                    {/* <input type="text" className="form-control" id="pwd" placeholder="" /> */}
                                                                    <input type="text" className={errors.subject ? 'form-control input-error' : 'form-control'} name="subject" id="subject" placeholder="" onChange={this.handleChange} />
                                                                    <div className="error-block">{errors.subject}</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-7 d-flex flex-column">
                                                                <p>
                                                                        Please let us know what you like, dislike, or a feature you had that would make using our application more valuable to you. We encourage and appreciate any feedback.
                                                                </p>
                                                                <p>
                                                                        Thank You
                                                                    <br />
                                                                        The Crave Retail Team
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group d-flex flex-column flex-grow-1">
                                                                    <label htmlhtmlFor="pwd">Message</label>
                                                                    {/* <textarea className="form-control flex-grow-1" rows="5" id="comment"></textarea> */}
                                                                    <textarea name="message" className={errors.message ? 'form-control flex-grow-1 input-error' : 'form-control flex-grow-1'} rows="5" id="message" onChange={this.handleChange} />
                                                                    <div className="error-block">{errors.message}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="text-right">
                                                                    <button type="submit" className="btn btn-primary btn-ex-padding">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Feedback.displayName = 'Feedback';

Feedback.propTypes = {
    feedback: PropTypes.shape({
        user: PropTypes.object,
    }),
    dispatch: PropTypes.func.isRequired,
    authentication: PropTypes.shape({
        user: PropTypes.object.isRequired,
    }).isRequired,
};
Feedback.defaultProps = {
    feedback: {},
};

function mapStateToProps(state) {
    const { alert, authentication, feedback } = state;
    return {
        alert,
        authentication,
        feedback,
    };
}

// const connectedFeedbackPage = connect(mapStateToProps)(Feedback);
// export { connectedFeedbackPage as Feedback };

export default connect(mapStateToProps)(Feedback);
