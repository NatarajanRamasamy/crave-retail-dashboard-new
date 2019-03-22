import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from '../partials/Sidebar';
import { Header } from '../partials/Header';
import userManageActions from '../../actions/user.manage.actions';

// import moment = require('moment');
const hangerIcon = (
    <svg style={{ height: '11px' }} width="24.5" height="15.499" viewBox="0 0 24.5 15.499">
        <path id="hanger_icon" data-name="hanger icon" d="M1705.047,396.836l-10.553-5.575v-.7l.014,0c1.662-.412,2.778-1.447,2.778-2.779a2.778,2.778,0,0,0-2.778-2.779,2.735,2.735,0,0,0-2.771,2.426.389.389,0,0,0-.006.065s0,.005,0,.008a.5.5,0,0,0,1,0h0a1.555,1.555,0,0,1,.434-.936,1.856,1.856,0,0,1,1.34-.564,1.781,1.781,0,0,1,1.778,1.779,1.4,1.4,0,0,1-.465,1.02,3.371,3.371,0,0,1-1.553.788l-.772.239V390h0v1.265l-10.552,5.575a1.669,1.669,0,0,0-.948,1.468,1.8,1.8,0,0,0,1.887,1.692h20.228a1.8,1.8,0,0,0,1.885-1.692A1.669,1.669,0,0,0,1705.047,396.836Zm-.937,2.159h-20.228a.819.819,0,0,1-.886-.691.678.678,0,0,1,.406-.58l0,0,.005,0,10.583-5.592,10.587,5.592,0,0,0,0a.675.675,0,0,1,.406.58A.818.818,0,0,1,1704.109,399Z" transform="translate(-1681.744 -384.747)" fill="#93969e" stroke="#93969e" strokeWidth="0.5" />
    </svg>
);
const iconClock = (
    <svg style={{ height: '12px' }} width="20" height="20" viewBox="0 0 20 20">
        <g id="Group_169" data-name="Group 169" transform="translate(-894 -619)">
            <path id="Op_component_1" data-name="Op component 1" d="M2625,564a10,10,0,1,0,10,10A10.01,10.01,0,0,0,2625,564Zm0,17.872a7.872,7.872,0,1,1,7.873-7.872A7.881,7.881,0,0,1,2625,581.872Z" transform="translate(-1720.999 55)" fill="#dfdfdf" />
            <path id="Op_component_2" data-name="Op component 2" d="M2628.4,573H2623.9v-5.4a.823.823,0,1,0-1.646,0v6.226a.823.823,0,0,0,.823.823h5.317a.823.823,0,0,0,0-1.647Z" transform="translate(-1719.185 55.693)" fill="#dfdfdf" />
        </g>
    </svg>
);
const requestArrow = (
    <svg style={{ height: '6px' }} width="22.103" height="12.047" viewBox="0 0 22.103 12.047">
        <g id="RequestArrow" transform="translate(0.723 0.702)" opacity="0.7">
            <line id="Line_11" data-name="Line 11" x1="10.488" y2="10.643" transform="translate(10.179)" fill="none" stroke="#eb7a5d" strokeWidth="2" />
            <line id="Line_12" data-name="Line 12" x2="10.179" y2="10.643" fill="none" stroke="#eb7a5d" strokeWidth="2" />
        </g>
    </svg>
);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            init: true,
            updated: false,
            currentGroup: '',
            isReqTimerUpdated: false,
        };
    }

    componentDidMount() {
        const { authentication, dispatch } = this.props;
        const { user } = authentication;
        document.title = 'Crave Retail | Dashboard';
        dispatch(userManageActions.getChangingRoomGroupByStore(user.storeId));
    }

    componentWillReceiveProps(nextProps) {
        const { changingRoomGroupData } = nextProps.userManage;
        // if (nextProps.userManage.changingRoomGroupData !== nextProps.userManage.changingRoomGroupData) {
        // this.handleRequestTimer(changingRoomGroupData);
        // }
        if (changingRoomGroupData.length) {
            this.handleRequestTimer(changingRoomGroupData);
        }
    }

    // componentDidUpdate() {
    //     const { userManage, dispatch } = this.props;
    //     const { data } = userManage.crGroupByStore;
    //     const { updated, init, currentGroup } = this.state;
    //     if (init) {
    //         this.filterCRGroup(data.length && data[0].changingRoomGroup.id);
    //         if (data.length) {
    //             dispatch(userManageActions.getChangingRoomGroup(data[0].changingRoomGroup.id));
    //         }
    //         // eslint-disable-next-line react/no-did-update-set-state
    //         this.setState({ init: false });
    //     }
    //     if (updated) {
    //         setTimeout(() => {
    //             if (currentGroup.length) {
    //                 this.filterCRGroup(currentGroup.changingRoomGroup.id);
    //                 // this.setState({ updated: false })
    //                 // }
    //                 // if (data) {
    //                 // this.props.dispatch(userManageActions.getChangingRoomGroup(data[0].changingRoomGroup.id));
    //                 dispatch(userManageActions.getChangingRoomGroup(currentGroup.changingRoomGroup.id));
    //                 this.setState({ updated: false });
    //             }
    //         }, 300);
    //     }
    // }

    componentDidUpdate() {
        const { userManage, dispatch } = this.props;
        const { data } = userManage.crGroupByStore;
        const { updated, init, currentGroup } = this.state;
        if (init) {
            if (data.length) {
                this.filterCRGroup(data.length && data[0].changingRoomGroup.id);
                dispatch(userManageActions.getChangingRoomGroup(data[0].changingRoomGroup.id));
                dispatch(userManageActions.getDailyReport(data[0].changingRoomGroup.id, moment.utc(moment()).format('YYYY-MM-DD')));
            }
            this.setState({ init: false });
        }
        if (updated) {
            if (currentGroup) {
                this.filterCRGroup(currentGroup[0].changingRoomGroup.id);
                dispatch(userManageActions.getChangingRoomGroup(currentGroup[0].changingRoomGroup.id));
                dispatch(userManageActions.getDailyReport(currentGroup[0].changingRoomGroup.id, moment.utc(moment()).format('YYYY-MM-DD')));
                this.setState({ updated: false });
            }
        }
    }

    getItemsRequested(e, shopperId) {
        const { dispatch } = this.props;
        dispatch(userManageActions.getItemsRequested(shopperId));
    }

    filterCRGroup(idx) {
        const { userManage } = this.props;
        const { data } = userManage.crGroupByStore;
        if (data.length) {
            this.setState({
                currentGroup: data.filter(group => group.changingRoomGroup.id === idx),
            });
        }
    }

    // make a room vacant
    makeVacant(e, roomId, groupId) {
        const { dispatch } = this.props;
        dispatch(userManageActions.makeVacant(roomId, groupId));
        this.setState({ updated: true });
    }

    handleRequestTimer(changingRoomGroupData) {
        const { isReqTimerUpdated } = this.state;
        const timerData = [];
        // eslint-disable-next-line no-unused-expressions
        changingRoomGroupData.length && changingRoomGroupData.map((rooms, roomKey) => {
            rooms.request.length && rooms.request.map((req, reqKey) => {
                const reqTime = moment(req.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
                setInterval(() => {
                    const x = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
                    // let requestedTime = moment.utc(moment(x, "dddd, MMMM Do YYYY, h:mm:ss a").diff(moment(reqTime, "dddd, MMMM Do YYYY, h:mm:ss a"))).format("HH:mm:ss")
                    const requestedTime = moment.utc(moment(x, 'dddd, MMMM Do YYYY, h:mm:ss a').diff(moment(reqTime, 'dddd, MMMM Do YYYY, h:mm:ss a'))).format('mm:ss');
                    timerData.push({ requestedTime, request: req });
                    // eslint-disable-next-line no-param-reassign
                    changingRoomGroupData[roomKey].request[reqKey].requestedTime = requestedTime;
                    this.setState({
                        isReqTimerUpdated: !isReqTimerUpdated,
                    });
                }, 1000);
                return null;
            });
            return null;
        });
    }

    render() {
        const { currentGroup } = this.state;
        const { userManage } = this.props;
        const {
            crGroupByStore, changingRoomGroupData,
        } = userManage;
        return (
            <React.Fragment>
                <div className="container-fill-row bg-light d-flex">
                    <Sidebar data={this.props} />
                    <div className="dash-right-column d-flex flex-grow-1 flex-column">
                        <Header data={this.props} />
                        <div className="content-wraper d-flex flex-grow-1 ">
                            <div className="dash-content">
                                {/* Floor list */}
                                <div className="dash-meganav">
                                    <ul>
                                        {
                                            crGroupByStore && crGroupByStore.data.length
                                                && crGroupByStore.data.map((data, key) => (
                                                    <li key={key}>
                                                        <a href="#!" className={currentGroup.id === data.id ? 'current-item' : ''} onClick={() => this.filterCRGroup(data.id)}>
                                                            <h2>{data.changingRoomGroup.name}</h2>
                                                            <p>
                                                                <span>Associates:</span>
                                                                {
                                                                    data.users.map((user, userKey) => user.role === 'ASSOCIATE' && <span key={userKey}>{`${user.firstName},`}</span>)
                                                                }
                                                            </p>
                                                        </a>
                                                    </li>
                                                ))
                                        }
                                    </ul>
                                </div>

                                {/* Dashboard data */}
                                <div className="dashboard-data">
                                    <div className="dashboard-data-left">
                                        <div className="rooms-list-con">
                                            <div className="item-title">
                                                <div className="col-details align-items-end">
                                                    <span className="item-title-text">Fitting Room Numbers</span>
                                                </div>
                                                <div className="col-associate align-items-end">
                                                    <span className="item-title-text">Associate</span>
                                                </div>
                                                <div className="col-session align-items-end">
                                                    <span className="item-title-text">Session Time</span>
                                                </div>
                                                <div className="col-options align-items-end" />
                                            </div>
                                            {
                                                changingRoomGroupData.length
                                                    && changingRoomGroupData.map((roomGroup, roomKey) => (
                                                        <div key={roomKey} className={roomGroup.room.shopper ? roomGroup.request.length && roomGroup.room.shopper.id === roomGroup.request[roomKey].changingRoom.shopperId ? 'item-room room-filled-requested' : 'item-room room-filled-not-requested' : 'item-room room-empty'}>
                                                            <div className="item-row-top">
                                                                {
                                                                    roomGroup && roomGroup.request.length && roomGroup.room.shopper && roomGroup.request.length && roomGroup.request.find(element => element.changingRoom.shopperId === roomGroup.room.shopper.id && element.status === 'CREATED')
                                                                        ? (
                                                                            <div className="dropdown">
                                                                                <button type="button" className="btn btn-dropdown-bordered dropdown-toggle" data-toggle="dropdown">
                                                                                    <span className="time-stamp">
                                                                                        {roomGroup && roomGroup.request[roomKey].requestedTime ? roomGroup.request[roomGroup.request.length - 1].requestedTime : '00:00'}
                                                                                    </span>
                                                                                    Item(s) Requested
                                                                                    <span className="drop-caret">
                                                                                        {requestArrow}
                                                                                    </span>
                                                                                </button>
                                                                                <div className="dropdown-menu">
                                                                                    {
                                                                                        roomGroup && roomGroup.request.length && roomGroup.request.map((req, reqKey) => (
                                                                                            <a className="dropdown-item" key={reqKey} href="#!">
                                                                                                <div className="">
                                                                                                    {req.sku}
                                                                                                </div>
                                                                                                <div className="d-flex justify-content-between">
                                                                                                    <div>
                                                                                                        Size: S
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        Color: Blue
                                                                                                    </div>
                                                                                                </div>
                                                                                            </a>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        ) : ''
                                                                }
                                                            </div>
                                                            <div className="item-row-bottom">
                                                                <div className="col-details">
                                                                    <div className="room-user">
                                                                        <span className="room-user-count">
                                                                            {roomKey + 1}
                                                                        </span>
                                                                        <span className="room-user-name">
                                                                            {roomGroup.room.shopper && roomGroup.room.shopper.name}
                                                                        </span>
                                                                    </div>
                                                                    {/* <div className="items-count no-child"> */}
                                                                    <div className="items-count collapsed" data-toggle="collapse" data-target={`#collapse-${roomGroup.room.id}`}>
                                                                        {hangerIcon}
                                                                        {roomGroup.room.shopper && roomGroup.room.shopper.items ? roomGroup.room.shopper.items.length : 0}
                                                                    </div>
                                                                </div>
                                                                {
                                                                    roomGroup.room.shopper && (
                                                                        <>
                                                                            <div className="col-associate">
                                                                                John
                                                                            </div>
                                                                            <div className="col-session">
                                                                                {iconClock}
                                                                                {' '}
                                                                                0:15s
                                                                            </div>
                                                                            <div className="col-options">
                                                                                <button type="button" className="btn" onClick={(e) => { this.makeVacant(e, roomGroup.room.id, currentGroup.length && currentGroup[0].changingRoomGroup.id); }}>
                                                                                    MAKE VACANT
                                                                                </button>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                            </div>

                                                            <div className="item-row-panel collapse" id={`collapse-${roomGroup.room.id}`}>
                                                                <div className="item-row-panel-inner">
                                                                    {
                                                                        roomGroup.room.shopper && roomGroup.room.shopper.items.map((item, key) => (
                                                                            <div className="panel-column" key={key}>
                                                                                <div className="panel-cell mb-2">
                                                                                    <div className="mb-1 cloth-name">
                                                                                        {item}
                                                                                    </div>
                                                                                    <div className="d-flex justify-content-between">
                                                                                        <div className="cloth-detail"> Size : XS </div>
                                                                                        <div className="cloth-detail"> Color: Red </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                    <div className="dashboard-data-right">
                                        <div className="dashboard-block-title"> Daily Activity Snapshot </div>
                                        <div className="highlight-box-con">
                                            <div className="highlight-box-row">
                                                <div className="highlight-box">
                                                    <div className="highlight-box-inner">
                                                        <div className="highlight-box-header">
                                                            <span className="highlight-box-avatar sessions">
                                                                <img src="img/Icon-sessions.svg" alt="" />
                                                            </span>
                                                                Total Sessions
                                                        </div>
                                                        <div className="highlight-box-body"> 85 </div>
                                                        <div className="highlight-box-footer">
                                                            <span className="strong-content state-success">+5%</span>
                                                                to last week
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="highlight-box">
                                                    <div className="highlight-box-inner">
                                                        <div className="highlight-box-header">
                                                            <span className="highlight-box-avatar requests">
                                                                <img src="img/requestsicon.svg" alt="" />
                                                            </span>
                                                                Total Request
                                                        </div>
                                                        <div className="highlight-box-body"> 50 </div>
                                                        <div className="highlight-box-footer">
                                                            <span className="strong-content state-danger">– 1%</span>
                                                                to last week
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="highlight-box-row">
                                                <div className="highlight-box">
                                                    <div className="highlight-box-inner">
                                                        <div className="highlight-box-header">
                                                            <span className="highlight-box-avatar products">
                                                                <img src="img/iconproducts.svg" alt="" />
                                                            </span>
                                                            {' '}
                                                                AVG # of Products
                                                        </div>
                                                        <div className="highlight-box-body">
                                                                2.5
                                                        </div>
                                                        <div className="highlight-box-footer">
                                                            <span className="strong-content state-danger">– 5%</span>
                                                                to last week
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="highlight-box">
                                                    <div className="highlight-box-inner">
                                                        <div className="highlight-box-header">
                                                            <span className="highlight-box-avatar response">
                                                                <img src="img/iconresponse.svg" alt="" />
                                                            </span>
                                                                AVG Response Time
                                                        </div>
                                                        <div className="highlight-box-body"> 01m 35s </div>
                                                        <div className="highlight-box-footer">
                                                            <span className="strong-content state-danger">– 4%</span>
                                                                to last week
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="highlight-box-row">
                                                <div className="highlight-box">
                                                    <div className="highlight-box-inner">
                                                        <div className="highlight-box-header">
                                                            <span className="highlight-box-avatar cancelled">
                                                                <img src="img/Iconcancelled.svg" alt="" />
                                                            </span>
                                                                % of Request Canceled

                                                        </div>
                                                        <div className="highlight-box-body">
                                                                0.5

                                                        </div>
                                                        <div className="highlight-box-footer">
                                                            <span className="strong-content state-danger">– 4%</span>
                                                                to last week
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="highlight-box">
                                                    <div className="highlight-box-inner">
                                                        <div className="highlight-box-header">
                                                            <span className="highlight-box-avatar longResponse">
                                                                <img src="img/IconLongResponse.svg" alt="" />
                                                            </span>
                                                                Longest Response Time
                                                        </div>
                                                        <div className="highlight-box-body">
                                                                05m 04s

                                                        </div>
                                                        <div className="highlight-box-footer">
                                                            <span className="strong-content state-danger">– 1m 01s</span>
                                                                to last week
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Dashboard.displayName = 'Dashboard';

Dashboard.propTypes = {
    authentication: PropTypes.shape({
        user: PropTypes.object.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    userManage: PropTypes.shape({
        authentication: PropTypes.shape({
            user: PropTypes.object.isRequired,
        }),
    }).isRequired,
};

function mapStateToProps(state) {
    const { alert, authentication, userManage } = state;
    return {
        alert,
        authentication,
        userManage,
    };
}

export default connect(mapStateToProps)(Dashboard);
