import React, { Component } from 'react';

class RootLayout extends Component {

	render() {

		return (
			<div id="outer-container">
				{this.props.children}
			</div>
		);
	}
}


export default RootLayout;
