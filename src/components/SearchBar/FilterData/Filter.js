import React, { Component } from "react";
import "./Filter.less";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import SingleSelect from "../../../components/Form/SingleSelect";

const initialParams = {
  sortBy: undefined,
  qualificationId: undefined,
  serviceId: undefined
};

class FilterData extends Component {
  onSubmit = (values, actions) => {
    this.props.filterHandler(values, actions);
  };

  resetForm = (values, actions) => {

    if (values.sortBy || values.qualificationId || values.serviceId)
      this.props.filterHandler(initialParams);
    actions.resetForm(initialParams);

  };

  render() {
    const { qualification, services } = this.props.filterData;
    let qualificationData = qualification !== undefined ? qualification : [];
    let servicesData = services !== undefined ? services : [];
    let sortData = [{ label: "Years Of Experience", value: "experience" }];
    
    return (
      <div>
        <Row
          type="flex"
          align="middle"
          justify="center"
          className="filterHeader"
        >
          <Formik
            initialValues={{
              ...initialParams
            }}
            enableReinitialize
            onSubmit={this.onSubmit}
            onReset={this.resetForm}
            render={({ values, setFieldValue, handleBlur, errors }) => {
              const EnableBtn = values.sortBy || values.qualificationId || values.serviceId ? false : true;
              return (
                <Col xs={23} sm={22} md={17}>
                  <Form>
                    <Col xs={12} sm={12} md={6} lg={6}>
                      <SingleSelect
                        className="sortBy"
                        name="sortBy"
                        err={errors.sortBy}
                        value={_.filter(sortData, obj => obj.value === values.sortBy)}
                        options={sortData}
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                        placeholder="Sort By"

                      />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                      <SingleSelect
                        className="qualificationId"
                        name="qualificationId"
                        err={errors.qualificationId}
                        value={_.filter(qualificationData, obj => obj.value === values.qualificationId)}
                        options={qualificationData}
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                        placeholder="Qualification"

                      />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                      <SingleSelect
                        className="serviceId"
                        name="serviceId"
                        err={errors.serviceId}
                        value={_.filter(servicesData, obj => obj.value === values.serviceId)}
                        options={servicesData}
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                        placeholder="Services"

                      />
                    </Col>
                    <Col xs={12} span={6} md={6} lg={6} className="button-group">
                      <button disabled={EnableBtn} type="type" className={`${EnableBtn ? 'disabled' : ' apply'}`} >
                        Apply
                      </button>
                      <button disabled={EnableBtn} type="reset" value="Reset" className={`${EnableBtn ? 'disabled' : ' reset'}`}>
                        Reset
                      </button>
                    </Col>
                  </Form>
                </Col>
              );
            }}
          />
        </Row>
      </div>
    );
  }
}
export default FilterData;