import React, { Component } from "react";
import { ErrorMessage } from "formik";
import _ from "lodash";

class UploadSigleFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: new Map(),
      uploadFilesArray: [],
      invalidFileFormat: undefined
    };
  }
  toBase64 = async file =>
    await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  handleChange = e => {
    e.preventDefault();
    e.stopPropagation();
    const SUPPORTED_FILES = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    // executed when user will drag files of Selected files
    const SingleFile = e.dataTransfer || e.currentTarget;
    if (SingleFile) {
      let base64url;
      const OriginalFile = SingleFile.files[0];
      if (OriginalFile)
        if (SUPPORTED_FILES.indexOf(OriginalFile.type) === -1) {
          this.setState({ invalidFileFormat: "Please select a valid pdf and word file" })
        } else if (SUPPORTED_FILES.indexOf(OriginalFile.type) >= 0) {

          this.toBase64(OriginalFile).then(res => {
            base64url = res;
            const obj = {
              filename: OriginalFile.name,
              base64url: base64url
            };
            let newAry = [];
            newAry.push(obj);
            this.setState({
              uploadFilesArray: newAry
            });
            this.props.onChange(
              this.props.name,
              this.state.uploadFilesArray[0]
            );
          });
          this.setState({
            uploadedFiles: this.state.uploadedFiles.set(
              "OrignalFile",
              OriginalFile
            ),
            invalidFileFormat: undefined
          });
        }
    }
  };
  renderFiles = () => {
    const uploadedFiles = this.state.uploadedFiles;
    let fileList = [];
    Array.from(uploadedFiles).map(file => {
      const obj = {
        name: file[1].name,
        file: file[1]
      };
      fileList.push(obj);
    });
    const deleteFile = filename => {
      console.log(fileList)
      const deleteSuccess = this.state.uploadedFiles.delete(filename);
      let arr = this.state.uploadFilesArray;
      arr = [];
      if (deleteSuccess) {
        if (arr.length === 0) {
          this.setState({
            uploadedFiles: new Map(),
            uploadFilesArray: arr
          });
        }
      }
      this.props.onChange(this.props.name, "");
    };

    if (fileList.length != 0) {
      return fileList.map((file, index) => {
        return (
          <div className="FileListItem" key={index}>
            <span className="FileListItem-label">
              {index + 1} {file.name}
            </span>
            <span> {(file.file.size / 1024 / 1024).toFixed(2) + " MBs"}</span>
            <span
              className="FileListItem-removeBtn"
              onClick={() => deleteFile("OrignalFile")}
            >
              Remove
            </span>
          </div>
        );
      });
    } else {
      return null;
    }
  };
  overRideDefault = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  render() {
    const { name, label, supportedFilesDescription, className, disabled, onClick } = this.props;
    return (
      <div
        id="SingleFileUpload"
        className={`input  ${className ? `${className}` : null}`}
      >
        <span className="field-container_fieldname">{label}</span>
        {supportedFilesDescription && (
          <div className="fileSupportText">
            Please upload {supportedFilesDescription} files only
          </div>
        )}
        <div className="fileUpladContainer">
          <input
            type="file"
            name={name}
            disabled={disabled}
            id="filesToUpload"
            onClick={onClick}
            accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
            onChange={this.handleChange}
          />
          <label
            onDragOver={this.overRideDefault}
            onDragEnter={this.overRideDefault}
            onDragLeave={this.overRideDefault}
            onDrop={this.handleChange}
            id="fileLabel"
            htmlFor="filesToUpload"
          >
            Drag & Drop or click here to upload certificate
          </label>
        </div>
        <div className="fileListContainer">{this.renderFiles()}</div>
        <ErrorMessage name={name}>
          {errorMessage => {
            return <div className="error_message">{errorMessage}</div>;
          }}
        </ErrorMessage>
        {this.state.invalidFileFormat && <div className="error_message">{this.state.invalidFileFormat}</div>}
      </div>
    );
  }
}

export default UploadSigleFile;
