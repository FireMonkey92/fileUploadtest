import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionRouteNavigate } from '../../store/actions/actions-route'
import { ActionUserUpdate } from '../../store/actions/actoins-user'
import { ActionGetServices } from '../../store/actions/actions-utils-data'
import './LandingPage.less'
import { Row, Col } from 'antd'
import localization from '../../localization'
import GetApp from '../../components/GetApp/GetApp'
import Footer from '../../components/Footer/Footer'
import HeaderLanding from '../../components/HeaderLanding/HeaderLanding'
import {
  browserName,
} from "react-device-detect";

const { landingPage } = localization.eng

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
  }

  componentDidMount() {
    this.props.ActionUserUpdate('newUser', undefined)
    this.props.ActionUserUpdate('authenticationResponce', undefined)
    this.props.ActionGetServices({ status: 1 })
  }

  render() {
    const { howItWorks, downloadApp, trustedProviders, financing, banner } = landingPage
    let isWebViewFlag = false
    if (browserName === "Chrome WebView" || browserName === "WebKit")
      isWebViewFlag = true;
    console.log('isWebViewFlag : ', isWebViewFlag)
    return (
      <div className='landing-page' >
        <HeaderLanding />
        <div style={{ paddingTop: '70px' }}>
          <div className='landing-page-banner'>
            <Row type='flex' justify='center' className='landing-page-banner-container'>
              <Col
                xs={18}
                sm={18}
                md={18}
                lg={8}>
                <div className='left'>
                  <h2>{banner.title}</h2>
                  <p>
                    {banner.content}
                  </p>
                </div>
              </Col>
              <Col
                xs={18}
                sm={15}
                md={15}
                lg={12}
                className='right'>
                <div className='cover'>
                  <img src={require('../../assets/images/png/mockup.png')} alt='mockup' />
                </div>
              </Col>
            </Row>
          </div>
          <section className='landing-page-howItWork'>
            <Row type='flex' justify='center'>
              <Col
                xs={23}
                sm={22}
                md={19}
                lg={17}>
                <h2>How it works</h2>
                <Row type='flex' justify='center'>
                  {howItWorks.map((item, index) => (
                    <Col
                      xs={24}
                      lg={12}
                      xl={6}
                      key={index}>
                      <div className='box'>
                        <div>
                          <img src={require(`../../assets/images/png/${item.image}`)} alt='howItWork' />
                        </div>
                        <h6>{item.title}</h6>
                        <p>
                          {item.content}
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </section>
          <section className='landing-page-financing'>
            <Row type='flex' justify='center'>
              <Col
                xs={23}
                sm={22}
                md={20}
                lg={20}>
                <Row type='flex' justify='center'>
                  <Col
                    xs={18}
                    sm={18}
                    md={22}
                    lg={10}>
                    <h2>{financing.title}</h2>
                    <p>
                      {financing.content}
                    </p>
                  </Col>
                  <Col
                    xs={18}
                    sm={18}
                    md={18}
                    lg={10}
                    className='right'>
                    <div className='cover'>
                      <img src={require('../../assets/images/png/Financing_group.png')} alt='financing_cover' />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </section>
          <section className='landing-page-trusted_providers'>
            <Row type='flex' justify='center'>
              <Col
                xs={18}
                sm={22}
                md={19}
                lg={17}>
                <div className='landing-page-trusted_providers-container'>
                  <h2>{trustedProviders.title}</h2>
                  <p>
                    {trustedProviders.content}
                  </p>
                </div>
              </Col>
            </Row>
          </section>
          <section className='landing-page-download'>
            {!isWebViewFlag ? <Row type='flex' justify='center' gutter={[15, 0]}>
              <Col
                xs={18}
                sm={18}
                md={18}
                lg={10}>
                <div className='cover'>
                  <img src={require('../../assets/images/png/downloadApp_phone.png')} alt='downloadApp_phone' />
                </div>
              </Col>
              <Col
                xs={18}
                sm={18}
                md={18}
                lg={10}
                className='right'>
                <h2>{downloadApp.title}</h2>
                <p>
                  {downloadApp.content}
                </p>
                <>
                  <GetApp
                    playStoreLink={downloadApp.playStoreLink}
                    appleStoreLink={downloadApp.appleStoreLink}
                  />
                </>
              </Col>
            </Row> : null}
          </section>
        </div>
        <Footer />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionRouteNavigate,
      ActionUserUpdate,
      ActionGetServices
    },
    dispatch
  )
}

export default connect(null, mapDispatchToProps)(LandingPage)
