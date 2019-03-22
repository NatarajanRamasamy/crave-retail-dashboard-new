import React from 'react';
import PropTypes from 'prop-types';

const StoresList = (props) => {
    const {
        storesList, getSelectedStores, storeIdArray,
    } = props;
    return (
        <div className="modal fade modal-store-list" id="modal-select-stores" data-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="position-relative">
                        <button type="button" className="close" data-dismiss="modal">
                            <img src="img/modal-close.svg" alt="" />
                        </button>
                    </div>
                    <div className="modal-body text-center modal-body-alert">
                        <div className="modal-title-text">
                            <h2>
                                Select all stores that this associate may work at
                            </h2>
                        </div>
                        <div className="d-flex flex-grow-1 flex-column align-items-center">
                            <div className="box-list-con d-flex flex-grow-1 flex-column">
                                <ul className="box-list">
                                    {
                                        storesList.map((store, key) => (
                                            // eslint-disable-next-line react/no-array-index-key
                                            <li key={key} className="item">
                                                <div className="item-option">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" onChange={e => getSelectedStores(e, store)} checked={storeIdArray.indexOf(store) > -1} />
                                                        {/* <input type="checkbox" className="custom-control-input" id="customCheck1" name="storeId" checked={storeIdArray.indexOf(store.id) > -1}  />
                          <label onClick={e => getSelectedStores(e,store.id)}  className="custom-control-label" htmlFor="customCheck1"></label> */}
                                                    </div>
                                                </div>
                                                <div className="item-contents">
                                                    {/* <div>
                                <strong>{store.id}</strong>
                              </div> */}
                                                    <div className="d-flex flex-column align-items-start">
                                                        <strong>
                                                            {`ID : ${'0000'.substr(String(store).length) + store}`}
                                                        </strong>
                                                        <span>
                                                            {store.address1}
                                                        </span>
                                                        <span>
                                                            {store.address2}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <button type="button" className="scroll-btn scroll-down-btn">
                                    <img src="img/scroll-div-arrow.svg" alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="alert-options pt-4">
                            <button type="button" className="btn btn-primary btn-ex-padding" data-dismiss="modal">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

StoresList.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    storesList: PropTypes.array.isRequired,
    getSelectedStores: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    storeIdArray: PropTypes.array.isRequired,
};

export default StoresList;
