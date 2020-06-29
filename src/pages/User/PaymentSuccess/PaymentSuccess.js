import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ThanksMessage from '../../../components/ThanksMessage/ThanksMessage';
import Loading from '../../../components/Loading/Loading';
import { ActionRouteNavigate } from '../../../store/actions/actions-route'
import ROUTES from '../../../configs/routes';
import { buildRoute } from "../../../configs/routes";



class PaymentSuccess extends Component {

    constructor(props) {
        super(props)
    }

    onClickBack = () => {
        this.props.ActionRouteNavigate(ROUTES.JOBS, { headerName: "Jobs" });
    }
    render() {
        return (
            <div>
                <div>
                    <ThanksMessage
                        header={"Payment successfully done"}
                        btnLabel="Back to jobs page"
                        // message={"Email successfully verified"}
                        onClickBack={this.onClickBack}
                    />
                </div>
                <Loading isloading={this.props.isloading} />
            </div>
        );
    }
}
function mapStateToProps({ rSession, rLoading, rServerData }) {

    return {
        isloading: rLoading.logout,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ActionRouteNavigate
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess)


