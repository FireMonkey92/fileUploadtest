
import React, { Component } from 'react'

export default class App extends Component {
  handleChange = e => {
    e.preventDefault();
    e.stopPropagation();
    const SingleFile = e.dataTransfer || e.currentTarget;
    console.log("SingleFile", SingleFile)
  }
  render() {
    return (
      <div>
        <input
          type="file"
          name='name'

          id="filesToUpload"
          onClick={(e) => console.log("e", e)}
          accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
          onChange={this.handleChange}
        />

        <hr />

        <a target="_blank" href="https://helenzys.com/">link should open in new tab</a>
        <a target="_self" href="https://helenzys.com/">link should not open in new tab</a>
        <a href="https://helenzys.com/">link should not open in new tab</a>

      </div>
    )
  }
}

