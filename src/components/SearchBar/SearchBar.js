import React, { Component } from "react";
import { Row, Col, Input } from "antd";
import "./SearchBar.less";
import pin from "../../assets/images/png/pin.png";
import controls from "../../assets/images/png/controls.png";
const { Search } = Input;
import FilterData from "./FilterData/Filter";

class SearchBar extends Component {
  state = {
    visible: false
  };

  showFilter = () => {
    this.setState({
      visible: !this.state.visible
    });
  };
  filterHandler = params => {

    this.props.filterHandler(params);
  };

  render() {
    return (
      <div style={{ paddingTop: 60 }}>
        <Row type="flex" align="middle" justify="center" className="SearchBar">
          <Col xs={23} sm={22} md={17} className="SearchBarheader">
            <Col xs={17} sm={10} md={10} lg={10} className="ColSearch">
              <Search
                placeholder="Search Here"
                onSearch={value => this.props.searchHandler(value)}
                className="SearchInput"
              />
            </Col>
            {/* <Col xs={1} sm={1} md={1} lg={1} className="ColLocation">
              <img src={pin} />
            </Col>
            <Col xs={6} sm={9} md={9} lg={9} className="locationText">
              Bangalore
            </Col> */}
            <Col
              xs={6}
              sm={4}
              md={4}
              lg={4}
              className="ColFilter"
              onClick={this.showFilter}
            >
              <div className="filter-button">
                <img src={controls} className="filterImage"></img>Filter
              </div>
            </Col>
          </Col>
        </Row>
        {this.state.visible ? (
          <FilterData
            filterData={this.props.filterData}
            filterHandler={this.filterHandler}
          />
        ) : null}
      </div>
    );
  }
}

export default SearchBar;
