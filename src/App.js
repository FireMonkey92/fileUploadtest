
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
      </div>
    )
  }
}

