import React, { Component } from "react";
import SettingHeader from "../SettingHeader";
import { Table, Switch, Drawer } from "antd";
import { Formik, Form } from "formik";
import _ from "lodash";
import InputText from "../../../../components/Form/InputText";
import { AdminSettingsServices } from "../../../../utils/utils-validation";
import InputTextArea from "../../../../components/Form/InputTextArea";
class UpdateServices extends Component {
  state = {
    visible: false,
    servicesData: this.props.servicesData,
    isUpdate: false,
    name: "",
    description: "",
    getUpdateStatus: 1,
    getUpdateId: undefined,
    isRowSelected: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.servicesData) {
      if (prevState.isUpdate) {
        return {
          ...prevState,
          isUpdate: false,
        };
      } else
        return {
          ...prevState,
          servicesData: nextProps.servicesData,
        };
    }
    return prevState;
  }

  handleDrawer = () => {
    this.setState({
      visible: !this.state.visible,
      name: "",
      description: "",
      getUpdateStatus: 1,
      getUpdateId: undefined,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      isRowSelected: false
    });
  };

  onSubmit = (values, actions) => {
    let params;
    if (this.state.getUpdateId) {
      params = params = {
        ...values,
        id: this.state.getUpdateId,
        status: this.state.getUpdateStatus,
      };
    } else {
      params = {
        ...values,
        status: this.state.getUpdateStatus,
      };
    }

    if (this.state.isRowSelected) {
      const FindFromArry = _.filter(
        this.state.servicesData,
        (obj) => obj.label.toLowerCase() === params.name.toLowerCase()
      );
      if (FindFromArry.length > 0) {
        actions.setErrors({
          name: "This Service is already exists",
        });
      }
      else {
        this.props.addUpdateHandler(params);
        actions.resetForm({});
        this.setState({
          isUpdate: true,
          getUpdateStatus: 1,
          name: "",
          description: "",
          getUpdateId: undefined,
        });
        this.onClose();
      }
    } else {
      const FindFromArry = _.filter(
        this.state.servicesData,
        (obj) => obj.label.toLowerCase() === params.name.toLowerCase()
      );
      if (FindFromArry.length > 0) {
        actions.setErrors({
          name: "This Service is already exists",
        });
      }
      else {
        this.props.addUpdateHandler(params);
        this.onClose();
      }
    }
  };

  handleFilter = (value) => {
    let servicesData = _.filter(this.props.servicesData, (obj) => {
      return _.includes(obj.label.toLowerCase(), value.toLowerCase())
    });
    if (value === "") servicesData = this.props.servicesData;
    this.setState({
      servicesData,
      isUpdate: true,
    });
  };
  rowClick = (record, rowIndex) => {
    return {
      onClick: (event) => {
        this.setState({
          name: record.label,
          description: record.description,
          visible: true,
          getUpdateStatus: record.status,
          getUpdateId: record.id,
          isRowSelected: true
        });
        console.log(this, record, rowIndex);
      },
    };
  };

  renderDrawer = () => {
    if (this.state.visible)
      return (
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Formik
            initialValues={{
              name: this.state.name,
              description: this.state.description,
            }}
            validationSchema={AdminSettingsServices}
            enableReinitialize
            onSubmit={this.onSubmit}
            render={({ values, handleChange, errors, handleBlur }) => {
              return (
                <Form className="setting-form">
                  <div>
                    <div className="back_button" onClick={this.onClose}>
                      Back
                    </div>
                    <div className="title">{this.state.isRowSelected ? 'Edit ' : 'Add '}Service</div>
                    <InputText
                      name="name"
                      type="text"
                      err={errors.name}
                      label={"Enter service Name"}
                      placeholder={"service "}
                      value={values.name}
                      onChange={handleChange}
                    />

                    <InputTextArea
                      row={2}
                      label="Enter service description"
                      placeholder="description"
                      name="description"
                      maxLength={100}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={errors.description}
                    />
                    <button type="submit" className="button">
                      SAVE
                    </button>
                  </div>
                </Form>
              );
            }}
          />
        </Drawer>
      );
  };
  render() {
    let { servicesData } = this.state;
    let servicesDataWithkey;
    if (servicesData) {
      const reversedData = _.reverse(_.clone(servicesData))
      servicesDataWithkey = reversedData.map((item, index) => {
        return {
          ...item,
          key: item.id,
          'SrNo': index + 1
        };
      });
    }

    const onChange = (record) => {
      const updateRecord = {
        id: record.id,
        name: record.label,
        description: record.description,
        status: record.status === 1 ? 0 : 1,
      };
      this.props.addUpdateHandler(updateRecord);
      this.setState({
        isUpdate: true,
      });
    };

    const columns = [
      {
        title: "S.No.",
        dataIndex: "SrNo",
        key: "SrNo",
        width: '8%',
      },
      {
        title: "LIST OF SERVICES",
        dataIndex: "label",
        key: "label",
        width: "80%",
      },
      {
        title: "ACTION",
        dataIndex: "ACTION",
        width: "15%",
        render: (text, record) => {
          return (
            servicesDataWithkey.length > 0 && (
              <Switch
                onClick={(bool, e) => e.stopPropagation()}
                checked={record.status === 1 ? true : false}
                onChange={() => onChange(record)}
              />
            )
          );
        },
      },
    ];
    const onPageChange = (pagination) => {
      console.log("params", pagination);
    };
    return (
      <div>
        <SettingHeader
          title="Services"
          inputPlaceHolder="Search Service by name ..."
          handleDrawer={this.handleDrawer}
          inputValue={this.handleFilter}
        />
        <div id="tableContainer">
          <Table
            onChange={onPageChange}
            dataSource={servicesDataWithkey}
            onRow={(record, rowIndex) => this.rowClick(record, rowIndex)}
            columns={columns}
            rowClassName={(row, index) => {
              return 'rowCursorPointer'
            }}
          />
        </div>
        {this.renderDrawer()}
      </div>
    );
  }
}

export default UpdateServices;
