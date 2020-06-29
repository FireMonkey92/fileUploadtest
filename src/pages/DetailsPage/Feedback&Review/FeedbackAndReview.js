import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Rate, Input } from "antd";
import moment from 'moment'
import { Formik, Form } from 'formik';
import InputTextArea from "../../../components/Form/InputTextArea";
import BlankProfilePIc from "../../../assets/images/required/img_avatar.png";
import { feedbackAndReviewForm } from '../../../utils/utils-validation';
import "./FeedbackAndReview.less";

class FeedbackAndReview extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
  submitReview = (values, { resetForm, setErrors }) => {
    const params = {
      message: values.reviews,
      rating: values.ratings
    }
    if (values.ratings !== 0) {
      this.props.handleAddFeedBackRating("ADD_RATING", params);
    }
    this.setState({ open: false });
    // resetForm({})
  };

  renderModal = () => {
    const { TextArea } = Input;
    return (
      <Popup
        // lockScroll
        open={this.state.open}
        closeOnDocumentClick
        onClose={() => this.closeModal()}
      >
        <div className="feedback-model">
          <div className="feedback-model-header flex-row">
            <div className="title">Add Reviews And Ratings</div>
            <div className="close" onClick={() => this.closeModal()}>
              x
            </div>
          </div>
          <div className="feedback-model-body">
            <Formik
              onSubmit={this.submitReview}
              enableReinitialize
              validationSchema={feedbackAndReviewForm}
              render={({ setFieldValue, values, handleChange, errors }) => {
                const EnableBtn = values.avatar ? false : true;
                return (
                  <Form >
                    <div className="form-item">
                      <label className={errors.ratings ? 'error_message' : ''} htmlFor="ratings">{errors.ratings ? errors.ratings : 'Rate Provider: '} </label>
                      <br />
                      <Rate
                        id="rating"
                        name="ratings"
                        onChange={(value) => {
                          setFieldValue('ratings', value)
                        }}
                        value={values.ratings}
                      />
                      <span className="ant-rate-text">{values.ratings}</span>
                    </div>
                    <div className="form-item">
                      <br />
                      <label className={errors.reviews ? 'error_message' : ''} htmlFor="reviews">{errors.reviews ? errors.reviews : 'Enter your comments:'} </label>
                      {/* <InputTextArea
                        row={3}
                        // label='test'
                        // err={errors.reviews}
                        id="reviews"
                        maxLength={200}
                        value={values.reviews}
                        name="reviews"
                        onChange={handleChange}
                        placeholder="Enter your reviews"
                      /> */}
                      <TextArea rows={3}
                        id="reviews"
                        maxLength={200}
                        value={values.reviews}
                        name="reviews"
                        onChange={handleChange}
                        placeholder="Enter your review"
                      />
                    </div>
                    <span>
                      <button
                        type="submit"
                        // disabled={EnableBtn}
                        className="button btn-add-review"
                      // onClick={() => this.submitReview()}
                      >
                        Add Review
                     </button>
                    </span>
                    {/* < div className="account-form-button" >
                      <button disabled={EnableBtn} className={`flex-center ${EnableBtn ? 'disabled' : ' save'}`} type="submit">Save</button>
                    </div> */}
                  </Form>
                )
              }}
            />
          </div>
        </div>
      </Popup >
    );
  };

  render() {
    const feedBacks = this.props.feedBacks;
    return (
      <div className="feedback-Review">
        <div className="head flex-row">
          <div className="title">Feedbacks and Review</div>
          <button
            className="button btn-add-review"
            onClick={() => this.openModal()}
          >
            Write a review
          </button>
          {this.renderModal()}
        </div>
        <div className="body flex-column">
          {feedBacks.length !== 0 ? (
            feedBacks.map((item, index) => {
              return (
                <div className="flex-row comment-container" key={index}>
                  <div className="avatar">
                    {item.imageURL === null || item.imageURL === "" ? (
                      <img src={BlankProfilePIc} alt="avatar" />
                    ) : (
                        <img src={item.imageURL} alt="avatar" />
                      )}
                  </div>
                  <div className="flex-column comment-right">
                    <div className="name">{item.memberName}</div>
                    <div className="date">{moment.utc(item.createdDate).format('DD/MM/YYYY')}</div>
                    <div className="comments">{item.message}</div>
                    <div className="rating">
                      {this.props.isCallingAnyApi &&
                        <>
                          < Rate
                            allowHalf
                            disabled
                            defaultValue={parseFloat(item.rating)}
                            style={{ fontSize: 15, color: "#e65811" }}
                          />
                          <span>{item.rating}</span>
                        </>}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
              <div className="flex-row comment-container">
                <div>No Feedbacks and Review</div>
              </div>
            )}
        </div>
      </div >
    );
  }
}

export default FeedbackAndReview;
