import React, { Component } from 'react'
import { Row, Col, Rate, Button } from 'antd'
import Popup from 'reactjs-popup'
import BlankProfilePIc from "../../../assets/images/required/img_avatar.png";
import './ServiceProviderProfile.less'
import { Heart } from '../../../components/SVGIcons';
import close from '../../../assets/images/png/close-white.png'
import ROUTES from '../../../configs/routes';

class ServiceProviderProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isFav: false,
			isUpdating: undefined,
			open: false
		}
	}

	static getDerivedStateFromProps(props, state) {
		const { providerDetails } = props;
		if (providerDetails !== null && providerDetails !== undefined) {
			if (state.isUpdating)
				return {
					...state,
					isUpdating: false,
				}
			else if (state.isUpdating === undefined)
				return {
					...state,
					isFav: providerDetails.providerDetails.isFavorite == 1 ? true : false
				}
			else
				return {
					...state,
				}
		}

		else
			return state;
	}

	handleFavChange = (id) => {
		this.setState({ isFav: !this.state.isFav, isUpdating: true })
		this.props.addFav(id)
		this.props.refreshPage();
	}

	openModal() {
		this.setState({ open: true });
	}
	closeModal() {
		this.setState({ open: false });
	}
	mobileNumberRender = (providerNumber) => {
		const numbercheck = parseInt(providerNumber)
		if (isNaN(numbercheck)) {

			// return(<div>{providerNumber}</div>)
			return (<div>Provider did Not Provide the Number!</div>)
		}
		else {
			// return(<div>Provider did Not Provide the Number</div>)
			return (<div>{providerNumber}</div>)
		}

	}
	renderModal = () => {
		const providerDetails = this.props.providerDetails || null;
		const providerDetail = providerDetails !== null ? this.props.providerDetails.providerDetails : {};
		const providerNumber = providerDetails !== null ? this.props.providerDetails.providerDetails.mobileNumber : {};

		return (
			<Popup
				lockScroll
				className='callpopup'
				open={this.state.open}
				closeOnDocumentClick
				onClose={() => this.closeModal()}
			>
				<div className="callme-model">
					<div className="left">
						<img src={require('../../../assets/images/png/vintage.png')} alt="callme" />
					</div>
					<div className="right">
						<div className="title">Hi It's {providerDetail.fullName} here, You can reach me on... </div>
						<div className="mobileNumber">
							{/* {providerDetail.mobileNumber} */}
							{this.mobileNumberRender(providerNumber)}
						</div>
					</div>
					<div className="close" >
						<img src={close} className='modalclose' onClick={() => this.closeModal()}></img>
					</div>
				</div>
			</Popup >
		);
	};

	render() {
		const providerDetails = this.props.providerDetails || null;
		const providerDetail = providerDetails !== null ? this.props.providerDetails.providerDetails : {};
		const services = providerDetails !== null ? this.props.providerDetails.services : [];
		if (this.props.isCallingAnyApi)
			return (
				<div className="ServiceProviderProfile">
					<Row type='flex' justify="center" className='detailsHeader'>
						<Col xs={8} sm={8} md={8} lg={8} className='leftSide'>
							<div className='detailsHeader-leftSideflex'>
								<div className='flex-center'>
									<div className='avatar'>
										{
											providerDetail.imageURL
												? <img src={providerDetail.imageURL} alt="imageURL" />
												: <img src={BlankProfilePIc} alt="BlankProfilePIc" />
										}
									</div>
								</div>
								<div className='star'>
									{providerDetails !== null && this.props.isCallingAnyApi ?
										<Rate allowHalf disabled defaultValue={providerDetail.rating} className='rate' /> : null}{providerDetail.rating}
								</div>
								<hr />
								<div className="successfulljobs">
									<div className='jobs'>
										<div className='number'>
											<h2>{providerDetail.jobs}</h2>
										</div>
										<div className='text'>
											Successfull Jobs
                                </div>
									</div>
									<div className='experience'>
										<div className='number'>
											<h2>{providerDetail.experience}</h2>
										</div>
										<div className='text'>
											years of Experience
                                </div>
									</div>
									{/* <div className='time'>
                                    Mon - Sun 08:00AM to 08:00PM
                            </div> */}
								</div>
							</div>
						</Col>
						<Col xs={16} sm={16} md={16} lg={16} className="rightSide" >
							<div className="detailsHeader-nameFlex">
								<div className="nameSection">
									{providerDetail.fullName}
									{providerDetail.IsActive === 1 && <span className="active"></span>}
								</div>
								<div className="leftSideNameSection">
									<div className="heart" onClick={() => this.handleFavChange(providerDetail.providerId)}>
										<Heart color={this.state.isFav === true ? "#e65811" : ""} />
									</div>
								</div>
							</div>
							{/* <h4 className="successrate">Job Success Rate 87%</h4> */}
							<div className="flex-row detailsHeader-departmentFlex ">
								<div className="flex-row tags_container">
									{services !== null
										? services.length > 0 && services.map((item, index) => {
											return (
												<div className="tags" key={index}>
													<span>{item.name}</span>
												</div>
											)
										})
										: null
									}
								</div>
								<div className="flex right">
									<button className="chat" onClick={() => this.props.openChat({ providerID: providerDetail.providerId })}>CHAT</button>
									<button className="call" onClick={() => this.openModal()}>CALL</button>
									<button className="createjob" onClick={() => this.props.goToPage(ROUTES.CREATEJOB, { provider: providerDetail, headerName: "Create Job" })}>CREATE JOB</button>
								</div>
								<div className='starmobile'>
									{providerDetails !== null && this.props.isCallingAnyApi ?
										<Rate allowHalf disabled defaultValue={providerDetail.rating} className='rate' /> : null} {providerDetail.rating}
								</div>
							</div>
							<div className="detailsHeader-paragraph">
								<p>{providerDetail.description}</p>
							</div>
						</Col>
						<div className="detailsHeader-paragraphmobile">
							<p>{providerDetail.description}</p>
						</div>
					</Row>
					<div className="bottom">
						<div>Jobs:{providerDetail.jobs}</div>
						<div>Experience: {providerDetail.experience} years</div>
					</div>
					<button className="create_job" onClick={() => this.props.goToPage(ROUTES.CREATEJOB, { provider: providerDetail, headerName: "Create Job" })} >
						<span>Create Job</span>
					</button>
					{this.renderModal()}
				</div >
			)
		else
			return (<></>)
	}
}
export default ServiceProviderProfile