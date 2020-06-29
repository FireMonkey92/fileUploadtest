import React from 'react';
import PropTypes from 'prop-types';
import {
    browserName,
} from "react-device-detect";


import "./GetApp.less";

const GetApp = ({ color, playStoreLink, appleStoreLink }) => {


    let isWebViewFlag = false
    if (browserName === "Chrome WebView" || browserName === "WebKit")
        isWebViewFlag = true;

    return (
        <div className="getAPP-container">
            {color && <p className="quote" style={{ color: color ? color : "#FFF" }}>Get the app</p>}
            <div className="flex-row">
                <a target={!isWebViewFlag ? '_blank' : '_self'} href={appleStoreLink && appleStoreLink} >
                    <img src={require('../../assets/images/png/app_Store.png')} alt="app_Store" className="getAPP-button" />
                </a>
                <a target={!isWebViewFlag ? '_blank' : '_self'} href={playStoreLink && playStoreLink}>
                    <img src={require('../../assets/images/png/google_play.png')} alt="google_play" className="getAPP-button" />
                </a>
            </div>
        </div>
    );
}
GetApp.prototype = {
    color: PropTypes.string
}

export default GetApp;