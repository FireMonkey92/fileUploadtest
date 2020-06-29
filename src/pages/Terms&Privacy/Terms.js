import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "antd";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeaderLanding from "../../components/HeaderLanding/HeaderLanding";

class Terms extends Component {
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
              <div className="help_contents termspage">
                <h2 className="page-headertwo">
                  Terms and conditions
                </h2>
                <p>
                  This website is owned and operated by Sugamvyappar Aggregators
                  Private Limited, having its registered office at 152, Aziz
                  Sait Industrial Town, Nayandhalli Mysore Road,
                  Bangalore-560039, India. By visiting our website and accessing
                  the information, Service Offerings, services, products, and
                  tools we provide, you understand and agree to accept and
                  adhere to the following terms and conditions as stated in this
                  policy (hereafter referred to as ‘User Agreement’), along with
                  the terms and conditions as stated in our Privacy Policy
                  (please refer to the Privacy Policy section below for more
                  information).
                </p>
                <br />
                <p>
                  We reserve the right to change this User Agreement from time
                  to time without notice. You acknowledge and agree that it is
                  your responsibility to review this User Agreement periodically
                  to familiarize yourself with any modifications. Your continued
                  use of this site after such modifications will constitute
                  acknowledgment and agreement of the modified terms and
                  conditions.
                </p>
                <br />
                <p>
                  By visiting our website and accessing the information, Service
                  Offerings, service and other offerings we provide for you,
                  either directly or indirectly (hereafter referred to as
                  ‘Service Offerings’), you agree to use these Service Offerings
                  only for the purposes intended as permitted by
                </p>
                <br />
                <div>
                  a. the terms of this User Agreement,
                  <br />
                  b. applicable laws, regulations and generally accepted online
                  practices or guidelines.
                </div>
                <br />
                <p>Wherein, you understand that:</p>
                <br />
                <div>
                  c. In order to access our Service Offerings, you may be
                  required to provide certain information about yourself (such
                  as identification, email, phone number, contact details, etc.)
                  as part of the registration process, or as part of your
                  ability to use the Service Offerings. You agree that any
                  information you provide will always be accurate, correct, and
                  up to date.
                  <br />
                  <br />
                  d. You are responsible for maintaining the confidentiality of
                  any login information associated with any account you use to
                  access our Service Offerings. Accordingly, you are responsible
                  for all activities that occur under your account/s.
                  <br />
                  <br />
                  e. Accessing (or attempting to access) any of our Service
                  Offerings by any means other than through the means we
                  provide, is strictly prohibited. You specifically agree not to
                  access (or attempt to access) any of our Service Offerings
                  through any automated, unethical or unconventional means.
                  <br />
                  <br />
                  f. Engaging in any activity that disrupts or interferes with
                  our Service Offerings, including the servers and/or networks
                  to which our Service Offerings are located or connected, is
                  strictly prohibited.
                  <br />
                  <br />
                  g. Attempting to copy, duplicate, reproduce, sell, trade, or
                  resell our Service Offerings is strictly prohibited.
                  <br />
                  <br />
                  h. Depending on the service offering chosen by any person or
                  entity while checking out on various service pages on the
                  website may require a specimen signature as a part of the
                  documentation either for fulfilment of the order or not and
                  this may be used for self attestation of documents required to
                  be done so, which may be for fulfilment of the chosen order.
                  Sugamvyappar holds the right to do so on behalf of its clients
                  and shall not be held guilty of misconduct or forgery in such
                  cases under any circumstances.
                  <br />
                  <br />
                  i. You are solely responsible any consequences, losses, or
                  damages that we may directly or indirectly incur or suffer due
                  to any unauthorized activities conducted by you, as explained
                  above, and may incur criminal or civil liability.
                  <br />
                  <br />
                  j. We may provide various open communication tools on our
                  website, such as blog comments, blog posts, public chat,
                  forums, message boards, newsgroups, product ratings and
                  reviews, various social media services, etc. You understand
                  that generally we do not pre-screen or monitor the content
                  posted by users of these various communication tools, which
                  means that if you choose to use these tools to submit any type
                  of content to our website, then it is your personal
                  responsibility to use these tools in a responsible and ethical
                  manner. By posting information or otherwise using any open
                  communication tools as mentioned, you agree that you will not
                  upload, post, share, or otherwise distribute any content that:
                  <br />
                  <br />
                  i. Is illegal, threatening, defamatory, abusive, harassing,
                  degrading, intimidating, fraudulent, deceptive, invasive,
                  racist, or contains any type of suggestive, inappropriate, or
                  explicit language;
                  <br />
                  <br />
                  ii. Infringes on any trademark, patent, trade secret,
                  copyright, or other proprietary right of any party;
                  <br />
                  <br />
                  iii.Contains any type of unauthorized or unsolicited
                  advertising;
                  <br />
                  <br />
                  iv. Impersonates any person or entity, including any
                  Sugamvyappar employees or representatives.
                  <br />
                  <p>
                    We have the right at our sole discretion to remove any
                    content that, we feel in our judgment does not comply with
                    this User Agreement, along with any content that we feel is
                    otherwise offensive, harmful, objectionable, inaccurate, or
                    violates any 3rd party copyrights or trademarks. We are not
                    responsible for any delay or failure in removing such
                    content. If you post content that we choose to remove, you
                    hereby consent to such removal, and consent to waive any
                    claim against us.
                  </p>
                  <br />
                  <div>
                    k. We do not assume any liability for any content posted by
                    you or any other 3rd party users of our website. However,
                    any content posted by you using any open communication tools
                    on our website, provided that it doesn’t violate or infringe
                    on any 3rd party copyrights or trademarks, becomes the
                    property of Sugamvyappar, and as such, gives us a perpetual,
                    irrevocable, worldwide, royalty-free, exclusive license to
                    reproduce, modify, adapt, translate, publish, publicly
                    display and/or distribute as we see fit. This only refers
                    and applies to content posted via open communication tools
                    as described, and does not refer to information that is
                    provided as part of the registration process, necessary in
                    order to use our Service Offerings. All information provided
                    as part of our registration process is covered by our
                    Privacy Policy
                  </div>
                  <br />
                  <div>
                    l. You agree to indemnify and hold harmless Sugamvyappar a
                    digital property of Sugamvyappar Aggregators Private Limited
                    and its affiliates, and their directors, officers, managers,
                    employees, donors, agents, and licensors, from and against
                    all losses, expenses, damages and costs, including
                    reasonable attorneys’ fees, resulting from any violation of
                    this User Agreement or the failure to fulfill any
                    obligations relating to your account incurred by you or any
                    other person using your account. We reserve the right to
                    take over the exclusive defense of any claim for which we
                    are entitled to indemnification under this User Agreement.
                    In such event, you shall provide us with such cooperation as
                    is reasonably requested by us.
                  </div>
                  <br />
                  <p>
                    Your privacy is very important to us, which is why we’ve
                    created a separate Privacy Policy in order to explain in
                    detail how we collect, manage, process, secure, and store
                    your private information. Our Privacy Policy is included
                    under the scope of this User Agreement. To read our Privacy
                    Policy in its entirety, click here.
                  </p>
                  <br />
                  <div>
                    By using our website, you understand and agree that all
                    Service Offerings we provide are “as is” and “as available”.
                    This means that we do not represent or warrant to you that:
                    <br />
                    <br />
                    a. the use of our Service Offerings will meet your needs or
                    requirements.
                    <br />
                    <br />
                    b. the use of our Service Offerings will be uninterrupted,
                    timely, secure or free from errors.
                    <br />
                    <br />
                    c. the information obtained by using our Service Offerings
                    will be accurate or reliable, and
                    <br />
                    <br />
                    d. any defects in the operation or functionality of any
                    Service Offerings we provide will be repaired or corrected.
                    Furthermore, you understand and agree that:
                    <br />
                    <br />
                    e. any content downloaded or otherwise obtained through the
                    use of our Service Offerings is done at your own discretion
                    and risk, and that you are solely responsible for any damage
                    to your computer or other devices for any loss of data that
                    may result from the download of such content.
                    <br />
                    <br />
                    f. no information or advice, whether expressed, implied,
                    oral or written, obtained by you from sugamvyappar or
                    through any Service Offerings we provide shall create any
                    warranty, guarantee, or conditions of any kind, except for
                    those expressly outlined in this User Agreement.
                    <br />
                  </div>
                  <br />
                  <p>
                    In conjunction with the Limitation of Warranties as
                    explained above, you expressly understand and agree that any
                    claim against us shall be limited to the amount you paid, if
                    any, for use of products and/or services. Sugamvyappar will
                    not be liable for any direct, indirect, incidental,
                    consequential or exemplary loss or damages which may be
                    incurred by you as a result of using our Service Offerings,
                    or as a result of any changes, data loss or corruption,
                    cancellation, loss of access, or downtime to the full extent
                    that applicable limitation of liability laws apply.
                  </p>
                  <br />
                  <b />
                  <p>
                    All content and materials available on www.sugamvyappar.com,
                    including but not limited to text, graphics, website name,
                    code, images and logos are the intellectual property of
                    Sugamvyappar Aggregators Private Limited, and are protected
                    by applicable copyright and trademark law. Any inappropriate
                    use, including but not limited to the reproduction,
                    distribution, display or transmission of any content on this
                    site is strictly prohibited, unless specifically authorized
                    by Sugamvyappar AggregatorsPrivate Limited.
                  </p>
                  <br />
                  <b />
                  <p>
                    You agree that we may, at our sole discretion, suspend or
                    terminate your access to all or part of our website and
                    Service Offerings with or without notice and for any reason,
                    including, without limitation, breach of this User
                    Agreement. Any suspected illegal, fraudulent or abusive
                    activity may be grounds for terminating your relationship
                    and may be referred to appropriate law enforcement
                    authorities. Upon suspension or termination, your right to
                    use the Service Offerings we provide will immediately cease,
                    and we reserve the right to remove or delete any information
                    that you may have on file with us, including any account or
                    login information.
                  </p>
                  <br />
                  <b />
                  <p>
                    This website is controlled by Sugamvyappar Aggregators
                    Private Limited from our offices located in the state of
                    Karnataka, India. It can be accessed by most countries
                    around the world. As each country has laws that may differ
                    from those of Karnataka, India by accessing our website, you
                    agree that the statutes and laws of Karnataka, India without
                    regard to the conflict of laws and the United Nations
                    Convention on the International Sales of Goods, will apply
                    to all matters relating to the use of this website and the
                    purchase of any products or services through this site.
                    Furthermore, any action to enforce this User Agreement shall
                    be brought within local jurisdiction of courts located in
                    Bengaluru, Karnataka, India. You hereby agree to personal
                    jurisdiction by such courts, and waive any jurisdictional,
                    venue, or inconvenient forum objections to such courts.
                  </p>
                  <br />
                  <b />
                  <p>
                    Cancellation of order is possible even after the payment has
                    been made however, only the balance amount which is
                    unutilised towards processing the order can be refunded.
                    .Some order executions are done stepwise and have a
                    committed fee payment for each of the step to the
                    government, vendors or channel partners and hence such
                    portions cannot be refunded. However, in case of
                    non-performance of service by Sugamvyappar Aggregators
                    Private Limited you are entitled to refund of the entire
                    professional fee element as per the Satisfaction Guarantee
                    Policy listed on the website.
                  </p>
                  <br />
                  <b />
                  <p>
                    UNLESS OTHERWISE EXPRESSED, SUGAMVYAPPAR EXPRESSLY DISCLAIMS
                    ALL WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS
                    OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED
                    WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A
                    PARTICULAR PURPOSE AND NON-INFRINGEMENT.
                  </p>
                  <br />
                  <b />
                  <p>
                    If you have any questions or comments about our Terms of
                    Service as outlined above, you can contact us at: THE
                    CONTACT INFORMATION LISTED IN WWW.SUGAMVYAPPAR.COM
                  </p>
                  <br />
                  <b />
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

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
