import React, { Component } from "react";
import { Row, Col, Rate } from "antd";
import "./ListWidgets.less";
import { Heart } from "../SVGIcons";

class ListWidgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: this.props.user.isFavorite,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      heart: props.user.isFavorite,
    };
  }

  handleHeartClick = () => {
    // this.setState({ heart: !this.state.heart })
    this.props.addToFav(this.props.user);
  };

  goToDetailsPage = () => {
    this.props.goToDetailsPage(this.props.user);
  };

  render() {
    const {
      fullName,
      services,
      rating,
      description,
      experience,
      imageURL,
      isActive,
      jobs
    } = this.props.user;
    const BlankPic = require("../../assets/images/required/img_avatar.png");
    return (
      <div className="listWidgets">
        <div className="listWidgets-body">
          <div className="listWidgets-body-head">
            <div className="image_container">
              <img
                src={imageURL === null || imageURL === "" ? BlankPic : imageURL}
                alt="BlankProfilePIc"
              />
            </div>
            <div className="name_container">
              <div className="name" onClick={() => this.goToDetailsPage()}>
                {fullName}
                {isActive === 1 ? <span className="active"></span> : null}
              </div>
              <div className="tags_container">
                {services !== undefined &&
                  services.map((item, index) => {
                    return (
                      <div className="tags" key={index}>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
              </div>
              <div className="heart" onClick={() => this.handleHeartClick()}>
                <Heart color={this.state.heart === 1 ? "#e65811" : ""} />
              </div>
              <div className="rating">
                <Rate
                  allowHalf
                  disabled
                  defaultValue={rating}
                  style={{ fontSize: 15 }}
                />
                <span>{rating}</span>
              </div>
            </div>
          </div>
          <Row type="flex" align="middle">
            <Col>
              <div className="list_contain">
                <p>{description}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="listWidgets-footer">
          <div className="exp">
            <span>{experience} years of Experience</span> <span>Jobs : {jobs && jobs}</span>
          </div>
          <div>
            <button onClick={() => this.goToDetailsPage()}>Full Details</button>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default ListWidgets;
