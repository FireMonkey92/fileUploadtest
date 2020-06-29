import React, { Component } from 'react'
import "./Loading.less";

class LoadingJobList extends Component {
    render() {
        return (
            <div className="job--loading">
                <div className="job--loading--container">
                    {
                        [0, 1, 2].map((i) => (
                            <div className="job--loading--column" key={i}>
                                <div>
                                    <div className="line1"></div>
                                    <div className="line2"></div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="job--loading--column">
                        <div className="block"></div>
                    </div>
                    <div className="job--loading--column">
                        <div>
                            <div className="line1"></div>
                            <div className="line2"></div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default LoadingJobList
