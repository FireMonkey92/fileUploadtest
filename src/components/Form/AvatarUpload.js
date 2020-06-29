import React from "react";
import $ from "jquery";
import _ from 'lodash'
import { ErrorMessage } from "formik";

import "./InputStyle.less";

const AvatarUpload = (props) => {
  const { name, type, onChange, value, removeProfileImage } = props;

  const onChangeHandler = (event) => {
    var preview = document.querySelector("#imagePreview");
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        $("#imagePreview").fadeIn(650);
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
      setTimeout(() => {
        onChange(props.name, reader.result);
      }, 1000);
    }
  };
  const image = value || require("../../assets/images/required/img_avatar.png");

  let flagRemoveBtn = false;
  let ur = "";
  ur = value;
  if (ur) {
    if (_.includes(ur, "base64")) {
      flagRemoveBtn = false;
    }
    if (_.includes(ur, "http")) {
      flagRemoveBtn = true;
    }
  }

  return (
    <div className="AvatarUploadWithPreview">
      <div className="container">
        <ErrorMessage name={name}>
          {errorMessage => {
            return <div className="error_message">{errorMessage}</div>;
          }}
        </ErrorMessage>
        <div className="avatar-upload">
          <div className="avatar-edit">
            <input
              type={type}
              name={name}
              id="imageUpload"
              accept=".jpg"
              onChange={onChangeHandler}
            />
            <label htmlFor="imageUpload"></label>
          </div>
          {flagRemoveBtn ? (
            <div
              className="avatar-remove"
              onClick={removeProfileImage}
              id="removeIcon"
            >
              <label htmlFor="removeIcon"></label>
            </div>
          ) : null}
          <div className="avatar-preview">
            <img src={image} alt="avatar" id="imagePreview" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
