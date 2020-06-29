import React, { Component } from "react";
import { push } from "connected-react-router";

export const ActionRouteNavigate = (location, obj) => {
  if (window) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  if (obj) {
    return push(location, obj);
  }

  return push(location);
};
