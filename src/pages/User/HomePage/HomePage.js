import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionRouteNavigate } from "../../../store/actions/actions-route";
import { ActionGetAllProvider } from "../../../store/actions/actions-server-data";
import { ActionAddFav } from "../../../store/actions/actoins-user";
import {
  ActionGetQualification,
  ActionGetServices,
} from "../../../store/actions/actions-utils-data";
import { Row, Col, Pagination } from "antd";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ListWidgets from "../../../components/ListWidgets/ListWidgets";
import Loading from "../../../components/Loading/Loading";
import LoadingWidgets from "../../../components/Loading/LoadingWidgets";
import ROUTES from "../../../configs/routes";
import "./HomePage.less";

class HomePage extends Component {
  state = {
    providerData: [],
    activePage: 1,
    sortBy: undefined,
    qualificationId: undefined,
    serviceId: undefined,
  };

  componentDidMount() {
    const { role, token, id } = this.props.user;

    const Params = {
      userId: id,
      // "pgSkip": 0,
      // "pgLimit": 10,
      // "sortBy": "experience",
      sortByFlag: 1,
      // "cityId": 1,
      // "qualificationId": 1,
      // "serviceId": 1,
      // "providerType": "P",
      // "favorite": 0
    };
    const header = {
      role,
      "x-access-token": token,
    };
    this.props.ActionGetAllProvider(Params, header);
    const parameters = {
      status: 1,
    };
    this.props.ActionGetQualification(parameters);
    this.props.ActionGetServices(parameters);
  }

  static getDerivedStateFromProps(props, state) {
    const { providerData } = props;
    if (providerData !== undefined)
      return {
        ...state,
        providerData: providerData.providers,
      };
    else return state;
  }

  addToFav = (user) => {
    const { activePage } = this.state;
    const { role, token, id } = this.props.user;

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
      // "favorite": 0
    };

    this.props.ActionAddFav(Params, header, { pageType: "HOME" }, extraParams);
  };

  pageChange = (data) => {
    const { role, token, id } = this.props.user;
    const { sortBy, qualificationId, serviceId } = this.state;

    const Params = {
      userId: id,
      pgSkip: (data - 1) * 10,
      pgLimit: 10,
      sortBy,
      sortByFlag: 1,
      // "cityId": 1,
      qualificationId,
      serviceId,
      // "providerType": "P",
      // "favorite": 0
    };

    const header = {
      role,
      "x-access-token": token,
    };
    this.setState({ activePage: data });
    this.props.ActionGetAllProvider(Params, header);
    if (window) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  goToDetailsPage = (user) => {
    this.props.ActionRouteNavigate("DetailsPage", {
      providerId: user.providerId,
      headerName: "Provider Details",
    });
  };

  filterHandler = (filterParams, resetForm) => {
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
      // "favorite": 0
    };
    this.setState({
      sortBy: filterParams.sortBy,
      qualificationId: filterParams.qualificationId,
      serviceId: filterParams.serviceId,
      activePage: 1,
    });

    this.props.ActionGetAllProvider(Params, header);
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
      name: value
    };
    this.props.ActionGetAllProvider(Params, header);
  };

  renderProviderList = () => {
    const { isprovidersLoading } = this.props;
    const { providerData } = this.state;

    if (!isprovidersLoading && providerData.length > 0)
      return providerData.map((item, index) => {
        return (
          <ListWidgets
            user={item}
            key={item.providerId}
            addToFav={(user) => this.addToFav(user)}
            goToDetailsPage={(user) => this.goToDetailsPage(user)}
          />
        );
      });
    else if (isprovidersLoading)
      return [0, 1, 2].map((index) => <LoadingWidgets key={index} />);
    else return <div className="flex-center no_data">No Data Found !</div>;
  };

  render() {
    const { isloading, isloadingHome } = this.props;
    const totalCount =
      this.props.providerData !== undefined
        ? this.props.providerData.totalCount
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
          filterData={filterData}
          filterHandler={this.filterHandler}
          searchHandler={this.searchHandler}
        />
        <Row type="flex" justify="center" className="home_body">
          <Col span={17} md={17} xs={23}>
            <p className="providers">Providers</p>
            {this.renderProviderList()}
            <div>
              {this.state.providerData.length > 0 && (
                <Pagination
                  defaultCurrent={1}
                  total={totalCount}
                  onChange={this.pageChange}
                />
              )}
            </div>
          </Col>
        </Row>
        <Footer />
        <Loading isloading={isloading} />
      </div>
    );
  }
}

function mapStateToProps({ rSession, rLoading, rServerData, rUtils }) {
  return {
    user: rSession,
    isloading: rLoading.addfav,
    isloadingHome: rLoading.providers,
    isprovidersLoading: rLoading.providers,
    providerData: rServerData.providers,
    qualification: rUtils.qualification,
    services: rUtils.services,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionRouteNavigate,
      ActionGetAllProvider,
      ActionGetQualification,
      ActionGetServices,
      ActionAddFav,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
