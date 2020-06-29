import React, { Component } from 'react'
import { Row, Col, Input } from 'antd'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ROUTES from "../../configs/routes";
import GetApp from '../GetApp/GetApp'
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import companyLogoImage from '../../assets/images/png/logo_white.png'
import Telephone from '../../assets/images/png/telephone.png'
import sentMail from '../../assets/images/png/sent-mail.png'
import localization from '../../localization'
import {
	browserName,
} from "react-device-detect";
import './Footer.less'

const { footerContent } = localization.eng

class Footer extends Component {
	routeNavigation = (loaction, headerName) => {
		if (headerName !== undefined) {
			this.props.ActionRouteNavigate(loaction, { headerName: headerName });
		}
		else
			this.props.ActionRouteNavigate(loaction);
	}


	render() {
		const orig = location && location.origin
		let isWebViewFlag = false
		if (browserName === "Chrome WebView" || browserName === "WebKit")
			isWebViewFlag = true;

		return (
			<Row className='footer' type='flex' justify="center">
				< Col xs={24} sm={24} md={22} lg={17} className='leftSideFooter'>
					<div className="wholefooter">
						<div className="leftfooter">
							<div className='icon'>
								<img src={companyLogoImage} alt='' />
							</div>
							<hr />
							<div className='information'>
								<div className='naigationItem contact' onClick={() => this.routeNavigation(ROUTES.HOME, "Home")} >
									Home
                               </div>
								<div className='naigationItem help' onClick={() => this.routeNavigation(ROUTES.HELP, "Help")}>
									Help
                               </div>
								<div className='naigationItem help' onClick={() => this.routeNavigation(ROUTES.FAQ, "FaQ")}>
									FAQ
                              </div>
								<div className="naigationItem help">
									<div className="copyright">
										<a rel="noopener noreferrer" target={!isWebViewFlag ? '_blank' : '_self'} href={`${orig}${ROUTES.PRIVACY}`} >Privacy Policy</a>
									</div>
								</div>
								<div className="naigationItem faqmobile">
									<div className="copyright">
										<a rel="noopener noreferrer" target={!isWebViewFlag ? '_blank' : '_self'} href={`${orig}${ROUTES.TERMS}`} >Terms Conditions</a>
									</div>
								</div>
							</div>
							<hr />
							<div className='PhoneNumber'>
								<img src={Telephone} />
								<a href={`tel:${footerContent.contactInfo.phoneNummber}`}>{footerContent.contactInfo.phoneNummber}</a>
							</div>
							<div className='email'>
								<img src={sentMail} style={{ paddingRight: 10 }} /> <a rel="noopener noreferrer" target={!isWebViewFlag ? '_blank' : '_self'} href={`mailto:${footerContent.contactInfo.emailAddress}`}>{footerContent.contactInfo.emailAddress}</a>
							</div>
						</div>
						<div className='loansSection'>
							<div className='Loans'>
								Services
                             </div>
							{this.props.serviceList.map((item, index) => {
								if (index < 5)
									return (<div key={index} className='home'>{item.label}</div>)
								else return
							})}
						</div>
						<div className='providersSection'>
							<div className='Providers'>
								Quick Links
							</div>
							<div className="item" onClick={() => this.routeNavigation(ROUTES.HOME, "Home")} >
								Home
                            </div>
							<div className="item" onClick={() => this.routeNavigation(ROUTES.HELP, "Help")}>
								Help
                               </div>
							<div className="item" onClick={() => this.routeNavigation(ROUTES.FAQ, "FaQ")}>
								FAQ
                            </div>
							<div className="item">
								<div className="copyright">
									<a rel="noopener noreferrer" target={!isWebViewFlag ? '_blank' : '_self'} href={`${orig}${ROUTES.PRIVACY}`} >Privacy Policy</a>
								</div>
							</div>
							<div className="item">
								<div className="copyright">
									<a rel="noopener noreferrer" target={!isWebViewFlag ? '_blank' : '_self'} href={`${orig}${ROUTES.TERMS}`} >Terms Conditions</a>
								</div>
							</div>

						</div>
						<div className='socialSection'>
							<div className='Social'>
								Social
                              </div>
							<div className='Sociallinks'>
								<a rel="noopener noreferrer" target={!isWebViewFlag ? '_blank' : '_self'} href={footerContent.socialLinks.facebook} >Facebook</a>
							</div>
							<div className='Sociallinks'>
								<a rel="noopener noreferrer" target={!isWebViewFlag ? '_blank' : '_self'} href={footerContent.socialLinks.instagram} >Instagram</a>
							</div>
							<div className='Sociallinks'>
								<a rel="noopener noreferrer" target={!isWebViewFlag ? '_blank' : '_self'} href={footerContent.socialLinks.linkdin} >LinkedIn</a>
							</div>
							<div className='Sociallinks'>
								<a rel="noopener noreferrer" target={!isWebViewFlag ? '_blank' : '_self'} href={footerContent.socialLinks.twitter} >Twitter</a>
							</div>
							<div className="Sociallinks">
								<a rel="noopener noreferrer" target={!isWebViewFlag ? '_blank' : '_self'} href={footerContent.socialLinks.youtube} >Youtube</a>
							</div>
						</div>

					</div>
					{orig}
					<br />
					{footerContent.contactInfo.poweredBy}
					<div className="copywrite">
						<div className="copyright">
							Copyright © 2020, Sugam Vyappar</div>
						<div className="copyright">
							{"Powered by "}

							{/* <a target={!isWebViewFlag ? '_blank' : '_self'} href={footerContent.contactInfo.poweredBy} >Helenzys Inc</a> */}
							<a rel="noopener noreferrer" href="https://helenzys.com/" >Helenzys Inc</a>
						</div>
					</div>
				</Col>
			</Row >
		)
	}
}

function mapStateToProps({ rSession, rUtils }) {
	return {
		user: rSession,
		serviceList: rUtils.services || []
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		ActionRouteNavigate
	}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer)

