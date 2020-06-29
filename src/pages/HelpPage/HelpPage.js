import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import localization from "../../localization/eng";
import YouTubeVideoIframe from '../../components/YouTubeVideoIframe/YouTubeVideoIframe';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import HeaderLanding from '../../components/HeaderLanding/HeaderLanding';

import "./HelpPage.less";
class HelpPage extends Component {

    _onReady(event) {
        event.target.pauseVideo();
    }
    render() {
        const { helpConents } = localization
        const opts = {
            playerVars: {
                autoplay: 0,
            }
        };
        return (
            <div>
                {this.props.user.authenticated ? <Header {...this.props} /> : <HeaderLanding />}
                <Row type="flex" justify="center" className="Help-Page">
                    <Col xs={23} sm={22} md={22} lg={17} >
                        <h2 className="page-heading">Need help..?</h2>
                        <div className="inner-section">
                            {helpConents.map((item, index) => {
                                return (
                                    <div className="help_contents" key={index}>
                                        <h2 className="page-headertwo">{item.question}</h2>
                                        <p>{item.helpText}</p>
                                        {item.youTubeVideoID && <div className="video-section">
                                            <YouTubeVideoIframe video={item.youTubeVideoID} autoplay="0" rel="0" modest="1" />
                                        </div>}
                                    </div>
                                )
                            })}
                        </div>
                    </Col>
                </Row>
                <Footer />
            </div>
        )
    }
}



function mapStateToProps({ rSession }) {
    return {
        user: rSession,
    }
}


export default connect(mapStateToProps, null)(HelpPage)