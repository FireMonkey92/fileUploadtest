import React from 'react'
import ROUTES from '../../configs/routes';

import './ThanksMessage.less';

const ThanksMessage = (props) => {
    const { header, message, routeNavigate, onClickBack, btnLabel } = props;

    return (
        <div className="thanks thanks-container">
            <div className="logo">
                <img src={require('../../assets/images/png/logo_white.png')} alt="logo" />
            </div>
            <h3>{header}</h3>
            <p>{message}</p>
            <div className="button" onClick={() => {
                routeNavigate && routeNavigate(ROUTES.SIGNINUSER);
                onClickBack && onClickBack();
            }}>
                <span className="back_button"><img src={require('../../assets/images/png/left-arrow.png')} alt="back" /></span>
                <span>{btnLabel ? btnLabel : "Back to Sign in"}</span>
            </div>
        </div>
    )
}

export default ThanksMessage;
