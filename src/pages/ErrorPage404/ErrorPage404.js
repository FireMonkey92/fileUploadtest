import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import error_image from '../../assets/images/png/Error-image.png'

import './ErrorPage404.less';
import ROUTES from '../../configs/routes';

class ErrorPage404 extends React.Component {
    render() {
        return (
            <div className="Error Error-page" >
                <div className="Error-content">
                    <div>
                        <div className="title">
                            Something's wrong here...
                    </div>
                        <div className="content">
                            We can't find a page you're looking for. Head back to home
                    </div>
                        <button onClick={() => this.props.ActionRouteNavigate(ROUTES.HOME)}>Home</button>

                    </div>
                </div>
                <div className="Error-image">
                    <img src={error_image} alt="Error-image" />
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ActionRouteNavigate
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ErrorPage404)