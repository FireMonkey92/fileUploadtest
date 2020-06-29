import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Pagination } from "antd";
import { ActionRouteNavigate } from "../../../store/actions/actions-route";
import {
  ActionGetFavorites,
  ActionGetAllProvider,
} from "../../../store/actions/actions-server-data";
import {
  ActionGetQualification,
  ActionGetServices,
} from "../../../store/actions/actions-utils-data";
import { ActionAddFav } from "../../../store/actions/actoins-user";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ListWidgets from "../../../components/ListWidgets/ListWidgets";
import Loading from "../../../components/Loading/Loading";
import LoadingWidgets from "../../../components/Loading/LoadingWidgets";

import "./Favorites.less";

class Favorites extends Component {
  state = {
    favoritesData: [],
    activePage: 1,
  };

  componentDidMount() {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const Params = {
      userId: id,
      pgSkip: 0,
      pgLimit: 10,
      // "sortBy": "experience",
      sortByFlag: 1,
      // "cityId": 1,
      // "qualificationId": 1,
      // "serviceId": 1,
      // "providerType": "P",
      favorite: 1,
    };

    this.props.ActionGetFavorites(Params, header);
    const parameters = {
      status: 1,
    };
    this.props.ActionGetQualification(parameters);
    this.props.ActionGetServices(parameters);
  }

  static getDerivedStateFromProps(props, state) {
    const { favoritesData } = props;
    if (favoritesData !== undefined)
      return {
        ...state,
        favoritesData: favoritesData.providers,
      };
    else return state;
  }

  addToFav = async (user) => {
    const { role, token, id } = this.props.user;
    const { activePage } = this.state;

    const header = {
      role,
      "x-access-token": token,
    };
    const Params = {
      memberId: id,
      providerId: user.providerId,
    };
    const extraParams = {
      userId: id,
      pgSkip: (activePage - 1) * 10,
      pgLimit: 10,
      // "sortBy": "experience",
      sortByFlag: 1,
      // "cityId": 1,
      // "qualificationId": 1,
      // "serviceId": 1,
      // "providerType": "P",
      favorite: 1,
    };

    this.props.ActionAddFav(Params, header, { pageType: "FAV" }, extraParams);
  };

  goToDetailsPage = (user) => {
    this.props.ActionRouteNavigate("DetailsPage", {
      providerId: user.providerId,
      headerName: "Provider Details",
    });
  };

  filterHandler = (filterParams) => {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const Params = {
      userId: id,
      pgSkip: 0,
      pgLimit: 10,
      sortBy: filterParams.sortBy,
      sortByFlag: 1,
      // "cityId": 1,
      qualificationId: filterParams.qualificationId,
      serviceId: filterParams.serviceId,
      // "providerType": "P",
      favorite: 1,
    };

    // this.props.ActionGetAllProvider(Params, header)
    this.props.ActionGetFavorites(Params, header);
  };

  pageChange = (data) => {
    const { role, token, id } = this.props.user;
    const Params = {
      userId: id,
      pgSkip: (data - 1) * 10,
      pgLimit: 10,
      // "sortBy": "experience",
      sortByFlag: 1,
      // "cityId": 1,
      // "qualificationId": 1,
      // "serviceId": 1,
      // "providerType": "P",
      favorite: 1,
    };
    const header = {
      role,
      "x-access-token": token,
    };
    this.setState({ activePage: data });
    this.props.ActionGetFavorites(Params, header);
    if (window) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  searchHandler = (value) => {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const Params = {
      userId: id,
      pgSkip: 0,
      pgLimit: 10,
      name: value,
      favorite: 1,
    };
    this.props.ActionGetFavorites(Params, header);
  };
  render() {
    const { favoritesData } = this.state;
    const { isfavLoading } = this.props;
    const totalCount =
      this.props.favoritesData !== undefined
        ? this.props.favoritesData.totalCount
        : 0;

    const filterData = {
      qualification: this.props.qualification,
      services: this.props.services,
    };
    return (
      <div>
        <Header {...this.props} />
        <SearchBar
          {...this.props}
          searchHandler={this.searchHandler}
          filterData={filterData}
          filterHandler={this.filterHandler}
        />
        <Row type="flex" justify="center" className="fav_body">
          <Col span={17} md={17} xs={23}>
            <div className="flex space-between">
              <p className="providers">Your Favorites</p>
            </div>
            {!isfavLoading && favoritesData.length > 0 ? (
              <>
                {favoritesData.map((item, index) => (
                  <ListWidgets
                    user={item}
                    key={index}
                    addToFav={(user) => this.addToFav(user)}
                    goToDetailsPage={(user) => this.goToDetailsPage(user)}
                    parentPage={"Favorites"}
                  />
                ))}
                <div>
                  {totalCount > 0 && (
                    <Pagination
                      defaultCurrent={1}
                      total={totalCount}
                      onChange={this.pageChange}
                    />
                  )}
                </div>
              </>
            ) : isfavLoading ? (
              [0, 1, 2].map((index) => <LoadingWidgets key={index} />)
            ) : (
                  <div className="flex-center no_data">No Data Found !</div>
                )}
          </Col>
        </Row>
        <Footer />
        <Loading isloading={this.props.isloading} />
      </div>
    );
  }
}

function mapStateToProps({ rLoading, rSession, rServerData, rUtils }) {
  return {
    user: rSession,
    isloading: rLoading.logout || rLoading.addfav,
    isfavLoading: rLoading.favorites || rLoading.providers,
    favoritesData: rServerData.favorites,
    qualification: rUtils.qualification,
    services: rUtils.services,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionRouteNavigate,
      ActionGetFavorites,
      ActionGetQualification,
      ActionGetAllProvider,
      ActionGetServices,
      ActionAddFav,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
