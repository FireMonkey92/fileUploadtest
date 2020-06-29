/* eslint-disable no-undef */
/* globals: window */

import moment from "moment";
import _ from "lodash";

export class UtilsHelper {
  static serialize(obj, prefix = false) {
    const str = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const p in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(p)) {
        const k = prefix ? `${prefix}[${p}]` : p;
        const v = obj[p];
        str.push(
          v !== null && typeof v === "object"
            ? UtilsHelper.serialize(v, k)
            : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        );
      }
    }
    return str.join("&");
  }

  static clearPhoneNumber(number) {
    return number.replace(/\D/gi, "");
  }

  static randomStr(length = 7) {
    let i = 0;
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (i; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  static random = (length) => Math.round(Math.random() * 10 ** length);

  static getWeekRangeByDate(date) {
    const weekNumber = moment(date).isoWeek();
    const yearNumber = moment(date).format("YYYY");

    return UtilsHelper.getWeekRangeByWeekAndYear(weekNumber, yearNumber);
  }

  static getWeekRangeByWeekAndYear(weekNumber, yearNumber) {
    const startDate = moment()
      .year(yearNumber)
      .isoWeek(weekNumber)
      .startOf("isoweek");
    const endDate = moment()
      .year(yearNumber)
      .isoWeek(weekNumber)
      .endOf("isoweek");

    return {
      startDate,
      endDate,
    };
  }

  static numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  static trimSlashes = (url) => url && url.replace(/^\/|\/$/g, "");

  static normalizeDividedNumber = (number) => {
    return number - Math.round(number) < 0.015 ? Math.round(number) : number;
  };

  static round = (number, roundTo = 100) =>
    Math.round(number * roundTo) / roundTo;

  static isNumeric = (value) => !Number.isNaN(value - parseFloat(value));

  static reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  static getNum = (val) => {
    if (Number.isNaN(val) || val === undefined) {
      return 0;
    }
    return parseFloat(val);
  };

  static scrollToTop(scrollDuration = 0) {
    const scrollHeight = window.scrollY;
    const scrollStep = Math.PI / (scrollDuration / 15);
    const cosParameter = scrollHeight / 2;
    let scrollCount = 0;
    let scrollMargin;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        scrollCount += 1;
        scrollMargin =
          cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, scrollHeight - scrollMargin);
      } else clearInterval(scrollInterval);
    }, 15);
  }

  static removeEmptyFields = (object) => {
    return (
      Object.entries(object)
        // eslint-disable-next-line no-unused-vars
        .filter(([key, value]) => {
          if (_.isArray(value)) {
            return !_.isEmpty(value);
          }

          return !!value || value === 0;
        })
        .reduce((acc, [key, value]) => {
          acc[key] = value;

          return acc;
        }, {})
    );
  };

  static normalizeImageUrl = (url, options = { size: "sm" }) => {
    if (!url) return "./images/required/placeholder-product.jpg";
    let size = "&w=320";

    switch (options.size) {
      case "sm":
        size = "&w=320";
        break;
      case "xs":
        size = "&h=50";
        break;
      default:
        size = "&w=320";
    }

    return _.first(url.split("&")) + size;
  };

  static milesToKilometers = (miles) => {
    return parseInt(miles) * 1.60934;
  };

  static getAssetsAndColor = (jobStatusId) => {
    let data = {
      cls: "",
      image: "",
      JobStatus: "",
      providerMessage: "",
      memberMessage: "",
      AcknowledgeMessage: "",
      JobStatusAdminPanel: "",
      PaymentStatusAdminPanel: "",
    };

    if (jobStatusId === 1) {
      data = {
        image: "waiting.png",
        cls: "approval",
        providerMessage: "New Job Order",
        memberMessage: "Waiting for Approval",
        AcknowledgeMessage: "New created Job",
        JobStatusAdminPanel: "New Job Created by Member",
        PaymentStatusAdminPanel: "NA",
        drawermessage: "Job has been Created",
      };
    } else if (jobStatusId === 2) {
      data = {
        image: "waiting.png",
        cls: "approval",
        providerMessage: "Start the Job",
        memberMessage: "Waiting for Provider to start the Job",
        AcknowledgeMessage: "On hold",
        JobStatusAdminPanel: "Payment done by Member",
        PaymentStatusAdminPanel: "Done by Member",
        drawermessage: "Start the Job",
      };
    } else if (jobStatusId === 3) {
      data = {
        image: "reject.png",
        cls: "rejected",
        providerMessage: "You rejected the job",
        memberMessage: "Provider rejected the job",
        AcknowledgeMessage: "Rejected",
        JobStatusAdminPanel: "Job Rejected by Provider",
        PaymentStatusAdminPanel: "NA",
        drawermessage: "Job has been Rejected",
      };
    } else if (jobStatusId === 4) {
      data = {
        image: "attention.png",
        cls: "attention",
        providerMessage: "Waiting for the payment",
        memberMessage: "Make the payment",
        AcknowledgeMessage: "On hold",
        JobStatusAdminPanel: "Job Accepted by Provider",
        PaymentStatusAdminPanel: "Not Paid By The User",
        drawermessage: "Job has been Accepted",
      };
    } else if (jobStatusId === 5) {
      data = {
        image: "on_process.png",
        cls: "progress",
        providerMessage: " ",
        memberMessage: " ",
        JobStatusAdminPanel: "Deleted",
        PaymentStatusAdminPanel: "",
        drawermessage: "Job Deleted",
      };
    } else if (jobStatusId === 6) {
      data = {
        image: "on_process.png",
        cls: "progress",
        providerMessage: "On Going Job ",
        memberMessage: "Work on progress ",
        AcknowledgeMessage: "On Progress",
        JobStatusAdminPanel: "Job started by Provider",
        PaymentStatusAdminPanel: "Recieved by Admin",
        drawermessage: "Job on Progress",
      };
    } else if (jobStatusId === 7) {
      data = {
        image: "attention.png",
        cls: "attention",
        providerMessage: "Waiting for Acknowledgement ",
        memberMessage: "Acknowledge the Job",
        AcknowledgeMessage: "On hold",
        JobStatusAdminPanel: "Job completed by Provider",
        PaymentStatusAdminPanel: "Recieved by Admin",
        drawermessage: "Job Completed",
      };
    } else if (jobStatusId === 8) {
      data = {
        image: "successfully_done.png",
        cls: "success",
        providerMessage: "Successfully Done!",
        memberMessage: "Successfully Done!",
        AcknowledgeMessage: "Job Done!",
        JobStatusAdminPanel: "Job Approved by Member",
        PaymentStatusAdminPanel: "Recieved by Admin",
        drawermessage: "Job  Accepted by Member",
      };
    } else if (jobStatusId === 9) {
      data = {
        image: "reject.png",
        cls: "rejected",
        providerMessage: "Rejected by customer",
        memberMessage: "Not happy with the job",
        AcknowledgeMessage: "Rejected",
        JobStatusAdminPanel: "Job Rejected by Member",
        PaymentStatusAdminPanel: "Member is requesting for refund",
        drawermessage: "Job Rejected by Member",
      };
    } else if (jobStatusId === 10) {
      data = {
        image: "successfully_done.png",
        cls: "success",
        providerMessage: "Successfully Done!",
        memberMessage: "Successfully Done!",
        AcknowledgeMessage: "Job Done!",
        JobStatusAdminPanel: "Payment received by Provider",
        PaymentStatusAdminPanel: "Received by Provider",
        drawermessage: "Job has been Succesfully Done!",
      };
    }
    return data;
  };

  static getMonthsDropdown() {
    let monthArray = [];
    for (let index = 1; index <= moment.months().length; index++) {
      monthArray.push({ value: index, label: moment.monthsShort()[index - 1] });
    }
    return monthArray;
  }

  static getCustomNumberInDropDown(start, end) {
    let dateArray = [];
    for (let index = start; index <= end; index++) {
      dateArray.push({ value: index, label: index });
    }
    return dateArray;
  }

  static getYearDropdown(startYear, endYear) {
    let yearArray = [];
    for (let index = startYear; index <= endYear; index++) {
      yearArray.push({ value: index, label: index });
    }
    return yearArray;
  }

  static readUrlByKey(key) {
    // example
    const search = location.href.split("?");
    const querySplit = search[1] ? search[1].split("&") : [];

    const data = [];
    for (var i = 0; i < querySplit.length; i++) {
      data[querySplit[i].split("=")[0]] = querySplit[i].split("=")[1]
    }
    return data[key]
  }
}
