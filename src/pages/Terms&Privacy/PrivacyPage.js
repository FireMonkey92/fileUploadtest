import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "antd";
import localization from "../../localization/eng";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeaderLanding from "../../components/HeaderLanding/HeaderLanding";

class PrivacyPage extends Component {
  render() {
    return (
      <div>
        {this.props.user.authenticated ? (
          <Header {...this.props} />
        ) : (
            <HeaderLanding />
          )}
        <Row type="flex" justify="center" className="Help-Page">
          <Col xs={23} sm={22} md={22} lg={17}>
            <div className="inner-section">
              <div className="help_contents privacypage">
                <h2 className="page-headertwo">
                  Privacy Policy of Sugam Vyappar
                </h2>
                <p>
                  SugamVyapparAggregators Private Limited operates the
                  www.sugamvyappar.com website, which provides the SERVICE.
                </p>
                <div>
                  This page is used to inform website visitors regarding our
                  policies with the collection, use, and disclosure of Personal
                  Information if anyone decided to use our Service, the
                  SugammVyappar website.
                </div>
                <br />
                <br />
                <div>
                  If you choose to use our Service, then you agree to the
                  collection and use of information in relation with this
                  policy. The Personal Information that we collect are used for
                  providing and improving the Service. We will not use or share
                  your information with anyone except as described in this
                  Privacy Policy.
                </div>
                <div>
                  The terms used in this Privacy Policy have the same meanings
                  as in our Terms and Conditions, which is accessible at
                  www.sugamvyappar.com, unless otherwise defined in this Privacy
                  Policy.
                </div>
                <br />
                <br />

                <h2 className="page-headertwo">
                  Information Collection and Use
                </h2>
                <div>
                  For a better experience while using our Service, we may
                  require you to provide us with certain personally identifiable
                  information, including but not limited to your name, phone
                  number, and postal address. The information that we collect
                  will be used to contact or identify you.
                </div>
                <br />
                <br />
                <h2 className="page-headertwo">Log Data</h2>
                <div>
                  We want to inform you that whenever you visit our Service, we
                  collect information that your browser sends to us that is
                  called Log Data. This Log Data may include information such as
                  your computer’s Internet Protocol ("IP") address, browser
                  version, pages of our Service that you visit, the time and
                  date of your visit, the time spent on those pages, and other
                  statistics.
                </div>
                <br />
                <br />
                <h2 className="page-headertwo">Cookies</h2>
                <div>
                  Cookies are files with small amount of data that is commonly
                  used an anonymous unique identifier. These are sent to your
                  browser from the website that you visit and are stored on your
                  computer’s hard drive.
                  <br />
                  Our website uses these "cookies" to collect information and to
                  improve our Service. You have the option to either accept or
                  refuse these cookies, and know when a cookie is being sent to
                  your computer. If you choose to refuse our cookies, you may
                  not be able to use some portions of our Service.
                </div>
                <br />
                <br />
                <h2 className="page-headertwo">Service Providers</h2>
                <div>
                  We may employ third-party companies and individuals due to the
                  following reasons:
                </div>
                <br />
                <div>
                  {" "}
                  • To facilitate our Service;
                  <br />
                  • To provide the Service on our behalf;
                  <br />
                  • To perform Service-related services; or
                  <br />
                  • To assist us in analyzing how our Service is used.
                  <br />
                </div>
                <br />
                <br />
                <div>
                  We want to inform our Service users that these third parties
                  have access to your Personal Information. The reason is to
                  perform the tasks assigned to them on our behalf. However,
                  they are obligated not to disclose or use the information for
                  any other purpose.
                </div>
                <br />
                <br />

                <h2 className="page-headertwo">Security</h2>
                <div>
                  We value your trust in providing us your Personal Information,
                  thus we are striving to use commercially acceptable means of
                  protecting it. But remember that no method of transmission
                  over the internet, or method of electronic storage is 100%
                  secure and reliable, and we cannot guarantee its absolute
                  security.
                </div>
                <br />
                <br />
                <h2 className="page-headertwo">Links to Other Sites</h2>
                <div>
                  Our Service may contain links to other sites. If you click on
                  a third-party link, you will be directed to that site. Note
                  that these external sites are not operated by us. Therefore,
                  we strongly advise you to review the Privacy Policy of these
                  websites. We have no control over, and assume no
                  responsibility for the content, privacy policies, or practices
                  of any third-party sites or services.
                </div>
                <br />
                <br />
                <h2 className="page-headertwo">Children’s Privacy</h2>
                <div>
                  Our Services do not address anyone under the age of 18. We do
                  not knowingly collect personal identifiable information from
                  children under 18. In the case we discover that a child under
                  18 has provided us with personal information, we immediately
                  delete this from our servers. If you are a parent or guardian
                  and you are aware that your child has provided us with
                  personal information, please contact us so that we will be
                  able to do necessary actions.
                </div>
                <br />
                <br />
                <h2 className="page-headertwo">
                  Changes to This Privacy Policy
                </h2>
                <div>
                  We may update our Privacy Policy from time to time. Thus, we
                  advise you to review this page periodically for any changes.
                  We will notify you of any changes by posting the new Privacy
                  Policy on this page. These changes are effective immediately,
                  after they are posted on this page.
                </div>
                <br />
                <br />
                <h2 className="page-headertwo">Contact Us</h2>
                <div>
                  If you have any questions or suggestions about our Privacy
                  Policy, do not hesitate to contact us.
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionRouteNavigate,
    },
    dispatch
  );
}
function mapStateToProps({ rSession }) {
  return {
    user: rSession,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPage);
