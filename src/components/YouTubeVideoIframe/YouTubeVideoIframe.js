import React, { Component } from 'react'

class YouTubeVideoIframe extends Component {
    render() {
        var videoSrc = 'https://www.youtube.com/embed/' +
            this.props.video + '?autoplay=' +
            this.props.autoplay + '&rel=' +
            this.props.rel + '&modestbranding=' +
            this.props.modest
        return (
            <div className='container'>
                <iframe
                    allowFullScreen
                    className='player'
                    type='text/html'
                    width='100%'
                    height='100%'
                    src={videoSrc}
                    frameBorder='1' />
            </div>
        )
    }
}

export default YouTubeVideoIframe