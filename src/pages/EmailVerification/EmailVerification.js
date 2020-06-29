import React, { Component } from 'react';
import ThanksMessage from '../../components/ThanksMessage/ThanksMessage';
import Loading from '../../components/Loading/Loading';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionRouteNavigate } from '../../store/actions/actions-route'
import { ActionVeifyEmailAddress } from '../../store/actions/actoins-user'
import ROUTES from '../../configs/routes';
import { UtilsHelper } from '../../utils/utils-helper';



class EmailVerification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tokenFromUrl: UtilsHelper.readUrlByKey("token") ||
                "dbb8118dd1803664ba825608cbe22e039cc0213ed0c5d8708fefd6fe7c9db5f8"
        }
    }

    onClickBack = () => {
        this.props.ActionRouteNavigate(ROUTES.SIGNINUSER);
    }

    componentDidMount() {
        console.log(this.state.tokenFromUrl)
        this.props.ActionVeifyEmailAddress(this.state.tokenFromUrl)
    }

    render() {
        return (
            <div>
                <div>
                    <ThanksMessage
                        header={"Thanks for registering with us "}
                        message={this.props.verifyResponce && this.props.verifyResponce.message}
                        onClickBack={this.onClickBack} />
                    <Loading isloading={this.props.isVerifying} />
                    }
                </div>
            </div>
        );
    }
}
function mapStateToProps({ rLoading, rUser }) {

    return {
        isVerifying: rLoading.verifyEmail,
        verifyResponce: rUser.verifyEmail || false
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ActionRouteNavigate,
        ActionVeifyEmailAddress
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification)


