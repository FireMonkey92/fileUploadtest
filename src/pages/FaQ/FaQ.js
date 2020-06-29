import React, { Component } from 'react'
import { connect } from "react-redux";
import { Collapse, Row, Col, Icon, Input } from 'antd';
const { Panel } = Collapse;
import _ from 'lodash';
import localization from "../../localization/eng";
import HeaderLanding from '../../components/HeaderLanding/HeaderLanding';
const { Search } = Input;
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './FaQ.less'

class FaQ extends Component {

    constructor(props) {
        super(props)
        this.state = {
            faqs: localization.faq
        };
    };

    handleSearch = (value) => {
        const { faq } = localization;
        const filteredQAs = _.filter(faq, obj => _.includes(obj.question.toLowerCase(), _.trim(value).toLowerCase())
            || _.includes(obj.answer.toLowerCase(), _.trim(value).toLowerCase()));
        this.setState({
            faqs: filteredQAs
        });
    }
    render() {
        const faqs = this.state.faqs;
        return (
            <div>
                {this.props.user.authenticated ? <Header {...this.props} /> : <HeaderLanding />}
                <Row type="flex" justify="center" className="faq_body">
                    <Col xs={23} sm={22} md={22} lg={17} className="faqcontainer" >
                        <div className="faqTitle"><h3 >Frequently Asked Questions</h3></div>
                        <div className="searchContainer">
                            <Search
                                onChange={e => this.handleSearch(e.target.value)}
                                placeholder="Search Here"
                                onSearch={value => this.handleSearch(value)}
                                className="SearchInput"
                            />
                        </div>
                        <div className="faq_list_container">
                            {faqs.length === 0 ? <div className="centerText">
                                <div className="center">No results found..!!</div>
                            </div> :
                                <Collapse expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                    defaultActiveKey={['0']} bordered={false} accordion>
                                    {
                                        faqs.map((item, index) => (
                                            <Panel header={item.question} key={index}>
                                                <p>{item.answer}</p>
                                            </Panel>
                                        ))
                                    }
                                </Collapse>}
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

export default connect(mapStateToProps, null)(FaQ)